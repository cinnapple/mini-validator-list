"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const cachedMetadataKey = Symbol("cached");
const _intervalKeys = {};
class CacheAdapter {
    constructor() {
        this.use = (cacheImpl, getter, setter, flush) => {
            this._cacheImpl = cacheImpl;
            this._getter = getter;
            this._setter = setter;
            this._flush = flush;
        };
        this.get = (key) => {
            if (!this._getter) {
                throw new Error(`cacheAdapter.get is undefined.`);
            }
            return this._getter(this._cacheImpl, key);
        };
        this.set = (key, item) => {
            if (!this._setter) {
                throw new Error(`cacheAdapter.set is undefined.`);
            }
            return this._setter(this._cacheImpl, key, item);
        };
        this.flush = (key) => {
            if (!this._flush) {
                throw new Error(`cacheAdapter.flush is undefined.`);
            }
            return this._flush(this._cacheImpl, key);
        };
    }
}
const cacheAdapter = new CacheAdapter();
exports.cacheAdapter = cacheAdapter;
const _populateArgs = (parameters, args) => {
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
const _createCacheKey = (key, parameters, args) => {
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
const cache = (options) => {
    return function (target, propertyKey, descriptor) {
        const method = descriptor.value;
        const parameters = Reflect.getOwnMetadata(cachedMetadataKey, target, propertyKey);
        descriptor.value = function () {
            return tslib_1.__awaiter(this, arguments, void 0, function* () {
                if (options.interval > 0 && !_intervalKeys[options.key]) {
                    let lastCallArgs = arguments;
                    console.log(`Registering a new interval for the cache:${options.key}...`);
                    _intervalKeys[options.key] = setInterval(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        if (lastCallArgs) {
                            const cacheKey = _createCacheKey(options.key, parameters, lastCallArgs);
                            console.log(`Repopulating the cache: ${cacheKey}...`);
                            const cachedArgs = _populateArgs(parameters, lastCallArgs);
                            const result = yield method.apply(this, cachedArgs);
                            cacheAdapter.set(cacheKey, result);
                        }
                    }), options.interval);
                }
                const cacheKey = _createCacheKey(options.key, parameters, arguments);
                if (cacheAdapter.get(cacheKey) !== undefined) {
                    return cacheAdapter.get(cacheKey);
                }
                const result = yield method.apply(this, arguments);
                cacheAdapter.set(cacheKey, result);
                return result;
            });
        };
    };
};
exports.cache = cache;
const cached = (key) => {
    return function (target, propertyKey, parameterIndex) {
        let existingParameters = Reflect.getOwnMetadata(cachedMetadataKey, target, propertyKey) || [];
        existingParameters.push({ key: key, index: parameterIndex });
        Reflect.defineMetadata(cachedMetadataKey, existingParameters, target, propertyKey);
    };
};
exports.cached = cached;
//# sourceMappingURL=smartCache.js.map