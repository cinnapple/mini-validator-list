import { Container } from "inversify";
import { TYPES } from "../inversify";
import { IRoutes } from "../lib/types";

const routeTypes = [
  TYPES.Api.DefaultUnlRoutes,
  TYPES.Api.StatsRoutes,
  TYPES.Api.ValidatorRoutes
];

export default (container: Container) => {
  return routeTypes.reduce((prev, type) => {
    return prev.concat(container.get<IRoutes>(type).get());
  }, []);
};
