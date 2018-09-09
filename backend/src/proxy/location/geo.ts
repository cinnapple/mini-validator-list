import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { IConfiguration, ICache } from "../../lib/types";
import { Domains, Models } from "../../domain/types";
import { Cache } from "../types";

import MOCK_GEO_DATA from "../../resources/mock.getDomainGeoList";

@injectable()
export default class GeoProxy implements Domains.IGeo {
  constructor(
    @inject(TYPES.Lib.Cache) private _cache: ICache,
    @inject(TYPES.Lib.Configuration) private _configuration: IConfiguration,
    @inject(TYPES.Domain.Geo) private _actual: Domains.IGeo
  ) {}

  getDomainGeoList = async (validators: Models.Validator[]) =>
    this._cache.get(
      Cache.IPSTACK_GEO.key,
      ``,
      () => {
        if (!this._configuration.isProduction()) {
          return Promise.resolve(<Models.DomainGeo[]>MOCK_GEO_DATA.list);
        }
        return this._actual.getDomainGeoList(validators);
      },
      Cache.IPSTACK_GEO.interval
    );
}
