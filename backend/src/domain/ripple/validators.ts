import 'reflect-metadata';
import { inject, injectable, TYPES } from '../../inversify';
import { _first, _union } from '../../lib/util/util';
import { _isRippleValidator, _rippleDomain } from '../common/util';

@injectable()
export default class Validators implements domain.IValidators {
  private _logger: lib.ILogger;

  constructor(
    @inject(TYPES.Lib.LoggerFactory)
    protected _loggerFactory: lib.ILoggerFactory,
    @inject(TYPES.Lib.Configuration) private _configuration: lib.IConfiguration,
    @inject(TYPES.Lib.Crypto) private _crypto: lib.ICrypto,
    @inject(TYPES.Service.RippleDataService)
    private _rippleDataService: service.IRippleDataService,
  ) {
    this._logger = _loggerFactory.create('Domain.Validators');
  }

  public getValidators = async () => {
    try {
      return this._rippleDataService.getValidators();
    } catch (err) {
      this._logger.error(err);
      throw err;
    }
  }

  public getValidatorSummary = async (
    _date: string,
    defaultUnl: domain.DefaultUnl,
    dailyReports: domain.DailyReports[],
    allValidators: domain.Validator[],
    domainGeoList: domain.DomainGeo[],
  ) => {
    try {
      const validators = allValidators;
      const defaultUnlValidators = this._crypto.parseDefaultUNLBlob(
        defaultUnl.blob,
      );
      const altnetRegex = this._configuration.ripple.altNetDomainsPattern;
      const allValidationPublicKeys = _union(
        defaultUnlValidators,
        validators.map(a => a.validation_public_key),
      );

      const mergedList = allValidationPublicKeys.reduce(
        (prev, pubkey) => {
          // remove stale validators
          if (!pubkey || pubkey === 'undefined') {
            return prev;
          }

          // get a validator entry
          let v = _first(validators, v => v.validation_public_key === pubkey);
          if (!v) {
            v = {
              chain: 'alt',
              current_index: -1,
              agreement_1h: <any>{},
              agreement_24h: <any>{},
              partial: undefined,
              unl: false,
              validation_public_key: pubkey,
              domain: undefined,
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
            verified: !!v.domain,
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
            last_datetime: new Date().toString(),
          };

          // set default UNL flag
          const defaultUnlItem = _first<string>(
            defaultUnlValidators,
            pubkey => pubkey === v.validation_public_key,
          );
          if (defaultUnlItem) {
            data.default = !!defaultUnlItem;
          }

          // set ALT-Net flag - check if the alt net pattern matches.
          data.is_alt_net = v.domain && !!altnetRegex.exec(data.domain);

          const reportItem = _first<domain.DailyReports>(
            dailyReports,
            report => report.validation_public_key === v.validation_public_key,
          );
          if (reportItem) {
            data.is_report_available = true;
            // set ALT-Net flag - if alt-net agreement is greater than the main net, then the domain is considered alt-net
            if (!data.is_alt_net) {
              data.is_alt_net = reportItem.chain !== 'main';
            }
            // TODO: later!
            // set agreement / disagreement / total_ledgers
            // data.agreement = !data.is_alt_net
            //   ? parseFloat(reportItem.main_net_agreement)
            //   : parseFloat(reportItem.alt_net_agreement);
            // let disagreement = 1;
            // if (!data.is_alt_net) {
            //   disagreement =
            //     reportItem.total_ledgers - reportItem.;
            //   if (parseInt(reportItem.total) > 0) {
            //     disagreement /= parseInt(reportItem.total);
            //   } else {
            //     disagreement = 1;
            //   }
            // }
            // data.disagreement = parseFloat(disagreement.toFixed(5));
            // data.total_ledgers = parseInt(reportItem.total);
          }
          const geoItem = _first<domain.DomainGeo>(
            domainGeoList,
            geo => geo.domain === v.domain,
            <any>{
              city: undefined,
              country_name: undefined,
              country_code: undefined,
              region_name: undefined,
              latitude: undefined,
              longitude: undefined,
            },
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
        <domain.ValidatorSummary[]>[],
      );

      return mergedList;
    } catch (err) {
      this._logger.error(err);
      throw err;
    }
  }
}
