import { injectable, inject, TYPES } from "../di";
import {
  IJob,
  IStore,
  IGeoLocationApi,
  IRippleDataApi,
  IDbGeoLocationSchema,
  IGetValidatorsResponse
} from "../types";
import { uniq } from "../helpers/util";
import * as debug from "debug";
const _d = debug("etl:UpdateGeoLocationJob");

@injectable()
class UpdateGeoLocationJob implements IJob {
  constructor(
    @inject(TYPES.Store) private _store: IStore,
    @inject(TYPES.RippleDataApi) private _rippleApi: IRippleDataApi,
    @inject(TYPES.GeoLocationApi) private _geoLocationApi: IGeoLocationApi
  ) {}

  private transform = async (data: IGetValidatorsResponse[]) => {
    const last_updated = new Date();
    const results: IDbGeoLocationSchema[] = [];
    const failedDomains: string[] = [];

    for (let domain of uniq(data.map((v: any) => v.domain))) {
      _d(domain);
      await this._geoLocationApi
        .tryGetGeoData(domain)
        .then(
          x =>
            x &&
            results.push({
              domain,
              continent_name: x.continent_name,
              continent_code: x.continent_code,
              country_code: x.country_code,
              country_name: x.country_name,
              region_code: x.region_code,
              region_name: x.region_name,
              city: x.city,
              latitude: x.latitude,
              longitude: x.longitude,
              created: last_updated,
              last_updated
            })
        )
        .catch(err => failedDomains.push(`${domain}`) && _d(err));
    }

    if (failedDomains.length > 0) {
      console.log(
        `failed to get the geo data for: ${failedDomains.join(", ")}`
      );
    }

    return results;
  };

  execute() {
    return this._rippleApi
      .getNetworkValidators()
      .then(this.transform)
      .then(x =>
        this._store.upsert("geolocation", x, "geoinfo_pk", [
          "created",
          "domain"
        ])
      );
  }
}

export default UpdateGeoLocationJob;
