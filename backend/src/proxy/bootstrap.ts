import { Container } from "inversify";
import { Domains } from "../domain/types";

import TYPES from "./";

import Validators from "./ripple/validators";
import DefaultUnl from "./ripple/defaultUnl";
import Geo from "./location/geo";
import Stats from "./analytics/stats";

export default (container: Container) => {
  container
    .bind<Domains.IValidators>(TYPES.Proxy.Validators)
    .to(Validators)
    .inSingletonScope();
  container
    .bind<Domains.IDefaultUnl>(TYPES.Proxy.DefaultUnl)
    .to(DefaultUnl)
    .inSingletonScope();
  container
    .bind<Domains.IGeo>(TYPES.Proxy.Geo)
    .to(Geo)
    .inSingletonScope();
  container
    .bind<Domains.IStats>(TYPES.Proxy.Stats)
    .to(Stats)
    .inSingletonScope();
};