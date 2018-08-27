import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../inversify.types";

import { HashMap, Lib } from "../types";
import { Memoize } from "./cache.types";

@injectable()
export default class Memoizer implements Memoize.IMemoizer {
  private _cache: HashMap<Memoize.MemoizedItem>;

  constructor(@inject(TYPES.Lib.Logger) private _logger: Lib.ILogger) {
    this._cache = {};
  }

  private _toParamsKey = (params?: Memoize.MemoizedFuncParams) =>
    JSON.stringify(params || {});

  private _getCacheForParams = (
    name: string,
    params?: Memoize.MemoizedFuncParams
  ) => {
    if (!this._cache[name]) {
      throw new Error(
        `Could not find the cache entry for '${name}'. Did you forget to call register?`
      );
    }
    params = params || {};
    const item = this._cache[name];
    const paramItemKey = this._toParamsKey(params);
    let paramItem;
    // try to find from masterCache.
    if (item.masterCache[paramItemKey]) {
      paramItem = item.masterCache[paramItemKey];
    }
    // try to find from subordinateCache.
    if (item.subordinateCache && item.subordinateCache[paramItemKey]) {
      paramItem = item.subordinateCache[paramItemKey];
    }
    // if not found, craete a subordinate cache.
    if (!paramItem) {
      item.subordinateCache = {
        [paramItemKey]: {
          lastUpdated: undefined,
          status: "",
          item: undefined,
          params: params
        }
      };
      paramItem = item.subordinateCache[paramItemKey];
    }
    return paramItem;
  };

  private _update = async (
    name: string,
    params?: Memoize.MemoizedFuncParams
  ) => {
    const item = this._cache[name];
    const paramItem = this._getCacheForParams(name, params);
    paramItem.status = "pending";
    const paramArray = Object.keys(paramItem.params).map(
      key => paramItem.params[key]
    );
    this._logger.info(`UPDATE ${name}:${JSON.stringify(params)}...`);
    const value = await item.func.apply(null, paramArray);
    paramItem.item = value;
    paramItem.status = "populated";
    paramItem.lastUpdated = new Date();
    this._logger.info(`UPDATE ${name}:${JSON.stringify(params)} completed.`);
    return paramItem;
  };

  private startUpdate = async (
    name: string,
    params?: Memoize.MemoizedFuncParams
  ) => {
    const paramItem = this._getCacheForParams(name, params);
    if (paramItem.interval && !paramItem.intervalKey) {
      paramItem.intervalKey = setInterval(async () => {
        // delete all variants
        delete this._cache[name].subordinateCache;
        // update the base cache
        await this._update(name, params);
      }, paramItem.interval);
      this._logger.info(
        `START UPDATE ${name}:${JSON.stringify(params)} at ${
          paramItem.interval
        }`
      );
    }
  };

  register = async <TItem>(
    name: string,
    func: (params: HashMap<any>) => Promise<TItem>,
    options?: Memoize.MemoizeOption
  ) => {
    options = {
      interval: undefined,
      params: {},
      immediate: false,
      ...options
    };

    // delete existing cache entry
    if (this._cache[name]) {
      delete this._cache[name].masterCache;
      delete this._cache[name].subordinateCache;
    }

    // create a cache entry
    const paramStr = this._toParamsKey(options.params);
    this._cache[name] = {
      func: func,
      masterCache: {
        [paramStr]: {
          lastUpdated: undefined,
          status: "",
          params: options.params,
          item: undefined,
          interval: options.interval,
          intervalKey: undefined
        }
      }
    };

    this._logger.info(`REGISTER ${name}`);
    // start interval if specified
    if (options.interval) {
      this.startUpdate(name, options.params);
    }
    // update immediately if specified
    if (options.immediate) {
      await this._update(name, options.params);
    }
  };

  get = async (name: string, params?: Memoize.MemoizedFuncParams) => {
    const paramItem = this._getCacheForParams(name, params);
    if (!paramItem.item) {
      this._logger.info(
        `GET ${name}:${JSON.stringify(
          paramItem.params
        )} not found in the cache. Updating...`
      );
      await this._update(name, params);
    } else {
      this._logger.info(`GET ${name}:${JSON.stringify(paramItem.params)}`);
    }
    return {
      lastUpdated: paramItem.lastUpdated,
      data: paramItem.item
    };
  };
}
