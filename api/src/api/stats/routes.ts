import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";

@injectable()
export default class StatsRoutes implements lib.IRoutes {
  constructor(
    @inject(TYPES.Api.StatsHandler) private _handler: api.IStatsHandler
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
