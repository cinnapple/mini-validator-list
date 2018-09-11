import { Container } from "inversify";
import {
  ICrypto,
  IWebClient,
  IThirdPartyLibFactory,
  GitHubClient,
  IProcessEnv,
  IConfiguration,
  ICache,
  ILoggerFactory
} from "./types";

import TYPES from "./";

import Configuration from "./util/configuration";
import Crypto from "./crypto/crypto";
import WebClient from "./external/webClient";
import ThirdPartyLibFactory from "./external/thirdPartyLibFactory";
import Cache from "./cache/cache";
import LoggerFactory from "./logger/loggerFactory";

export default (container: Container) => {
  container
    .bind<IProcessEnv>(TYPES.Lib.ProcessEnv)
    .toConstantValue(<any>process.env);
  container
    .bind<ICache>(TYPES.Lib.Cache)
    .to(Cache)
    .inSingletonScope();
  container
    .bind<IConfiguration>(TYPES.Lib.Configuration)
    .to(Configuration)
    .inSingletonScope();
  container
    .bind<ICrypto>(TYPES.Lib.Crypto)
    .to(Crypto)
    .inSingletonScope();
  container
    .bind<IWebClient>(TYPES.Lib.WebClient)
    .to(WebClient)
    .inSingletonScope();
  container
    .bind<ILoggerFactory>(TYPES.Lib.LoggerFactory)
    .to(LoggerFactory)
    .inSingletonScope();
  container
    .bind<IThirdPartyLibFactory>(TYPES.Lib.ThirdPartyFactory)
    .to(ThirdPartyLibFactory)
    .inSingletonScope();

  // build third party libraries
  const thirdPartyLibFactory = container.get<IThirdPartyLibFactory>(
    TYPES.Lib.ThirdPartyFactory
  );
  container
    .bind<GitHubClient>(TYPES.Lib.GitHubClient)
    .toConstantValue(thirdPartyLibFactory.createGitHubApi());
  // container
  //   .bind<Promise<Lib.Google.IApi>>(TYPES.Lib.GoogleApi)
  //   .toConstantValue(thirdPartyLibFactory.createGAReportingApi());
};
