import { Container } from "inversify";

import TYPES from "./inversify.types";

import Configuration from "../config";
import Crypto from "./crypto/crypto";
import WebClient from "./external/webClient";
import Cache from "./cache/cache";
import LoggerFactory from "./logger/loggerFactory";
import { cacheAdapter } from "./cache/smartCache";
import InMemoryCache from "./cache/memoryCache";

export default (container: Container) => {
  container
    .bind<lib.IProcessEnv>(TYPES.Lib.ProcessEnv)
    .toConstantValue(<any>process.env);
  container
    .bind<lib.ICache>(TYPES.Lib.Cache)
    .to(Cache)
    .inSingletonScope();
  container
    .bind<lib.IConfiguration>(TYPES.Lib.Configuration)
    .toConstantValue(Configuration);
  container
    .bind<lib.ICrypto>(TYPES.Lib.Crypto)
    .to(Crypto)
    .inSingletonScope();
  container
    .bind<lib.IWebClient>(TYPES.Lib.WebClient)
    .to(WebClient)
    .inSingletonScope();
  container
    .bind<lib.ILoggerFactory>(TYPES.Lib.LoggerFactory)
    .to(LoggerFactory)
    .inSingletonScope();

  const inMemoryCache = new InMemoryCache();

  cacheAdapter.use(
    inMemoryCache,
    (c, key) => c.get(key),
    (c, key, item) => c.set(key, item),
    (c, key) => c.del(key)
  );
};
