import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { Frequency } from "../enum";

class InMemoryCache {
  private _obj: lib.HashMap<any>;
  constructor() {
    this._obj = {};
  }

  get = <TItem>(name: string) => {
    return <TItem>this._obj[name];
  };

  set = (name: string, value: any) => {
    if (this.get(name)) {
      this.del(name);
    }
    this._obj[name] = value;
  };

  del = (name: string) => {
    delete this._obj[name];
  };

  keys = () => {
    return Object.keys(this._obj);
  };
}

@injectable()
export default class Cache implements lib.ICache {
  private _logger: lib.ILogger;
  private _cache: InMemoryCache;
  private _intervalKeys: lib.HashMap<NodeJS.Timer>;

  constructor(
    @inject(TYPES.Lib.LoggerFactory) _loggerFactory: lib.ILoggerFactory
  ) {
    this._logger = _loggerFactory.create("Lib.Cache");
    this._cache = new InMemoryCache();
    this._intervalKeys = {};
  }

  private _createCacheKey = (key: string, variant: string) => {
    if (!key) {
      throw new Error(`Cache key cannot be empty`);
    }
    variant = variant || "";
    return key + "_" + variant;
  };

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

        const newValue = await setter().catch(err => {
          this._logger.error(`Failed to set ${cacheKey}: ${err}`);
          return undefined;
        });

        if (newValue) {
          // delete all keys that have the same root.
          this.delete(cacheKey, true);
          // set the new one.
          this._cache.set(cacheKey, newValue);
        }
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
      this._logger.info(`The cache: ${cacheKey} found.`);
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
