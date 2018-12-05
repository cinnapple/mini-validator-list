import "reflect-metadata";

const cachedMetadataKey = Symbol("cached");
const _intervalKeys = <any>{};

class CacheAdapter {
  private _cacheImpl: any;
  private _getter: <TItem>(_cacheImpl: any, key: string) => TItem;
  private _setter: <TItem>(_cacheImpl: any, key: string, item: TItem) => TItem;
  private _flush: <TItem>(_cacheImpl: any, key: string) => TItem;

  use = <TCache>(
    cacheImpl: TCache,
    getter: (_cacheImpl: TCache, key: string) => any,
    setter: (_cacheImpl: TCache, key: string, item: any) => any,
    flush: (_cacheImpl: TCache, key: string) => any
  ) => {
    this._cacheImpl = cacheImpl;
    this._getter = getter;
    this._setter = setter;
    this._flush = flush;
  };

  get = <TItem>(key: string) => {
    if (!this._getter) {
      throw new Error(`cacheAdapter.get is undefined.`);
    }
    return <TItem>this._getter(this._cacheImpl, key);
  };

  set = <TItem>(key: string, item: TItem) => {
    if (!this._setter) {
      throw new Error(`cacheAdapter.set is undefined.`);
    }
    return this._setter(this._cacheImpl, key, item);
  };

  flush = (key?: string) => {
    if (!this._flush) {
      throw new Error(`cacheAdapter.flush is undefined.`);
    }
    return this._flush(this._cacheImpl, key);
  };
}

const cacheAdapter = new CacheAdapter();

type CachedMetaParams = {
  key: string;
  index: number;
};

const _populateArgs = (parameters: CachedMetaParams[], args: IArguments) => {
  if (parameters && parameters.length > 0) {
    parameters.forEach(param => {
      const cacheKey = param.key;
      const cacheIndex = param.index;
      if (cacheAdapter.get(cacheKey) !== undefined) {
        args[cacheIndex] = cacheAdapter.get(cacheKey);
      }
    });
  }
  return args;
};

const _createCacheKey = (
  key: string,
  parameters: CachedMetaParams[],
  args: IArguments
) => {
  const params = [];

  for (let i = 0; i < args.length; i++) {
    if (!Array.isArray(parameters) || !parameters.find(p => p.index === i)) {
      if (args[i] !== undefined && args[i] !== null && args[i] !== "") {
        params.push(JSON.stringify(args[i]));
      }
    }
  }

  const cacheKey = `${key}${params.length > 0 ? `_${params.join("_")}` : ""}`;
  return cacheKey;
};

const cache = (options: { key: string; interval?: number }) => {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // keep the original method
    const method = descriptor.value;
    const parameters: CachedMetaParams[] = Reflect.getOwnMetadata(
      cachedMetadataKey,
      target,
      propertyKey
    );

    descriptor.value = async function() {
      // set interval
      if (options.interval > 0 && !_intervalKeys[options.key]) {
        let lastCallArgs: IArguments = arguments;

        console.log(
          `Registering a new interval for the cache:${options.key}...`
        );

        _intervalKeys[options.key] = setInterval(async () => {
          if (lastCallArgs) {
            const cacheKey = _createCacheKey(
              options.key,
              parameters,
              lastCallArgs
            );
            console.log(`Repopulating the cache: ${cacheKey}...`);
            const cachedArgs = _populateArgs(parameters, lastCallArgs);
            const result = await method.apply(this, cachedArgs);
            cacheAdapter.set(cacheKey, result);
          }
        }, options.interval);
      }

      const cacheKey = _createCacheKey(options.key, parameters, arguments);
      // if cache is found for the method call, return it.
      if (cacheAdapter.get(cacheKey) !== undefined) {
        return cacheAdapter.get(cacheKey);
      }
      const result = await method.apply(this, arguments);
      cacheAdapter.set(cacheKey, result);
      return result;
    };
  };
};

const cached = (key: string) => {
  return function(
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    // get existing required parameters that have been added
    let existingParameters: CachedMetaParams[] =
      Reflect.getOwnMetadata(cachedMetadataKey, target, propertyKey) || [];
    // push to the existing parameters.
    existingParameters.push({ key: key, index: parameterIndex });
    // define metadata.
    Reflect.defineMetadata(
      cachedMetadataKey,
      existingParameters,
      target,
      propertyKey
    );
  };
};

export { cache, cached, cacheAdapter };
