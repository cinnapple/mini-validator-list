import { injectable, inject, TYPES } from "../di";
import {
  IJob,
  IRippleLibApi,
  IConfig,
  RealtimeValidationData,
  RealtimeLedgerData
} from "../types";
import * as Redis from "ioredis";
import * as debug from "debug";
const _d = debug("etl:UpdateRealtimeDataJob");

@injectable()
class UpdateRealtimeDataJob implements IJob {
  private readonly _redisPub: Redis.Redis;
  constructor(
    @inject(TYPES.Config) private _config: IConfig,
    @inject(TYPES.RippleLibApi) private _rippleLibApi: IRippleLibApi
  ) {
    this._redisPub = new Redis(this._config.redisUrl);
  }

  private onLedger = (item: RealtimeLedgerData) => {
    this._redisPub.publish(`newLedgerCreated`, JSON.stringify(item));
  };

  private onValidation = (item: RealtimeValidationData) => {
    this._redisPub.publish(`validationReceived`, JSON.stringify(item));
  };

  async execute() {
    this._rippleLibApi.subscribe({
      maxConnections: null,
      handleValidation: this.onValidation,
      handleLedger: this.onLedger
    });
    _d(`subscribed to rippleds`);
  }
}

export default UpdateRealtimeDataJob;
