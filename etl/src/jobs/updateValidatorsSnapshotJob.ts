import { injectable, inject, TYPES } from "../di";
import {
  IJob,
  IRippleDataApi,
  IStore,
  IDbValidatorSchema,
  IGetValidatorsResponse
} from "../types";

@injectable()
class UpdateValidatorsSnapshotJob implements IJob {
  constructor(
    @inject(TYPES.Store) private _store: IStore,
    @inject(TYPES.RippleDataApi) private _rippleApi: IRippleDataApi
  ) {}

  private transform = (data: IGetValidatorsResponse[]) => {
    const last_updated = new Date();
    return data.map(
      x =>
        ({
          validation_public_key: x.validation_public_key,
          domain: x.domain || "",
          chain: x.chain,
          current_index: x.current_index,
          agreement_1h_missed: x.agreement_1h.missed,
          agreement_1h_total: x.agreement_1h.total,
          agreement_1h_score: parseFloat(x.agreement_1h.score),
          agreement_1h_incomplete: x.agreement_1h.incomplete,
          agreement_24h_missed: x.agreement_24h.missed,
          agreement_24h_total: x.agreement_24h.total,
          agreement_24h_score: parseFloat(x.agreement_24h.score),
          agreement_24h_incomplete: x.agreement_24h.incomplete,
          partial: x.partial,
          unl: x.unl,
          created: last_updated,
          last_updated
        } as IDbValidatorSchema)
    );
  };

  execute() {
    return this._rippleApi
      .getNetworkValidators()
      .then(this.transform)
      .then(x =>
        this._store.upsert("validatorssnapshot", x, "validatorssnapshot_pk", [
          "created",
          "validation_public_key",
          "domain"
        ])
      );
  }
}

export default UpdateValidatorsSnapshotJob;
