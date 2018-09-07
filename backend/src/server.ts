import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "./inversify.types";
import {
  IConfiguration,
  IRippleService,
  Lib,
  IGoogleService,
  GitHub
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
    @inject(TYPES.GitHubService) protected _githubService: GitHub.IGitHubService
  ) {
    this._setRoutes();
    this._app.use(this._router.routes());
  }

  private _setRoutes() {
    this._router.get("/api/validators", async ctx => {
      const date = ctx.query.d;
      const lastNHours = ctx.query.h || 6;
      const result = await this._rippleService.getValidatorInfo(
        lastNHours,
        date
      );
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

    this._router.get("/api/summary/:lastNHours", async ctx => {
      const lastNHours = ctx.params.lastNHours || 6;
      const result = await this._rippleService.getValidatorSummary(lastNHours);
      ctx.body = result;
    });

    this._router.get("/api/archives/:date", async ctx => {
      const date = ctx.params.date;
      const data = await this._githubService.getDefaultUnlByDate(date);
      ctx.body = data;
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
    @inject(TYPES.GitHubService) protected _githubService: GitHub.IGitHubService
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
