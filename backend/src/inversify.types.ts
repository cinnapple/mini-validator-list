const TYPES = {
  Server: Symbol.for("Server"),
  RippleService: Symbol.for("RippleService"),
  StatsService: Symbol.for("StatsService"),
  GoogleService: Symbol.for("GoogleService"),
  GitHubService: Symbol.for("GitHubService"),
  Querier: Symbol.for("Querier"),
  Configuration: Symbol.for("Configuration"),
  ProcessEnv: Symbol.for("ProcessEnv"),
  Crypto: Symbol.for("Crypto"),
  CacheManagerFactory: Symbol.for("CacheManagerFactory"),
  IntervalManager: Symbol.for("IntervalManager"),
  ThirdPartyLibFactory: Symbol.for("ThirdPartyLibFactory"),
  Lib: {
    Koa: {
      App: Symbol.for("Lib.Koa.App"),
      Router: Symbol.for("Lib.Koa.Router")
    },
    Logger: Symbol.for("Logger"),
    GoogleApi: Symbol.for("GoogleApi"),
    GitHubApi: Symbol.for("GitHubApi")
  }
};

export { TYPES };
