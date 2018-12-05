import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import MOCK_GEO_DATA from "../../resources/mock.getDomainGeoList";
import { cache, cached } from "../../lib/cache/smartCache";
import Cache from "../../proxy/cacheKeys";

@injectable()
export default class GeoProxy implements domain.IGeo {
  constructor(
    @inject(TYPES.Lib.Configuration) private _configuration: lib.IConfiguration,
    @inject(TYPES.Domain.Geo) private _actual: domain.IGeo
  ) {}

  @cache({ key: Cache.Geo.key, interval: Cache.Geo.interval })
  async getDomainGeoList(
    @cached(Cache.Validators.key) validators: domain.Validator[]
  ) {
    if (!this._configuration.isProduction) {
      return Promise.resolve(<domain.DomainGeo[]>MOCK_GEO_DATA.list);
    }
    return this._actual.getDomainGeoList(validators);
  }
}
