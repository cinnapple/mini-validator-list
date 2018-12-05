import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";

@injectable()
export default class RippleDefaultUnlSiteService
  implements service.IDefaultUnlService {
  private _logger: lib.ILogger;

  constructor(
    @inject(TYPES.Lib.LoggerFactory) private _loggerFactory: lib.ILoggerFactory,
    @inject(TYPES.Lib.Configuration) private _configuration: lib.IConfiguration,
    @inject(TYPES.Lib.WebClient) protected _webClient: lib.IWebClient
  ) {
    this._logger = this._loggerFactory.create(
      `Service.RippleDefaultUnlSiteService`
    );
  }

  getDefaultUnl = async () => {
    this._logger.info(`getDefaultUnl`);
    return this._webClient.get<service.RippleDataApi.DefaultUnlResponse>(
      this._configuration.ripple.defaultUnlSite
    );
  };

  getDefaultUnlByUrl = async (url: string) => {
    this._logger.info(`getDefaultUnlByUrl ${url}`);
    return this._webClient.get<service.RippleDataApi.DefaultUnlResponse>(url);
  };
}
