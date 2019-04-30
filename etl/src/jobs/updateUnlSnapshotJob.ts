import { injectable, inject, TYPES } from "../di";
import { IJob, IStore, IWebClient, JobContext } from "../types";
import UnlHelper from "../helpers/unlHelper";
import FatalError from "../errors/FatalError";

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

  execute(ctx: JobContext) {
    const host = ctx.args["host"];
    if (!host) {
      throw new FatalError(`missing a required arg: host`);
    }
    return this._webClient
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
}

export default UpdateUnlSnapshotJob;
