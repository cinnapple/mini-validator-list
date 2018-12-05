import 'reflect-metadata';
import { inject, injectable, TYPES } from '../../inversify';

@injectable()
export default class RippleDataService implements service.IRippleDataService {
  private _logger: lib.ILogger;

  constructor(
    @inject(TYPES.Lib.LoggerFactory) private _loggerFactory: lib.ILoggerFactory,
    @inject(TYPES.Lib.Configuration) private _configuration: lib.IConfiguration,
    @inject(TYPES.Lib.WebClient) protected _webClient: lib.IWebClient,
  ) {
    this._logger = this._loggerFactory.create(`Service.RippleDataService`);
  }

  public getValidators = async () => {
    this._logger.info(`getValidators`);
    return this._webClient
      .get<{ validators: service.RippleDataApi.GetValidatorsResponse }>(
        this._configuration.ripple.validatorsUrl,
      )
      .then(data => data.validators);
  }

  public getValidatorDailyReports = async () => {
    this._logger.info(`getValidatorDailyReports`);
    return this._webClient
      .get<{
        reports: { rows: service.RippleDataApi.GetDailyReportResponse };
      }>(this._configuration.ripple.validatorDailyReportsUrl)
      .then(data => data.reports.rows);
  }
}
