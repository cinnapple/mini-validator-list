import { Handler } from "../lib/types";
import { Models } from "../domain/types";

export namespace Handlers {
  export interface IValidatorHandler {
    getValidatorSummary: Handler<
      {},
      { d: string; h: number },
      Models.ValidatorSummary[]
    >;
  }
  export interface IStatsHandler {
    getStats: Handler<{}, { h: number }, Models.Stats>;
    getDefaultUnlMovementStats: Handler<
      {},
      {},
      Models.DefaultUnlMovementStats[]
    >;
  }
  export interface IDefaultUnlHandler {
    getDefaultUnlArchives: Handler<{}, {}, Models.DefaultUnlArchiveEntry[]>;
    getDefaultUnl: Handler<{ d: string }, {}, Models.DefaultUnl>;
  }
}
