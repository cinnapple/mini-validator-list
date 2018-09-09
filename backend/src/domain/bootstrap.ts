import { Container } from "inversify";
import { Domains } from "./types";

import TYPES from "./";

import Validators from "./ripple/validators";
import DefaultUnl from "./ripple/defaultUnl";
import Geo from "./location/geo";
import Stats from "./analytics/stats";

export default (container: Container) => {
  container
    .bind<Domains.IValidators>(TYPES.Domain.Validators)
    .to(Validators)
    .inSingletonScope();
  container
    .bind<Domains.IDefaultUnl>(TYPES.Domain.DefaultUnl)
    .to(DefaultUnl)
    .inSingletonScope();
  container
    .bind<Domains.IGeo>(TYPES.Domain.Geo)
    .to(Geo)
    .inSingletonScope();
  container
    .bind<Domains.IStats>(TYPES.Domain.Stats)
    .to(Stats)
    .inSingletonScope();
};
