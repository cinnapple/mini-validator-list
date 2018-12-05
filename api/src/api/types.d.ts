declare namespace api {
  export interface IValidatorHandler {
    getValidatorSummary: lib.Handler<
      {},
      { d: string; h: number },
      domain.ValidatorSummary[]
    >;
  }

  export interface IStatsHandler {
    getStats: lib.Handler<{}, { h: number }, domain.Stats>;
    getDefaultUnlMovementStats: lib.Handler<
      {},
      {},
      domain.DefaultUnlMovementStats[]
    >;
  }

  export interface IDefaultUnlHandler {
    getDefaultUnlArchives: lib.Handler<{}, {}, domain.DefaultUnlArchiveEntry[]>;
    getDefaultUnl: lib.Handler<{ d: string }, {}, domain.DefaultUnl>;
  }
}
