import { Container } from "inversify";
import {
  IDefaultUnlService,
  IGitHubService,
  IRippleDataService,
  IGeoService
} from "./types";

import TYPES from "./";

import GitHubService from "./github/service";
import RippleDataService from "./rippleData/service";
import DefaultUnlService from "./defaultUnl/service";
import GeoService from "./geoService/service";

export default (container: Container) => {
  container
    .bind<IGitHubService>(TYPES.Service.GitHubService)
    .to(GitHubService)
    .inSingletonScope();
  container
    .bind<IRippleDataService>(TYPES.Service.RippleDataService)
    .to(RippleDataService)
    .inSingletonScope();
  container
    .bind<IGeoService>(TYPES.Service.GeoService)
    .to(GeoService)
    .inSingletonScope();
  container
    .bind<IDefaultUnlService>(TYPES.Service.DefaultUnlService)
    .to(DefaultUnlService)
    .inSingletonScope();
};
