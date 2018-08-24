import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "./inversify.types";
import {
  IConfiguration,
  IRippleService,
  Lib,
  IGoogleService,
  IGitHubService
} from "./types";

import * as cors from "@koa/cors";

@injectable()
class Server {
  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: Lib.ILogger,
    @inject(TYPES.Lib.Koa.App) protected _app: Lib.Koa.IServer,
    @inject(TYPES.Lib.Koa.Router) protected _router: Lib.Koa.IRouter,
    @inject(TYPES.Configuration) protected _configuration: IConfiguration,
    @inject(TYPES.RippleService) protected _rippleService: IRippleService,
    @inject(TYPES.GoogleService) protected _googleService: IGoogleService,
    @inject(TYPES.GitHubService) protected _githubService: IGitHubService
  ) {
    this._setRoutes();
    this._app.use(this._router.routes());
  }

  private _setRoutes() {
    this._router.get("/api/validators", async ctx => {
      const result = await this._rippleService.getValidatorInfo();
      ctx.body = result;
    });
    this._router.get("/api/validators/:date", async ctx => {
      const date = ctx.params.date;
      const defaultUnl = await this._githubService.getDefaultUnl(date);
      const result = await this._rippleService.getValidatorInfo({
        date: date,
        defaultUnl: defaultUnl.list[0]
      });
      ctx.body = result;
    });

    this._router.get("/api/referrals", async ctx => {
      const result = await this._googleService.getReferrals();
      ctx.body = result;
    });

    this._router.get("/api/archives", async ctx => {
      const result = await this._githubService.getDefaultUnlArchives();
      ctx.body = result;
    });

    this._router.get("/api/summary", async ctx => {
      const result = await this._rippleService.getValidatorSummary();
      ctx.body = result;
    });

    this._router.post("/api/archives/:date", async ctx => {
      const date = ctx.params.date;
      this._githubService.startFetchDefaultUnl(date);
      ctx.body = { success: true };
    });
  }

  listen() {
    this._app.listen(this._configuration.getPort());
  }
}

@injectable()
class DevServer extends Server {
  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: Lib.ILogger,
    @inject(TYPES.Lib.Koa.App) protected _app: Lib.Koa.IServer,
    @inject(TYPES.Lib.Koa.Router) protected _router: Lib.Koa.IRouter,
    @inject(TYPES.Configuration) protected _configuration: IConfiguration,
    @inject(TYPES.RippleService) protected _rippleService: IRippleService,
    @inject(TYPES.GoogleService) protected _googleService: IGoogleService,
    @inject(TYPES.GitHubService) protected _githubService: IGitHubService
  ) {
    super(
      _logger,
      _app,
      _router,
      _configuration,
      _rippleService,
      _googleService,
      _githubService
    );
    this._app.use(cors());
    _logger.info("using DevServer. Enabled Cors.");
  }
}

export { Server, DevServer };
