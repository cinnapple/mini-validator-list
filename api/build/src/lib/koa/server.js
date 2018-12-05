"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Koa = require("koa");
const Router = require("koa-router");
const cors = require("@koa/cors");
const handleRequest = (ctx, route) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    ctx.body = {
        data: yield route.handler({
            params: ctx.params,
            query: ctx.query
        }),
        lastUpdated: new Date()
    };
});
const handlerError = (err, logger, route) => {
    logger.error(`An error has occurred while handling the request for ${route.method}: ${route.path}. ${err}`);
};
exports.default = (prefix, config, logger, routes) => {
    const koa = new Koa();
    const router = new Router({
        prefix
    });
    const middlewares = [];
    middlewares.push(router.routes());
    if (!config.isProduction) {
        middlewares.push(cors());
        logger.info(`CORS enabled...`);
    }
    middlewares.forEach(middleware => koa.use(middleware));
    routes.forEach(route => {
        switch (route.method) {
            case "GET": {
                router.get(route.path, (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return yield handleRequest(ctx, route).catch(err => handlerError(err, logger, route));
                }));
                break;
            }
            default: {
                throw Error(`Method ${route.method} not supported`);
            }
        }
        logger.info(`registered the route ${route.method}:${route.path}`);
    });
    koa.listen(config.port);
};
//# sourceMappingURL=server.js.map