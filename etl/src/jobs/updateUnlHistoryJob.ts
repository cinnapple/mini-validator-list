import { injectable, inject, TYPES } from "../di";
import {
  IJob,
  IStore,
  JobContext,
  IHistoryFetchStrategyFactory,
  IWebClient,
  IUnlHistory
} from "../types";
import UnlHelper from "../helpers/unlHelper";
import FatalError from "../errors/FatalError";
import * as debug from "debug";
const _d = debug("etl:UpdateUnlHistoryJob");

@injectable()
class UpdateUnlHistoryJob implements IJob {
  constructor(
    @inject(TYPES.Store) private _store: IStore,
    @inject(TYPES.WebClient) private _webClient: IWebClient,
    @inject(TYPES.UnlHistoryFetchStrategyFactory)
    private _historyFetchStrategyFactory: IHistoryFetchStrategyFactory
  ) {}

  private extractValsFromUnl = async (data: { blob: string }) =>
    UnlHelper.parseUnl(data.blob);

  private fetchEach = async (data: IUnlHistory[], host: string) => {
    const last_updated = new Date();
    const results: any[] = [];

    for (let d of data) {
      _d(`fetching for ${JSON.stringify(d)}`);
      await this._webClient
        .get(d.url)
        .then(this.extractValsFromUnl)
        .then(x =>
          x.map(validator_public_key =>
            results.push({
              host,
              validator_public_key,
              as_of_date: d.date,
              created: last_updated,
              last_updated
            })
          )
        )
        .catch(err => _d(err));
    }
    return results;
  };

  execute(ctx: JobContext) {
    const host = ctx.args["host"];
    if (!host) {
      throw new FatalError(`missing a required arg: host`);
    }
    const fetcher = this._historyFetchStrategyFactory.create(host);
    return fetcher
      .getList()
      .then(x => this.fetchEach(x, host))
      .then(x =>
        this._store.upsert("unlhistory", x, "unique_pk", ["created", "host"])
      );
  }
}

export default UpdateUnlHistoryJob;
