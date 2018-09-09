import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { ILogger, IRoutes } from "../../lib/types";
import { Handlers } from "../types";

@injectable()
export default class StatsRoutes implements IRoutes {
  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: ILogger,
    @inject(TYPES.Api.StatsHandler) private _handler: Handlers.IStatsHandler
  ) {}

  get() {
    return [
      {
        method: "GET",
        path: "/summary/:lastNHours",
        handler: this._handler.getStats
      }
    ];
  }
}
