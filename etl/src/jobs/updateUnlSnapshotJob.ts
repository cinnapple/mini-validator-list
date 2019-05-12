import { injectable, inject, TYPES } from "../di";
import { IJob, IStore, IWebClient, JobContext } from "../types";
import UnlHelper from "../helpers/unlHelper";
import FatalError from "../errors/FatalError";
import * as debug from "debug";
const _d = debug("etl:UpdateUnlSnapshotJob");

@injectable()
class UpdateUnlSnapshotJob implements IJob {
  constructor(
    @inject(TYPES.Store) private _store: IStore,
    @inject(TYPES.WebClient) private _webClient: IWebClient
  ) {}

  private transform = (data: any, host: string) => {
    const result = UnlHelper.parseUnl(data.blob);
    const last_updated = new Date();
    return result.map(validator_public_key => ({
      host,
      validator_public_key,
      created: last_updated,
      last_updated
    }));
  };

  async execute(ctx: JobContext) {
    const hosts: string[] = ctx.args["hosts"];
    if (!hosts) {
      throw new FatalError(`missing a required arg: hosts`);
    }
    for (let host of hosts) {
      _d(`fetching for ${host}`);
      await this._webClient
        .get(host)
        .then(x => this.transform(x, host))
        .then(x =>
          this._store.upsert("unlsnapshot", x, "unique_key", [
            "created",
            "validator_public_key",
            "host"
          ])
        );
    }

    return this._store.refreshMaterializedView(["m_validatordetails"]);
  }
}

export default UpdateUnlSnapshotJob;
