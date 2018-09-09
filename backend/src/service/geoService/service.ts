import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { IWebClient, ILogger, IConfiguration } from "../../lib/types";
import { Service, IGeoService } from "../types";

import * as dns from "dns";
import * as bluebird from "bluebird";

@injectable()
export default class GeoService implements IGeoService {
  private _lookupAsync = bluebird.promisify(dns.lookup);

  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: ILogger,
    @inject(TYPES.Lib.Configuration) private _configuration: IConfiguration,
    @inject(TYPES.Lib.WebClient) protected _webClient: IWebClient
  ) {}

  private _wait = async () => {
    return bluebird.delay(200);
  };

  getGeoData = async (domainOrIp: string) => {
    await this._wait();
    const url = `${this._configuration.getIPStackFetchURL()}/${domainOrIp}?access_key=${this._configuration.getIPStackApiKey()}`;
    return this._webClient
      .get<Service.Geo.GeoResponseData>(url)
      .catch(() => <any>{});
  };

  getIpFromDomain = async (domain: string) => {
    return this._lookupAsync(domain).catch(() => "");
  };
}
