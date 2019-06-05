import { Container } from "inversify";
import { TYPES } from "./inversify.types";

import config from "../helpers/config";
import PostgresStore from "../client/postgresStore";
import WebClient from "../client/webClient";
import RippleDataApi from "../client/rippleDataApi";
import GithubApi from "../client/githubApi";
import {
  IConfig,
  IStore,
  IRippleDataApi,
  IGithubApi,
  IWebClient,
  IGeoLocationApi,
  IJob,
  IHistoryFetchStrategyFactory,
  IRippleLibApi
} from "../types";
import UnlHistoryFetchStrategyFactory from "../helpers/historyFetchStrategyFactory";

import RippleLibApi from "../client/rippleLibApi";
import GeoLocationApi from "../client/geoLocationApi";
import UpdateGeoLocationJob from "../jobs/updateGeoLocationJob";
import UpdateUnlHistoryJob from "../jobs/updateUnlHistoryJob";
import UpdateValidatorsSnapshotJob from "../jobs/updateValidatorsSnapshotJob";
import UpdateUnlSnapshotJob from "../jobs/updateUnlSnapshotJob";
import UpdateDomainKeyMapJob from "../jobs/updateDomainKeyMapJob";
import UpdateValidatorProfilesJob from "../jobs/updateValidatorProfilesJob";
import UpdateValidationReportJob from "../jobs/updateValidationReportJob";
import UpdateManifestsJob from "../jobs/updateManifestsJob";
import UpdateRealtimeDataJob from "../jobs/updateRealtimeDataJob";

const kernel = new Container();

kernel.bind<IConfig>(TYPES.Config).toConstantValue(config);
kernel
  .bind<IStore>(TYPES.Store)
  .to(PostgresStore)
  .inSingletonScope();

// data APIs
kernel
  .bind<IWebClient>(TYPES.WebClient)
  .to(WebClient)
  .inSingletonScope();
kernel
  .bind<IRippleDataApi>(TYPES.RippleDataApi)
  .to(RippleDataApi)
  .inSingletonScope();
kernel
  .bind<IRippleLibApi>(TYPES.RippleLibApi)
  .to(RippleLibApi)
  .inSingletonScope();
kernel
  .bind<IGithubApi>(TYPES.GithubApi)
  .to(GithubApi)
  .inSingletonScope();
kernel
  .bind<IGeoLocationApi>(TYPES.GeoLocationApi)
  .to(GeoLocationApi)
  .inSingletonScope();
kernel
  .bind<IHistoryFetchStrategyFactory>(TYPES.UnlHistoryFetchStrategyFactory)
  .to(UnlHistoryFetchStrategyFactory)
  .inSingletonScope();

// jobs
kernel
  .bind<IJob>(TYPES.UpdateValidatorsSnapshotJob)
  .to(UpdateValidatorsSnapshotJob)
  .inTransientScope();
kernel
  .bind<IJob>(TYPES.UpdateUnlSnapshotJob)
  .to(UpdateUnlSnapshotJob)
  .inTransientScope();
kernel
  .bind<IJob>(TYPES.UpdateUnlHistoryJob)
  .to(UpdateUnlHistoryJob)
  .inTransientScope();
kernel
  .bind<IJob>(TYPES.UpdateGeoLocationJob)
  .to(UpdateGeoLocationJob)
  .inTransientScope();
kernel
  .bind<IJob>(TYPES.UpdateDomainKeyMapJob)
  .to(UpdateDomainKeyMapJob)
  .inTransientScope();
kernel
  .bind<IJob>(TYPES.UpdateValidatorProfilesJob)
  .to(UpdateValidatorProfilesJob)
  .inTransientScope();
kernel
  .bind<IJob>(TYPES.UpdateManifestsJob)
  .to(UpdateManifestsJob)
  .inTransientScope();
kernel
  .bind<IJob>(TYPES.UpdateValidationReportJob)
  .to(UpdateValidationReportJob)
  .inTransientScope();
kernel
  .bind<IJob>(TYPES.UpdateRealtimeDataJob)
  .to(UpdateRealtimeDataJob)
  .inTransientScope();

export { kernel };
