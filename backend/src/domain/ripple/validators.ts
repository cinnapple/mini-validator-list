import "reflect-metadata";
import * as moment from "moment";
import { injectable, inject, TYPES } from "../../inversify";
import { IConfiguration, ILogger, ICrypto } from "../../lib/types";
import { Domains, Models } from "../types";
import { IRippleDataService } from "../../service/types";
import { _union, _first } from "../../lib/util/util";
import {
  _isRippleValidator,
  _rippleDomain,
  _takeLastNHours
} from "../common/util";

@injectable()
export default class Validators implements Domains.IValidators {
  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: ILogger,
    @inject(TYPES.Lib.Configuration) private _configuration: IConfiguration,
    @inject(TYPES.Lib.Crypto) private _crypto: ICrypto,
    @inject(TYPES.Service.RippleDataService)
    private _rippleDataService: IRippleDataService
  ) {}

  getValidators = async (lastNHours?: number) => {
    try {
      let data = await this._rippleDataService.getValidators();
      if (lastNHours > 0) {
        const threshould = moment().add(-lastNHours, "h");
        data = data.filter(v =>
          _takeLastNHours(threshould, moment(v.last_datetime))
        );
      }
      console.log("-->", data.length);
      return data;
    } catch (err) {
      this._logger.error(err);
      throw err;
    }
  };

  getValidatorSummary = async (
    _date: string,
    defaultUnl: Models.DefaultUnl,
    dailyReports: Models.DailyReports[],
    allValidators: Models.Validator[],
    domainGeoList: Models.DomainGeo[]
  ) => {
    try {
      const validators = allValidators;
      const defaultUnlValidators = this._crypto.parseDefaultUNLBlob(
        defaultUnl.blob
      );
      const altnetRegex = this._configuration.getAltNetDomainsPattern();
      const allValidationPublicKeys = _union(
        defaultUnlValidators,
        validators.map(a => a.validation_public_key)
      );

      const mergedList = allValidationPublicKeys.reduce(
        (prev, pubkey) => {
          // remove stale validators
          if (!pubkey || pubkey === "undefined") {
            return prev;
          }

          // get a validator entry
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

          // create a return data
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

          // set default UNL flag
          const defaultUnlItem = _first<string>(
            defaultUnlValidators,
            pubkey => pubkey === v.validation_public_key
          );
          if (defaultUnlItem) {
            data.default = !!defaultUnlItem;
          }

          // set ALT-Net flag - check if the alt net pattern matches.
          data.is_alt_net = v.domain && !!altnetRegex.exec(data.domain);

          const reportItem = _first<Models.DailyReports>(
            dailyReports,
            report => report.validation_public_key === v.validation_public_key
          );
          if (reportItem) {
            data.is_report_available = true;
            // set ALT-Net flag - if alt-net agreement is greater than the main net, then the domain is considered alt-net
            if (!data.is_alt_net) {
              data.is_alt_net =
                parseFloat(reportItem.alt_net_agreement) >
                parseFloat(reportItem.main_net_agreement);
            }
            // set agreement / disagreement / total_ledgers
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
          }
          const geoItem = _first<Models.DomainGeo>(
            domainGeoList,
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
          // set geo info
          if (geoItem) {
            data.city = geoItem.city;
            data.country_name = geoItem.country_name;
            data.country_code = geoItem.country_code;
            data.region_name = geoItem.region_name;
            data.latitude = geoItem.latitude;
            data.longitude = geoItem.longitude;
          }

          prev.push(data);
          return prev;
        },
        <Models.ValidatorSummary[]>[]
      );

      return mergedList;
    } catch (err) {
      this._logger.error(err);
      throw err;
    }
  };
}
