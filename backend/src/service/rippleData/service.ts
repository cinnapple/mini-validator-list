import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { IWebClient, ILogger, IConfiguration } from "../../lib/types";
import { Service, IRippleDataService } from "../types";

@injectable()
export default class RippleDataService implements IRippleDataService {
  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: ILogger,
    @inject(TYPES.Lib.Configuration) private _configuration: IConfiguration,
    @inject(TYPES.Lib.WebClient) protected _webClient: IWebClient
  ) {}

  getValidators = async () => {
    return this._webClient
      .get<{ validators: Service.RippleDataApi.GetValidatorsResponse }>(
        this._configuration.getValidatorsURL()
      )
      .then(data => data.validators);
  };

  getValidatorDailyReports = async () => {
    return this._webClient
      .get<{ reports: Service.RippleDataApi.GetDailyReportResponse }>(
        this._configuration.getValidatorDailyReportsURL()
      )
      .then(data => data.reports);
  };
}
