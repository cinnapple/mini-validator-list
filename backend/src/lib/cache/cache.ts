import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { ILogger, ICache, Frequency, HashMap } from "../types";
import * as NodeCache from "node-cache";

@injectable()
export default class Cache implements ICache {
  private _cache: NodeCache;
  private _intervalKeys: HashMap<NodeJS.Timer>;

  constructor(@inject(TYPES.Lib.Logger) private _logger: ILogger) {
    this._cache = new NodeCache();
    this._intervalKeys = {};
  }

  private _createCacheKey = (key, variant) => key + "_" + variant;

  private _startInterval = async <TItem>(
    key: string,
    setter: () => Promise<TItem>,
    interval: number
  ) => {
    if (!this._intervalKeys[key]) {
      this._logger.info(`Registering a new interval for the cache: ${key}...`);
      const cacheKey = this._createCacheKey(key, "");
      this._intervalKeys[key] = setInterval(async () => {
        this._logger.info(`Re-populating the cache: ${key}...`);

        // delete all keys that have the same root.
        this.delete(cacheKey, true);

        const newValue = await setter();

        // set the new one.
        this._cache.set(cacheKey, newValue);
      }, interval);
    }
  };

  get = async <TItem>(
    key: string,
    variant: string,
    setter: () => Promise<TItem>,
    interval: number
  ) => {
    const cacheKey = this._createCacheKey(key, variant);
    const value = this._cache.get<TItem>(cacheKey);
    if (value) {
      this._logger.info(
        `The cache: ${this._createCacheKey(key, variant)} found.`
      );
      return await value;
    }

    this._logger.info(`The cache: ${cacheKey} does not exit. Setting...`);
    const newValue = await setter();
    this._cache.set(cacheKey, newValue);
    if (interval !== Frequency.Never) {
      this._startInterval(key, setter, interval);
    }
    return newValue;
  };

  delete = (key: string, startsWith: boolean = false) => {
    if (startsWith) {
      this._cache.keys().forEach(k => {
        if (k.startsWith(key)) {
          this._cache.del(k);
        }
      });
    } else {
      this._cache.del(key);
    }
  };
}
