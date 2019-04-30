import { injectable, inject, TYPES } from "../di";
import WebClient from "./webClient";
import { IConfig, IGeoLocationApi, IIPStackResponse } from "../types";
import * as dns from "dns";
import * as bluebird from "bluebird";
import * as debug from "debug";
const _d = debug("etl:GeoLocationApi");

@injectable()
class GeoLocationApi extends WebClient implements IGeoLocationApi {
  private _lookup = bluebird.promisify(dns.lookup);

  constructor(@inject(TYPES.Config) private _config: IConfig) {
    super();
  }

  /**
   * returns an array of domain chunks by splitting it with '/' and reversing the elements.
   * e.g. "ripple.com" -> ['com', 'ripple']
   */
  private _reverseSplit = (domain: string) => {
    const trimIndex = domain.indexOf("/");
    return domain
      .slice(0, trimIndex >= 0 ? trimIndex : domain.length)
      .split(".")
      .reverse();
  };

  /**
   * returns a string by concatenating the given domain chunk in a reverse order
   * e.g. ['com', 'ripple'] -> "ripple.com"
   */
  private _reverseJoin = (domainChunks: string[]) => {
    return domainChunks
      .slice()
      .reverse()
      .join(".");
  };

  getGeoData = async (domainOrIp: string) => {
    await bluebird.delay(200);
    const url = `http://api.ipstack.com/${domainOrIp}?access_key=${
      this._config.ipstackToken
    }`;
    return this.get<IIPStackResponse>(url);
  };

  getGeoDataWithCountryCode = (domainOrIp: string) => {
    _d(`trying with ${domainOrIp}`);
    return new Promise<IIPStackResponse>((resolve, reject) =>
      this.getGeoData(domainOrIp).then(res =>
        res && res.country_code ? resolve(res) : reject(`no country code found`)
      )
    );
  };

  resolveIpFromDomain = async (domain: string) => {
    return this._lookup(domain);
  };

  tryGetGeoData = async (domain: string) => {
    const reverseSplit = this._reverseSplit(domain);
    const domainChunks = [];
    let res: IIPStackResponse | void;

    for (let i = 0; i < reverseSplit.length; i++) {
      domainChunks.push(reverseSplit[i]);
      if (i > 0) {
        const partialDomain = this._reverseJoin(domainChunks);
        _d(`trying to get geo data for ${partialDomain}...`);
        // try to find the domain
        res = await this.getGeoDataWithCountryCode(partialDomain).catch(() =>
          // if not found, then try with ip
          this.resolveIpFromDomain(partialDomain)
            .then(this.getGeoDataWithCountryCode)
            .catch(err => _d(err))
        );

        if (res) {
          break;
        }
      }
    }

    if (!res) {
      _d(`...couldn't get the geo data for ${domain}`);
      throw Error(`couldn't get the geo data for ${domain}`);
    }

    return res;
  };
}

export default GeoLocationApi;
