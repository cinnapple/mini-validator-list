import { Container } from "inversify";

import TYPES from "./inversify.types";

import Validators from "./ripple/validators";
import DefaultUnl from "./ripple/defaultUnl";
import Geo from "./location/geo";
import Stats from "./analytics/stats";

export default (container: Container) => {
  container
    .bind<domain.IValidators>(TYPES.Proxy.Validators)
    .to(Validators)
    .inSingletonScope();
  container
    .bind<domain.IDefaultUnl>(TYPES.Proxy.DefaultUnl)
    .to(DefaultUnl)
    .inSingletonScope();
  container
    .bind<domain.IGeo>(TYPES.Proxy.Geo)
    .to(Geo)
    .inSingletonScope();
  container
    .bind<domain.IStats>(TYPES.Proxy.Stats)
    .to(Stats)
    .inSingletonScope();
};
