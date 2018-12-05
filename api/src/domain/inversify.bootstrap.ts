import { Container } from "inversify";

// tslint:disable-next-line:import-name
import TYPES from "./inversify.types";

// tslint:disable-next-line:import-name
import Validators from "./ripple/validators";
// tslint:disable-next-line:import-name
import DefaultUnl from "./ripple/defaultUnl";
// tslint:disable-next-line:import-name
import Geo from "./location/geo";
// tslint:disable-next-line:import-name
import Stats from "./analytics/stats";

export default (container: Container) => {
  container
    .bind<domain.IValidators>(TYPES.Domain.Validators)
    .to(Validators)
    .inSingletonScope();
  container
    .bind<domain.IDefaultUnl>(TYPES.Domain.DefaultUnl)
    .to(DefaultUnl)
    .inSingletonScope();
  container
    .bind<domain.IGeo>(TYPES.Domain.Geo)
    .to(Geo)
    .inSingletonScope();
  container
    .bind<domain.IStats>(TYPES.Domain.Stats)
    .to(Stats)
    .inSingletonScope();
};
