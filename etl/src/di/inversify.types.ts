const TYPES = {
  Config: Symbol.for("config"),
  Store: Symbol.for("Store"),
  WebClient: Symbol.for("WebClient"),
  RippleDataApi: Symbol.for("RippleDataApi"),
  GithubApi: Symbol.for("GithubApi"),
  GeoLocationApi: Symbol.for("GeoLocationApi"),
  UpdateValidatorsSnapshotJob: Symbol.for("UpdateValidatorsSnapshotJob"),
  UpdateGeoLocationJob: Symbol.for("UpdateGeoLocationJob"),
  UpdateUnlSnapshotJob: Symbol.for("UpdateUnlSnapshotJob"),
  UpdateUnlHistoryJob: Symbol.for("UpdateUnlHistoryJob"),
  UpdateDomainKeyMapJob: Symbol.for("UpdateDomainKeyMapJob"),
  UpdateValidatorProfilesJob: Symbol.for("UpdateValidatorProfilesJob"),
  UpdateValidationReportJob: Symbol.for("UpdateValidationReportJob"),
  UnlHistoryFetchStrategyFactory: Symbol.for("UnlHistoryFetchStrategyFactory")
};

export { TYPES };
