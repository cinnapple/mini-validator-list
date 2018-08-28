import { injectable, inject } from "inversify";
import "reflect-metadata";
import { IConfiguration, Lib, ILocationClient } from "./types";
import { TYPES } from "./inversify.types";

import axios from "axios";
import * as dns from "dns";
import * as bluebird from "bluebird";

@injectable()
export default class LocationClient implements ILocationClient {
  private _lookupAsync = bluebird.promisify(dns.lookup);

  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: Lib.ILogger,
    @inject(TYPES.Configuration) private _configuration: IConfiguration
  ) {}

  private async _get<T>(url: string): Promise<T> {
    return axios.get<T>(url).then(a => a.data);
  }

  private async _getIpFromDomain(domain: string) {
    try {
      return await this._lookupAsync(domain);
    } catch {}
    return await "";
  }

  async getGeoInfo(rawDomain: string) {
    let data: Lib.IPStackResponse;
    const trimIndex = rawDomain.indexOf("/");
    const domainSplit = rawDomain
      .slice(0, trimIndex >= 0 ? trimIndex : rawDomain.length)
      .split(".")
      .reverse();
    const domain = [];
    for (var i = 0; i < domainSplit.length; i++) {
      domain.push(domainSplit[i]);
      if (i > 0) {
        const theDomain = domain
          .slice()
          .reverse()
          .join(".");

        const dUrl = `${this._configuration.getIPStackFetchURL()}/${theDomain}`;
        const dQueryParam = this._configuration.getIPStackApiKey();

        // wait for 200 ms.
        await bluebird.delay(200);

        try {
          data = await this._get<Lib.IPStackResponse>(
            `${dUrl}?access_key=${dQueryParam}`
          );
          // if country_code exists, exit.
        } catch {
          /* supress error - most likely not found */
        }
        if (data.country_code) {
          break;
        }

        // if not found, try again with ip
        const ip = await this._getIpFromDomain(theDomain);
        const ipUrl = `${this._configuration.getIPStackFetchURL()}/${ip}`;
        const qParam = this._configuration.getIPStackApiKey();

        // wait for 200 ms.
        await bluebird.delay(200);

        try {
          data = await this._get<Lib.IPStackResponse>(
            `${ipUrl}?access_key=${qParam}`
          );
        } catch {
          /* supress error - most likely not found */
        }
        // if country_code exists, exit.
        if (data.country_code) {
          break;
        }
      }
    }
    if (data && data.country_code) {
      data.domain = rawDomain;
      return data;
    }

    this._logger.info(`The domain lookup failed for ${rawDomain}`);
    return <Lib.IPStackResponse>{
      domain: rawDomain,
      country_code: ""
    };
  }
}
