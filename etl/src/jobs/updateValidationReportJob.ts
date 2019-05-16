import { injectable, inject, TYPES } from "../di";
import {
  IJob,
  IRippleDataApi,
  IStore,
  IGetValidatorReportReponse,
  IDbValidationReport,
  IDbValidatorSchema,
  JobContext
} from "../types";
import * as bluebird from "bluebird";
import * as debug from "debug";
import FatalError from "../errors/FatalError";
const _d = debug("etl:UpdateValidationReportJob");

@injectable()
class UpdateValidationReportJob implements IJob {
  constructor(
    @inject(TYPES.Store) private _store: IStore,
    @inject(TYPES.RippleDataApi) private _rippleApi: IRippleDataApi
  ) {}

  private transform = (data: IGetValidatorReportReponse[]) => {
    const last_updated = new Date();
    return data.map(
      x =>
        ({
          validation_public_key: x.validation_public_key,
          date: new Date(x.date),
          chain: x.chain,
          score: parseFloat(x.score),
          total: parseFloat(x.total),
          missed: parseFloat(x.missed),
          created: last_updated,
          last_updated
        } as IDbValidationReport)
    );
  };

  private fetchAndStoreReports = async (
    data: Pick<IDbValidatorSchema, "validation_public_key">[],
    waitTime: number
  ) => {
    for (let d of data) {
      try {
        _d(`fetching for ${d.validation_public_key}`);
        await this._rippleApi
          .getValidatorReports(d.validation_public_key)
          .then(this.transform)
          .then(x =>
            this._store.upsert("validationreport", x, "validationreport_pk", [
              "created"
            ])
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
      .then(x => this.fetchAndStoreReports(x, waitTime))
      .then(x =>
        this._store.refreshMaterializedView([
          "m_validatordetails",
          "m_m_validatorreportcalendar"
        ])
      );
  }
}

export default UpdateValidationReportJob;
