import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../inversify.types";
import { Lib, Cache, IReadOnlyCacheManager } from "../types";

import CacheManager from "./cacheManager";

@injectable()
export default class CacheManagerFactory {
  private _cacheManagers = {};
  constructor(@inject(TYPES.Lib.Logger) protected _logger: Lib.ILogger) {}
  createReadonly<TCacheType>(
    key: Cache.MANAGERS
  ): IReadOnlyCacheManager<TCacheType> {
    return this.create(key);
  }

  create<TCacheType>(key: Cache.MANAGERS) {
    if (!this._cacheManagers[key]) {
      this._cacheManagers[key] = new CacheManager<TCacheType>(this._logger);
    }
    return this._cacheManagers[key];
  }
}
