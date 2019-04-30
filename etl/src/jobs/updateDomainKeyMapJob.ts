import { injectable, inject, TYPES } from "../di";
import {
  IJob,
  IRippleDataApi,
  IStore,
  IGetValidatorsResponse,
  IDbDomainKeyMapSchema,
  JobContext
} from "../types";
import * as debug from "debug";
import * as wellKnown from "../resources/wellknown-validators.json";
const _d = debug("etl:UpdateDomainKeyMapJob");

type GetValidatorsResponsePick = Pick<
  IGetValidatorsResponse,
  "validation_public_key" | "domain"
>;

@injectable()
class UpdateDomainKeyMapJob implements IJob {
  constructor(
    @inject(TYPES.Store) private _store: IStore,
    @inject(TYPES.RippleDataApi) private _rippleApi: IRippleDataApi
  ) {}

  private mergeWellKnownKeys = (data: GetValidatorsResponsePick[]) => {
    Object.keys(wellKnown).forEach(key => {
      const wellknownDomain = (wellKnown as any)[key];
      const found = data.find(d => d.validation_public_key === key);
      if (!found) {
        data.push({
          validation_public_key: key,
          domain: wellknownDomain
        });
      } else if (!found.domain) {
        found.domain = wellknownDomain;
      }
    });
    return data;
  };

  private transform = (data: GetValidatorsResponsePick[]) => {
    const last_updated = new Date();
    return data
      .filter(x => x.domain) // exclude empty domains
      .map(
        x =>
          ({
            validation_public_key: x.validation_public_key,
            domain: x.domain,
            created: last_updated,
            last_updated
          } as IDbDomainKeyMapSchema)
      );
  };

  execute(ctx: JobContext) {
    return this._rippleApi
      .getNetworkValidators()
      .then(this.mergeWellKnownKeys)
      .then(this.transform)
      .then(x =>
        this._store.upsert("domainkeymap", x, "domainkeymap_pk", [
          "created",
          "validation_public_key"
        ])
      );
  }
}

export default UpdateDomainKeyMapJob;
