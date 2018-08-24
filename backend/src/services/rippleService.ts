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
  ICacheManager,
  ICacheManagerFactory,
  IIntervalManager
} from "../types";
import { TYPES } from "../inversify.types";
import { _first, _union, DATED_CACHE } from "../util";
import { geoDataMock } from "../geoDataCache";
import { wellKnownValidators } from "../wellKnownValidators";
import StatsUtil from "../statsUtil";

type AllowedRippleCacheTypes =
  | Lib.RippleData.DefaultUnlRawResponse
  | Lib.RippleData.ValidatorRawResponse
  | Lib.RippleData.DailyReportRawResponse
  | Lib.IPStackResponse
  | Cache.MergedData;

@injectable()
export default class RippleService implements IRippleService {
  private _rippleCacheManager: ICacheManager<AllowedRippleCacheTypes>;
  private _rippleDomain = "ripple.com";

  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: Lib.ILogger,
    @inject(TYPES.Configuration) private _configuration: IConfiguration,
    @inject(TYPES.Querier) private _querier: IQuerier,
    @inject(TYPES.Crypto) private _crypto: ICrypto,
    @inject(TYPES.CacheManagerFactory)
    private _cacheManagerFactory: ICacheManagerFactory,
    @inject(TYPES.IntervalManager) private _intervalManger: IIntervalManager
  ) {
    this._rippleCacheManager = this._cacheManagerFactory.create(
      Cache.MANAGERS.RIPPLE_SERVICE
    );
    this._startIntervalFetchAll();
    this._startInitialFetchAll();
  }

  private _startIntervalFetchAll() {
    const validatorFetchInterval = this._configuration.getFetchInterval();
    const geoInfoFetchInterval = this._configuration.getGeoInfoFetchInterval();

    this._intervalManger.createInterval(
      "fetchValidatorRelatedInfo",
      async () => {
        await Promise.all([
          this._fetchDefaultUnl(),
          this._fetchDailyReport(),
          this._fetchValidators()
        ]);
        this._mergeAll();
        this._populateSummary();
      },
      validatorFetchInterval
    );
    this._intervalManger.createInterval(
      "fetchGeoInfo",
      async () => {
        this._fetchGeoInfo();
      },
      geoInfoFetchInterval
    );
  }

  private async _startInitialFetchAll() {
    await Promise.all([
      this._fetchDefaultUnl(),
      this._fetchDailyReport(),
      this._fetchValidators(),
      this._fetchGeoInfo()
    ]);
    this._mergeAll();
    this._populateSummary();
  }

  private async _fetchDefaultUnl() {
    return this._rippleCacheManager.set(Cache.TYPES.RIPPLE_DEFAULT_UNL, () =>
      this._querier.getDefaultUnl()
    );
  }

  private async _fetchDailyReport() {
    return this._rippleCacheManager.set(Cache.TYPES.RIPPLE_DAILY_REPORT, () =>
      this._querier.getValidatorDailyReports()
    );
  }

  private async _fetchValidators() {
    return this._rippleCacheManager.set(Cache.TYPES.RIPPLE_VALIDATORS, () =>
      this._querier.getValidators()
    );
  }

  private _roundCoordinate(num: number) {
    const factor = 100;
    return Math.round(num * factor) / factor;
  }

  private async _fetchGeoInfo() {
    await this._rippleCacheManager.waitFor(Cache.TYPES.RIPPLE_VALIDATORS);
    const validatorCache = this._rippleCacheManager.get<
      Lib.RippleData.ValidatorRawResponse
    >(Cache.TYPES.RIPPLE_VALIDATORS);
    if (process.env["NODE_ENV"] === "production") {
      return this._rippleCacheManager.set(Cache.TYPES.IPSTACK_GEO, async () => {
        // lookup ip address from the domain
        const capturedDomains = {};
        const promises: Promise<
          ResolveDnsResponse
        >[] = validatorCache.list.reduce((prev, v) => {
          if (v.domain && !capturedDomains[v.domain]) {
            prev.push(this._querier.getIpFromDomain(v.domain));
            capturedDomains[v.domain] = true;
          }
          return prev;
        }, []);

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
              latitude: this._roundCoordinate(geoData.latitude),
              longitude: this._roundCoordinate(geoData.longitude)
            });
          }
        });
        console.log(list);
        return Promise.resolve(list);
      });
    }
    return this._rippleCacheManager.set(Cache.TYPES.IPSTACK_GEO, () =>
      Promise.resolve(geoDataMock.list)
    );
  }

  private async _mergeAll(date?: string) {
    const startOfDay = moment().add(-6, "h");
    return this._rippleCacheManager.set(
      DATED_CACHE(Cache.TYPES.MERGED_DATA, date),
      async () => {
        await Promise.all([
          this._rippleCacheManager.waitFor(
            DATED_CACHE(Cache.TYPES.RIPPLE_DEFAULT_UNL, date)
          ),
          this._rippleCacheManager.waitFor(Cache.TYPES.RIPPLE_DAILY_REPORT),
          this._rippleCacheManager.waitFor(Cache.TYPES.RIPPLE_VALIDATORS),
          this._rippleCacheManager.waitFor(Cache.TYPES.IPSTACK_GEO)
        ]);

        this._logger.info(`all prerequisites have been populated...`);

        const defaultUnlCache = this._rippleCacheManager.get<
          Lib.RippleData.DefaultUnlRawResponse
        >(DATED_CACHE(Cache.TYPES.RIPPLE_DEFAULT_UNL, date));
        const dailyReports = this._rippleCacheManager.get<
          Lib.RippleData.DailyReportRawResponse
        >(Cache.TYPES.RIPPLE_DAILY_REPORT);
        const allValidators = this._rippleCacheManager.get<
          Lib.RippleData.ValidatorRawResponse
        >(Cache.TYPES.RIPPLE_VALIDATORS);
        const geoInfo = this._rippleCacheManager.get<Lib.IPStackResponse>(
          Cache.TYPES.IPSTACK_GEO
        );

        // remove non active validators in the last 24 hours.
        const validators = allValidators.list.filter(
          a => moment(a.last_datetime).diff(startOfDay) > 0
        );
        // const validators = allValidators.list;

        const defaultUnl = this._crypto.parseDefaultUNLResponse(
          defaultUnlCache.list[0]
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
                last_datetime: v.last_datetime
              };
            }

            // set domain
            const isRipple = v && this._isRippleValidator(v);
            v.domain = isRipple ? this._rippleDomain : v.domain;

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
              longitude: 0
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
              dailyReports.list,
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
              geoInfo.list,
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

        return Promise.resolve(mergedList);
      }
    );
  }

  private async _populateSummary() {
    return this._rippleCacheManager.set(Cache.TYPES.SUMMARY_DATA, async () => {
      await this._rippleCacheManager.waitFor(Cache.TYPES.MERGED_DATA);
      const mergedData = this._rippleCacheManager.get<Cache.MergedData>(
        Cache.TYPES.MERGED_DATA
      );
      const mainNetValidators = mergedData.list.filter(a => !a.is_alt_net);
      const summary = StatsUtil.getSummaryStats(mainNetValidators);

      return await summary;
    });
  }

  private _isRippleValidator(validator: Lib.RippleData.ValidatorRawResponse) {
    const isWellKnown =
      validator.validation_public_key &&
      wellKnownValidators[this._rippleDomain].indexOf(
        validator.validation_public_key
      ) >= 0;
    const endsWith =
      validator.domain &&
      validator.domain.split("/")[0].endsWith(this._rippleDomain);

    return isWellKnown || endsWith;
  }

  async getValidatorInfo(params?: {
    date: string;
    defaultUnl: Lib.RippleData.DefaultUnlRawResponse;
  }) {
    let date = "";
    if (params) {
      date = params.date;
      const existingCache = this._rippleCacheManager.get<Cache.MergedData>(
        DATED_CACHE(Cache.TYPES.MERGED_DATA, date)
      );
      if (!existingCache) {
        // set default unl
        this._rippleCacheManager.set(
          DATED_CACHE(Cache.TYPES.RIPPLE_DEFAULT_UNL, date),
          () => Promise.resolve(params.defaultUnl)
        );
        this._mergeAll(date);
      }
    }

    await this._rippleCacheManager.waitFor(
      DATED_CACHE(Cache.TYPES.MERGED_DATA, date)
    );
    return this._rippleCacheManager.get<Cache.MergedData>(
      DATED_CACHE(Cache.TYPES.MERGED_DATA, date)
    );
  }

  async getGeoInfo() {
    await this._rippleCacheManager.waitFor(Cache.TYPES.IPSTACK_GEO);
    return this._rippleCacheManager.get<Lib.IPStackResponse>(
      Cache.TYPES.IPSTACK_GEO
    );
  }

  async getValidatorSummary() {
    const existingCache = this._rippleCacheManager.get<Cache.MergedData>(
      Cache.TYPES.SUMMARY_DATA
    );
    if (!existingCache) {
      this._populateSummary();
    }

    await this._rippleCacheManager.waitFor(Cache.TYPES.SUMMARY_DATA);
    return this._rippleCacheManager.get<Cache.MergedData>(
      Cache.TYPES.SUMMARY_DATA
    );
  }
}
