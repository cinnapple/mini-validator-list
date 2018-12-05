import { Container } from "inversify";

import TYPES from "./inversify.types";

import DefaultUnlHandler from "./defaultUnl/handler";
import StatsHandler from "./stats/handler";
import ValidatorHandler from "./validators/handler";
import DefaultUnlRoutes from "./defaultUnl/routes";
import StatsRoutes from "./stats/routes";
import ValidatorRoutes from "./validators/routes";

export default (container: Container) => {
  // handlers
  container
    .bind<api.IDefaultUnlHandler>(TYPES.Api.DefaultUnlHandler)
    .to(DefaultUnlHandler)
    .inSingletonScope();
  container
    .bind<api.IStatsHandler>(TYPES.Api.StatsHandler)
    .to(StatsHandler)
    .inSingletonScope();
  container
    .bind<api.IValidatorHandler>(TYPES.Api.ValidatorHandler)
    .to(ValidatorHandler)
    .inSingletonScope();

  // routes
  container
    .bind<lib.IRoutes>(TYPES.Api.DefaultUnlRoutes)
    .to(DefaultUnlRoutes)
    .inSingletonScope();
  container
    .bind<lib.IRoutes>(TYPES.Api.StatsRoutes)
    .to(StatsRoutes)
    .inSingletonScope();
  container
    .bind<lib.IRoutes>(TYPES.Api.ValidatorRoutes)
    .to(ValidatorRoutes)
    .inSingletonScope();
};
