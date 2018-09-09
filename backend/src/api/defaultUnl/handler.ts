import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { ILogger } from "../../lib/types";
import { Domains } from "../../domain/types";
import { Handlers } from "../types";

@injectable()
export default class DefaultUnlHandler implements Handlers.IDefaultUnlHandler {
  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: ILogger,
    @inject(TYPES.Proxy.DefaultUnl) private _defaultUnl: Domains.IDefaultUnl
  ) {}

  getDefaultUnlArchives = async () => {
    return this._defaultUnl.getDefaultUnlArchives();
  };

  getDefaultUnl = async args => {
    const date = args.params.date;
    const archives = await this._defaultUnl.getDefaultUnlArchives();
    return this._defaultUnl.getDefaultUnl(date, archives);
  };
}
