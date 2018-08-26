import * as moment from "moment";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import {
  IRippleService,
  IConfiguration,
  ICrypto,
  IQuerier,
  Lib,
  ResolveDnsResponse,
  Cache,
  IServiceResponse
} from "../types";
import { TYPES } from "../inversify.types";
import { _first, _union } from "../util";
import { geoDataMock } from "../geoDataCache";
import { wellKnownValidators } from "../wellKnownValidators";
import StatsUtil from "../statsUtil";
import { Memoize } from "../cache/cache.types";

const _rippleDomain = "ripple.com";

const _roundCoordinate = (num: number) => {
  const factor = 100;
  return Math.round(num * factor) / factor;
};

const _isRippleValidator = (validator: Lib.RippleData.ValidatorRawResponse) => {
  const isWellKnown =
    validator.validation_public_key &&
    wellKnownValidators[_rippleDomain].indexOf(
      validator.validation_public_key
    ) >= 0;
  const endsWith =
    validator.domain && validator.domain.split("/")[0].endsWith(_rippleDomain);

  return isWellKnown || endsWith;
};

@injectable()
export default class RippleService implements IRippleService {
  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: Lib.ILogger,
    @inject(TYPES.Configuration) private _configuration: IConfiguration,
    @inject(TYPES.Querier) private _querier: IQuerier,
    @inject(TYPES.Memoizer) private _memoizer: Memoize.IMemoizer,
    @inject(TYPES.Crypto) private _crypto: ICrypto
  ) {
    const validatorFetchInterval = this._configuration.getFetchInterval();
    const geoInfoFetchInterval = this._configuration.getGeoInfoFetchInterval();

    setImmediate(async () => {
      await this._memoizer.register(
        Cache.TYPES.RIPPLE_DEFAULT_UNL,
        this._fetchRealTimeDefaultUnl.bind(this),
        { interval: validatorFetchInterval, immediate: true }
      );
      await this._memoizer.register(
        Cache.TYPES.RIPPLE_DAILY_REPORT,
        this._fetchDailyReport.bind(this),
        { interval: validatorFetchInterval, immediate: true }
      );
      await this._memoizer.register(
        Cache.TYPES.RIPPLE_VALIDATORS,
        this._fetchValidators.bind(this),
        { interval: validatorFetchInterval, immediate: true }
      );
      await this._memoizer.register(
        Cache.TYPES.IPSTACK_GEO,
        this._fetchGeoInfo.bind(this),
        { interval: geoInfoFetchInterval, immediate: true }
      );
      await this._memoizer.register(
        Cache.TYPES.MERGED_DATA,
        this._mergeAll.bind(this),
        { interval: validatorFetchInterval, immediate: true }
      );
      await this._memoizer.register(
        Cache.TYPES.SUMMARY_DATA,
        this._populateSummary.bind(this),
        { interval: validatorFetchInterval, immediate: true }
      );
    });
  }

  private _fetchRealTimeDefaultUnl = async () => this._querier.getDefaultUnl();

  private _fetchDailyReport = async () =>
    this._querier.getValidatorDailyReports();

  private _fetchValidators = async () => this._querier.getValidators();

  private _fetchGeoInfo = async () => {
    if (process.env["NODE_ENV"] === "development") {
      return geoDataMock.list;
    }

    // get validators from the cache
    const validators = await this._memoizer.get<
      Lib.RippleData.ValidatorRawResponse[]
    >(Cache.TYPES.RIPPLE_VALIDATORS);

    // lookup ip address from the domain
    const capturedDomains = {};
    const promises: Promise<ResolveDnsResponse>[] = validators.data.reduce(
      (prev, v) => {
        if (v.domain && !capturedDomains[v.domain]) {
          prev.push(this._querier.getIpFromDomain(v.domain));
          capturedDomains[v.domain] = true;
        }
        return prev;
      },
      []
    );

    // get domain and address pair
    const domainAndAddressPairs = await Promise.all(promises);

    const list: Lib.IPStackResponse[] = [];
    const ipStackPromises = domainAndAddressPairs.reduce((prev, curr) => {
      if (curr.ip) {
        prev.push(this._querier.getGeoInfo([curr.ip]));
      }
      return prev;
    }, []);

    const geoDataSet: Lib.IPStackResponse[] = await Promise.all(
      ipStackPromises
    );
    domainAndAddressPairs.forEach(domainAndAddressPair => {
      if (domainAndAddressPair.ip) {
        const geoData = geoDataSet.filter(
          g => g.ip === domainAndAddressPair.ip
        )[0];
        list.push({
          domain: domainAndAddressPair.domain,
          ip: domainAndAddressPair.ip,
          country_name: geoData.country_name,
          country_code: geoData.country_code,
          region_name: geoData.region_name,
          city: geoData.city,
          latitude: _roundCoordinate(geoData.latitude),
          longitude: _roundCoordinate(geoData.longitude)
        });
      }
    });
    return list;
  };

  private _mergeAll = async (date?: string) => {
    const startOfDay = moment().add(-6, "h");

    let defaultUnlCache: IServiceResponse<Lib.RippleData.DefaultUnlRawResponse>;
    if (date) {
      // if date is specified, get the one cached from the GitHub repo (archived default UNL)
      defaultUnlCache = await this._memoizer.get<
        Lib.RippleData.DefaultUnlRawResponse
      >(Cache.TYPES.GITHUB_DEFAULT_UNL, { date: date });
    } else {
      // if no date is specified, get the one cached from vl.ripple.com (most recent default UNL)
      defaultUnlCache = await this._memoizer.get<
        Lib.RippleData.DefaultUnlRawResponse
      >(Cache.TYPES.RIPPLE_DEFAULT_UNL);
    }
    const dailyReports = await this._memoizer.get<
      Lib.RippleData.DailyReportRawResponse[]
    >(Cache.TYPES.RIPPLE_DAILY_REPORT);
    const allValidators = await this._memoizer.get<
      Lib.RippleData.ValidatorRawResponse[]
    >(Cache.TYPES.RIPPLE_VALIDATORS);
    const geoInfo = await this._memoizer.get<Lib.IPStackResponse[]>(
      Cache.TYPES.IPSTACK_GEO
    );

    // remove non active validators in the last 24 hours.
    const validators = allValidators.data.filter(
      a => moment(a.last_datetime).diff(startOfDay) > 0
    );
    const defaultUnl = this._crypto.parseDefaultUNLResponse(
      defaultUnlCache.data
    );
    const altnetRegex = this._configuration.getAltNetDomainsPattern();
    const allValidationPublicKeys = _union(
      defaultUnl,
      validators.map(a => a.validation_public_key)
    );

    const mergedList = allValidationPublicKeys
      .filter(pubkey => pubkey && pubkey !== "undefined") // remove stale validators
      .map(pubkey => {
        let v = _first(validators, v => v.validation_public_key === pubkey);
        if (!v) {
          v = {
            validation_public_key: pubkey,
            domain: undefined,
            domain_state: "unverified",
            last_datetime: undefined
          };
        }

        // set domain
        const isRipple = v && _isRippleValidator(v);
        v.domain = isRipple ? _rippleDomain : v.domain;

        const data = {
          pubkey: v.validation_public_key,
          domain: v.domain,
          is_ripple: isRipple,
          verified: v.domain_state === "verified",
          default: undefined,
          is_report_available: false,
          is_alt_net: false,
          agreement: 0,
          disagreement: 0,
          total_ledgers: 0,
          city: undefined,
          country_name: undefined,
          country_code: undefined,
          region_name: undefined,
          latitude: 0,
          longitude: 0,
          last_datetime: v.last_datetime
        };

        const defaultUnlItem = _first<string>(
          defaultUnl,
          pubkey => pubkey === v.validation_public_key
        );
        if (defaultUnlItem) {
          data.default = !!defaultUnlItem;
        }

        // alt-net check 1: check if the alt net pattern matches.
        data.is_alt_net = v.domain && !!altnetRegex.exec(data.domain);

        const reportItem = _first<Lib.RippleData.DailyReportRawResponse>(
          dailyReports.data,
          report => report.validation_public_key === v.validation_public_key
        );
        if (reportItem) {
          // alt-net check 2: check whether alt-net agreement is greater than the main net.
          // If so, the domain is considered alt-net.
          if (!data.is_alt_net) {
            data.is_alt_net =
              parseFloat(reportItem.alt_net_agreement) >
              parseFloat(reportItem.main_net_agreement);
          }
          data.agreement = !data.is_alt_net
            ? parseFloat(reportItem.main_net_agreement)
            : parseFloat(reportItem.alt_net_agreement);
          let disagreement = 1;
          if (!data.is_alt_net) {
            disagreement =
              reportItem.total_ledgers - reportItem.main_net_ledgers;
            if (reportItem.total_ledgers > 0) {
              disagreement /= reportItem.total_ledgers;
            } else {
              disagreement = 1;
            }
          }
          data.disagreement = parseFloat(disagreement.toFixed(5));
          data.total_ledgers = reportItem.total_ledgers;
          data.is_report_available = true;
        }
        const geoItem = _first<Lib.IPStackResponse>(
          geoInfo.data,
          geo => geo.domain === v.domain,
          <any>{
            city: undefined,
            country_name: undefined,
            country_code: undefined,
            region_name: undefined,
            latitude: undefined,
            longitude: undefined
          }
        );
        if (geoItem) {
          data.city = geoItem.city;
          data.country_name = geoItem.country_name;
          data.country_code = geoItem.country_code;
          data.region_name = geoItem.region_name;
          data.latitude = geoItem.latitude;
          data.longitude = geoItem.longitude;
        }
        return data;
      });

    return mergedList;
  };

  private _populateSummary = async () => {
    const mergedData = await this._memoizer.get<Cache.MergedData[]>(
      Cache.TYPES.MERGED_DATA
    );
    const mainNetValidators = mergedData.data.filter(a => !a.is_alt_net);
    const summary = StatsUtil.getSummaryStats(mainNetValidators);
    return summary;
  };

  getValidatorInfo = async (date?: string) => {
    return this._memoizer.get<Cache.MergedData>(Cache.TYPES.MERGED_DATA, {
      date: date
    });
  };

  getValidatorSummary = async () => {
    return this._memoizer.get<Cache.SummaryStats>(Cache.TYPES.SUMMARY_DATA);
  };
}
