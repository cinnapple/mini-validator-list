import { Container } from "inversify";

import TYPES from "./inversify.types";

import GitHubService from "./github/service";
import RippleDataService from "./rippleData/service";
import DefaultUnlService from "./defaultUnl/service";
import GeoService from "./geoService/service";

export default (container: Container) => {
  container
    .bind<service.IGitHubService>(TYPES.Service.GitHubService)
    .to(GitHubService)
    .inSingletonScope();
  container
    .bind<service.IRippleDataService>(TYPES.Service.RippleDataService)
    .to(RippleDataService)
    .inSingletonScope();
  container
    .bind<service.IGeoService>(TYPES.Service.GeoService)
    .to(GeoService)
    .inSingletonScope();
  container
    .bind<service.IDefaultUnlService>(TYPES.Service.DefaultUnlService)
    .to(DefaultUnlService)
    .inSingletonScope();
};
