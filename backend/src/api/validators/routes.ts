import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { ILogger, IRoutes } from "../../lib/types";
import { Handlers } from "../types";

@injectable()
export default class ValidatorRoutes implements IRoutes {
  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: ILogger,
    @inject(TYPES.Api.ValidatorHandler)
    private _handler: Handlers.IValidatorHandler
  ) {}

  get() {
    return [
      {
        method: "GET",
        path: "/validators",
        handler: this._handler.getValidatorSummary
      }
    ];
  }
}
