import { TYPES } from "./inversify";
import { container } from "./inversify/bootstrap";
import { ILogger, IConfiguration } from "./lib/types";
import Routes from "./api/routes";
import Server from "./lib/koa/server";

process.on("uncaughtException", err => {
  logger.error("Caught exception: " + err);
});

const config = container.get<IConfiguration>(TYPES.Lib.Configuration);
const logger = container.get<ILogger>(TYPES.Lib.Logger);

Server("/api", config, logger, Routes(container));

logger.info(`app started listeninig on port ${config.getPort()}...`);
