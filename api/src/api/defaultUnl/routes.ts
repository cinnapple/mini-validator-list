import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";

@injectable()
export default class DefaultUnlRoutes implements lib.IRoutes {
  constructor(
    @inject(TYPES.Api.DefaultUnlHandler)
    private _handler: api.IDefaultUnlHandler
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
