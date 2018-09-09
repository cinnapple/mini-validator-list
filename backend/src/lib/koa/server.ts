import * as Koa from "koa";
import * as Router from "koa-router";
import * as cors from "@koa/cors";

import { IConfiguration, ILogger, Route } from "../types";

const handleRequest = async (ctx, route) => {
  ctx.body = {
    data: await route.handler({
      params: ctx.params,
      query: ctx.query
    }),
    lastUpdated: new Date()
  };
};

const handlerError = (err, logger: ILogger, route: Route) => {
  logger.error(
    `An error has occurred while handling the request for ${route.method}: ${
      route.path
    }. ${err}`
  );
};

export default (
  prefix: string,
  config: IConfiguration,
  logger: ILogger,
  routes: Route[]
) => {
  const koa = new Koa();
  const router = new Router({
    prefix: prefix
  });

  // setup middlewares
  const middlewares = [];
  middlewares.push(router.routes());
  if (!config.isProduction()) {
    middlewares.push(cors());
    logger.info(`CORS enabled...`);
  }
  middlewares.forEach(middleware => koa.use(middleware));

  // register the routes
  routes.forEach(route => {
    switch (route.method) {
      case "GET": {
        router.get(
          route.path,
          async ctx =>
            await handleRequest(ctx, route).catch(err =>
              handlerError(err, logger, route)
            )
        );
        break;
      }
      default: {
        throw Error(`Method ${route.method} not supported`);
      }
    }
    logger.info(`registered the route ${route.method}:${route.path}`);
  });

  // start the app
  koa.listen(config.getPort());
};
