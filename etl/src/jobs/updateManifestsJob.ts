import { injectable, inject, TYPES } from "../di";
import {
  IJob,
  IRippleDataApi,
  IStore,
  IDbValidatorSchema,
  JobContext,
  IDbManifests,
  IGetValidatorManifestsReponse
} from "../types";
import * as bluebird from "bluebird";
import * as debug from "debug";
import FatalError from "../errors/FatalError";
const _d = debug("etl:UpdateManifestsJob");

@injectable()
class UpdateManifestsJob implements IJob {
  constructor(
    @inject(TYPES.Store) private _store: IStore,
    @inject(TYPES.RippleDataApi) private _rippleApi: IRippleDataApi
  ) {}

  private transform = (data: IGetValidatorManifestsReponse[]) => {
    const last_updated = new Date();
    return data.map(
      x =>
        ({
          master_public_key: x.master_public_key,
          master_signature: x.master_signature,
          ephemeral_public_key: x.ephemeral_public_key,
          signature: x.signature,
          count: x.count,
          first_datetime: new Date(x.first_datetime),
          last_datetime: new Date(x.last_datetime),
          sequence: parseInt(x.sequence),
          created: last_updated,
          last_updated
        } as IDbManifests)
    );
  };

  private fetchAndStoreManifests = async (
    data: Pick<IDbValidatorSchema, "validation_public_key">[],
    waitTime: number
  ) => {
    for (let d of data) {
      try {
        _d(`fetching for ${d.validation_public_key}`);
        await this._rippleApi
          .getManifests(d.validation_public_key)
          .then(this.transform)
          .then(x =>
            this._store.upsert("manifests", x, "manifests_pk", ["created"])
          );
      } catch (_) {
        _d(_);
      }
      // wait for 30 secs for the next request
      await bluebird.delay(waitTime * 1000);
    }
  };

  execute(ctx: JobContext) {
    const waitTime = ctx.args["waitTime"];
    if (!waitTime) {
      throw new FatalError(`missing a required arg: waitTime`);
    }
    return this._store
      .get<IDbValidatorSchema>(
        `select validation_public_key from validatorssnapshot`
      )
      .then(x => this.fetchAndStoreManifests(x, waitTime));
  }
}

export default UpdateManifestsJob;
