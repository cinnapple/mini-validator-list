const TYPES = {
  Config: Symbol.for("config"),
  Store: Symbol.for("Store"),
  WebClient: Symbol.for("WebClient"),
  RippleDataApi: Symbol.for("RippleDataApi"),
  RippleLibApi: Symbol.for("RippleLibApi"),
  GithubApi: Symbol.for("GithubApi"),
  GeoLocationApi: Symbol.for("GeoLocationApi"),
  UpdateValidatorsSnapshotJob: Symbol.for("UpdateValidatorsSnapshotJob"),
  UpdateGeoLocationJob: Symbol.for("UpdateGeoLocationJob"),
  UpdateUnlSnapshotJob: Symbol.for("UpdateUnlSnapshotJob"),
  UpdateUnlHistoryJob: Symbol.for("UpdateUnlHistoryJob"),
  UpdateDomainKeyMapJob: Symbol.for("UpdateDomainKeyMapJob"),
  UpdateValidatorProfilesJob: Symbol.for("UpdateValidatorProfilesJob"),
  UpdateValidationReportJob: Symbol.for("UpdateValidationReportJob"),
  UpdateManifestsJob: Symbol.for("UpdateManifestsJob"),
  UpdateRealtimeDataJob: Symbol.for("UpdateRealtimeDataJob"),
  UnlHistoryFetchStrategyFactory: Symbol.for("UnlHistoryFetchStrategyFactory")
};

export { TYPES };
