"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("./inversify");
const bootstrap_1 = require("./inversify/bootstrap");
const routes_1 = require("./api/routes");
const server_1 = require("./lib/koa/server");
const config = bootstrap_1.container.get(inversify_1.TYPES.Lib.Configuration);
const logger = bootstrap_1.container
    .get(inversify_1.TYPES.Lib.LoggerFactory)
    .create("main");
process.on("uncaughtException", err => {
    logger.error(`Caught exception:  ${err}`);
});
server_1.default("/api", config, logger, routes_1.default(bootstrap_1.container));
logger.info(`app started listeninig on port ${config.port}...`);
//# sourceMappingURL=main.js.map