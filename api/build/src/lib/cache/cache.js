"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("../../inversify");
const enum_1 = require("../enum");
class InMemoryCache {
    constructor() {
        this.get = (name) => {
            return this._obj[name];
        };
        this.set = (name, value) => {
            if (this.get(name)) {
                this.del(name);
            }
            this._obj[name] = value;
        };
        this.del = (name) => {
            delete this._obj[name];
        };
        this.keys = () => {
            return Object.keys(this._obj);
        };
        this._obj = {};
    }
}
let Cache = class Cache {
    constructor(_loggerFactory) {
        this._createCacheKey = (key, variant) => {
            if (!key) {
                throw new Error(`Cache key cannot be empty`);
            }
            variant = variant || "";
            return key + "_" + variant;
        };
        this._startInterval = (key, setter, interval) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this._intervalKeys[key]) {
                this._logger.info(`Registering a new interval for the cache: ${key}...`);
                const cacheKey = this._createCacheKey(key, "");
                this._intervalKeys[key] = setInterval(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    this._logger.info(`Re-populating the cache: ${key}...`);
                    const newValue = yield setter().catch(err => {
                        this._logger.error(`Failed to set ${cacheKey}: ${err}`);
                        return undefined;
                    });
                    if (newValue) {
                        this.delete(cacheKey, true);
                        this._cache.set(cacheKey, newValue);
                    }
                }), interval);
            }
        });
        this.get = (key, variant, setter, interval) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const cacheKey = this._createCacheKey(key, variant);
            const value = this._cache.get(cacheKey);
            if (value) {
                this._logger.info(`The cache: ${cacheKey} found.`);
                return yield value;
            }
            this._logger.info(`The cache: ${cacheKey} does not exit. Setting...`);
            const newValue = yield setter();
            this._cache.set(cacheKey, newValue);
            if (interval !== enum_1.Frequency.Never) {
                this._startInterval(key, setter, interval);
            }
            return newValue;
        });
        this.delete = (key, startsWith = false) => {
            if (startsWith) {
                this._cache.keys().forEach(k => {
                    if (k.startsWith(key)) {
                        this._cache.del(k);
                    }
                });
            }
            else {
                this._cache.del(key);
            }
        };
        this._logger = _loggerFactory.create("Lib.Cache");
        this._cache = new InMemoryCache();
        this._intervalKeys = {};
    }
};
Cache = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Lib.LoggerFactory)),
    tslib_1.__metadata("design:paramtypes", [Object])
], Cache);
exports.default = Cache;
//# sourceMappingURL=cache.js.map