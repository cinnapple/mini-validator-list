import { Container } from "inversify";
import { IRoutes } from "../lib/types";
import { Handlers } from "./types";

import TYPES from "./";

import DefaultUnlHandler from "./defaultUnl/handler";
import StatsHandler from "./stats/handler";
import ValidatorHandler from "./validators/handler";
import DefaultUnlRoutes from "./defaultUnl/routes";
import StatsRoutes from "./stats/routes";
import ValidatorRoutes from "./validators/routes";

export default (container: Container) => {
  // handlers
  container
    .bind<Handlers.IDefaultUnlHandler>(TYPES.Api.DefaultUnlHandler)
    .to(DefaultUnlHandler)
    .inSingletonScope();
  container
    .bind<Handlers.IStatsHandler>(TYPES.Api.StatsHandler)
    .to(StatsHandler)
    .inSingletonScope();
  container
    .bind<Handlers.IValidatorHandler>(TYPES.Api.ValidatorHandler)
    .to(ValidatorHandler)
    .inSingletonScope();

  // routes
  container
    .bind<IRoutes>(TYPES.Api.DefaultUnlRoutes)
    .to(DefaultUnlRoutes)
    .inSingletonScope();
  container
    .bind<IRoutes>(TYPES.Api.StatsRoutes)
    .to(StatsRoutes)
    .inSingletonScope();
  container
    .bind<IRoutes>(TYPES.Api.ValidatorRoutes)
    .to(ValidatorRoutes)
    .inSingletonScope();
};
