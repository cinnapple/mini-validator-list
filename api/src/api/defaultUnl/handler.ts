import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";

@injectable()
export default class DefaultUnlHandler implements api.IDefaultUnlHandler {
  constructor(
    @inject(TYPES.Proxy.DefaultUnl) private _defaultUnl: domain.IDefaultUnl
  ) {}

  getDefaultUnlArchives = async () => {
    return this._defaultUnl.getDefaultUnlArchives();
  };

  getDefaultUnl = async args => {
    const date = args.params.date;
    const archives = await this._defaultUnl.getDefaultUnlArchives();
    const data = await this._defaultUnl.getDefaultUnl(date, archives);
    return data;
  };
}
