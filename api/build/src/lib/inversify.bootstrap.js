"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_types_1 = require("./inversify.types");
const config_1 = require("../config");
const crypto_1 = require("./crypto/crypto");
const webClient_1 = require("./external/webClient");
const cache_1 = require("./cache/cache");
const loggerFactory_1 = require("./logger/loggerFactory");
const smartCache_1 = require("./cache/smartCache");
const memoryCache_1 = require("./cache/memoryCache");
exports.default = (container) => {
    container
        .bind(inversify_types_1.default.Lib.ProcessEnv)
        .toConstantValue(process.env);
    container
        .bind(inversify_types_1.default.Lib.Cache)
        .to(cache_1.default)
        .inSingletonScope();
    container
        .bind(inversify_types_1.default.Lib.Configuration)
        .toConstantValue(config_1.default);
    container
        .bind(inversify_types_1.default.Lib.Crypto)
        .to(crypto_1.default)
        .inSingletonScope();
    container
        .bind(inversify_types_1.default.Lib.WebClient)
        .to(webClient_1.default)
        .inSingletonScope();
    container
        .bind(inversify_types_1.default.Lib.LoggerFactory)
        .to(loggerFactory_1.default)
        .inSingletonScope();
    const inMemoryCache = new memoryCache_1.default();
    smartCache_1.cacheAdapter.use(inMemoryCache, (c, key) => c.get(key), (c, key, item) => c.set(key, item), (c, key) => c.del(key));
};
//# sourceMappingURL=inversify.bootstrap.js.map