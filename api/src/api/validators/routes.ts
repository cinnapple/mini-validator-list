import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";

@injectable()
export default class ValidatorRoutes implements lib.IRoutes {
  constructor(
    @inject(TYPES.Api.ValidatorHandler) private _handler: api.IValidatorHandler
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
