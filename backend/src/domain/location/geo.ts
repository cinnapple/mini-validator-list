import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { ILogger, IConfiguration } from "../../lib/types";
import { Service, IGeoService } from "../../service/types";
import { Domains, Models } from "../types";

const _roundCoordinate = (num: number) => {
  const factor = 100;
  return Math.round(num * factor) / factor;
};

const _reverseSplit = (domain: string) => {
  const trimIndex = domain.indexOf("/");
  return domain
    .slice(0, trimIndex >= 0 ? trimIndex : domain.length)
    .split(".")
    .reverse();
};

const _reverseJoin = (domainChunks: string[]) => {
  return domainChunks
    .slice()
    .reverse()
    .join(".");
};

@injectable()
export default class Geo implements Domains.IGeo {
  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: ILogger,
    @inject(TYPES.Lib.Configuration) protected _configuration: IConfiguration,
    @inject(TYPES.Service.GeoService) protected _geoService: IGeoService
  ) {}

  private _createEmptyDomain = domain => ({
    domain: domain,
    ip: "",
    country_code: "",
    country_name: "",
    region_name: "",
    city: "",
    latitude: -1,
    longitude: -1
  });

  private _lookup = async (
    domain: string
  ): Promise<Service.Geo.GeoResponseData> => {
    let data: Service.Geo.GeoResponseData;
    const reverseSplit = _reverseSplit(domain);
    const domainChunks = [];

    for (var i = 0; i < reverseSplit.length; i++) {
      domainChunks.push(reverseSplit[i]);
      if (i > 0) {
        const partialDomain = _reverseJoin(domainChunks);
        data = await this._geoService.getGeoData(partialDomain);
        if (data.country_code) {
          break;
        }
        // if not found, try again with ip
        const ip = await this._geoService.getIpFromDomain(partialDomain);
        data = await this._geoService.getGeoData(ip);
        if (data.country_code) {
          break;
        }
      }
    }

    // success
    if (data && data.country_code) {
      data.domain = domain;
      return data;
    }

    const logMessage = `The domain lookup failed for ${domain}`;
    this._logger.warn(logMessage);
    throw Error(logMessage);
  };

  getDomainGeoList = async (validators: Models.Validator[]) => {
    try {
      // lookup ip address from the domain
      const domains = {};
      validators.reduce((prev, v) => {
        if (v.domain && !domains[v.domain]) {
          prev.push(v.domain);
          domains[v.domain] = true;
        }
        return prev;
      }, []);

      const geoDataSet = await Promise.all(
        Object.keys(domains).map(domain =>
          this._lookup(domain).catch(() => this._createEmptyDomain(domain))
        )
      );

      const list = geoDataSet.map(geoData => ({
        domain: geoData.domain,
        ip: geoData.ip,
        country_name: geoData.country_name,
        country_code: geoData.country_code,
        region_name: geoData.region_name,
        city: geoData.city,
        latitude: _roundCoordinate(geoData.latitude),
        longitude: _roundCoordinate(geoData.longitude)
      }));

      this._logger.info(
        `${list.length} domain lookup succeeded out of ${
          validators.length
        } validators.`
      );
      return list;
    } catch (err) {
      this._logger.error(err);
      throw err;
    }
  };
}
