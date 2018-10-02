import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { IRoutes } from "../../lib/types";
import { Handlers } from "../types";

@injectable()
export default class StatsRoutes implements IRoutes {
  constructor(
    @inject(TYPES.Api.StatsHandler) private _handler: Handlers.IStatsHandler
  ) {}

  get() {
    return [
      {
        method: "GET",
        path: "/summary/:lastNHours",
        handler: this._handler.getStats
      },
      {
        method: "GET",
        path: "/defaultUnlMovements",
        handler: this._handler.getDefaultUnlMovementStats
      }
    ];
  }
}
