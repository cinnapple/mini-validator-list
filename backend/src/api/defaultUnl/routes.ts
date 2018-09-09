import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { ILogger, IRoutes } from "../../lib/types";
import { Handlers } from "../types";

@injectable()
export default class DefaultUnlRoutes implements IRoutes {
  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: ILogger,
    @inject(TYPES.Api.DefaultUnlHandler)
    private _handler: Handlers.IDefaultUnlHandler
  ) {}

  get() {
    return [
      {
        method: "GET",
        path: "/archives",
        handler: this._handler.getDefaultUnlArchives
      },
      {
        method: "GET",
        path: "/archives/:date",
        handler: this._handler.getDefaultUnl
      }
    ];
  }
}
