import { Container } from "inversify";
import {
  IRippleService,
  IConfiguration,
  IProcessEnv,
  ICrypto,
  IQuerier,
  IServer,
  Lib,
  IGoogleService,
  IThirdPartyLibFactory,
  GitHub
} from "./types";
import { TYPES } from "./inversify.types";
import { Server, DevServer } from "./server";
import RippleService from "./service.ripple/rippleService";
import GitHubService from "./service.github/githubService";
import GoogleService from "./service.ga/googleAnalyticsService";
import Configuration from "./configuration";
import Crypto from "./crypto";
import Querier from "./querier";
import ThirdPartyLibFactory from "./thirdPartyLibFactory";
import { Memoize } from "./cache/cache.types";
import Memoizer from "./cache/memoizer";

require("dotenv").config();

const myContainer = new Container();

myContainer.bind<IProcessEnv>(TYPES.ProcessEnv).toConstantValue(process.env);
myContainer
  .bind<ICrypto>(TYPES.Crypto)
  .to(Crypto)
  .inSingletonScope();
myContainer
  .bind<Memoize.IMemoizer>(TYPES.Memoizer)
  .to(Memoizer)
  .inSingletonScope();
myContainer
  .bind<IQuerier>(TYPES.Querier)
  .to(Querier)
  .inSingletonScope();
myContainer
  .bind<IRippleService>(TYPES.RippleService)
  .to(RippleService)
  .inSingletonScope();
myContainer
  .bind<IGoogleService>(TYPES.GoogleService)
  .to(GoogleService)
  .inSingletonScope();
myContainer
  .bind<GitHub.IGitHubService>(TYPES.GitHubService)
  .to(GitHubService)
  .inSingletonScope();
myContainer
  .bind<IConfiguration>(TYPES.Configuration)
  .to(Configuration)
  .inSingletonScope();
myContainer
  .bind<IServer>(TYPES.Server)
  .to(process.env["NODE_ENV"] === "production" ? Server : DevServer)
  .inSingletonScope();
myContainer
  .bind<IThirdPartyLibFactory>(TYPES.ThirdPartyLibFactory)
  .to(ThirdPartyLibFactory)
  .inSingletonScope();

// third party libraries
const thirdPartyLibFactory = myContainer.get<IThirdPartyLibFactory>(
  TYPES.ThirdPartyLibFactory
);

myContainer
  .bind<Lib.ILogger>(TYPES.Lib.Logger)
  .toConstantValue(thirdPartyLibFactory.createLogger());
myContainer
  .bind<Lib.Koa.IServer>(TYPES.Lib.Koa.App)
  .toConstantValue(thirdPartyLibFactory.createServer());
myContainer
  .bind<Lib.Koa.IRouter>(TYPES.Lib.Koa.Router)
  .toConstantValue(thirdPartyLibFactory.createRouter());
myContainer
  .bind<Promise<Lib.Google.IApi>>(TYPES.Lib.GoogleApi)
  .toConstantValue(thirdPartyLibFactory.createGAReportingApi());
myContainer
  .bind<GitHub.IApi>(TYPES.Lib.GitHubApi)
  .toConstantValue(thirdPartyLibFactory.createGitHubApi());

export { myContainer };
