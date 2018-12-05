import { TYPES } from "./inversify";
import { container } from "./inversify/bootstrap";
import Routes from "./api/routes";
import Server from "./lib/koa/server";

const config = container.get<lib.IConfiguration>(TYPES.Lib.Configuration);
const logger = container
  .get<lib.ILoggerFactory>(TYPES.Lib.LoggerFactory)
  .create("main");

process.on("uncaughtException", err => {
  logger.error(`Caught exception:  ${err}`);
});

Server("/api", config, logger, Routes(container));

logger.info(`app started listeninig on port ${config.port}...`);
