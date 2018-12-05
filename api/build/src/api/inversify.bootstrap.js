"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_types_1 = require("./inversify.types");
const handler_1 = require("./defaultUnl/handler");
const handler_2 = require("./stats/handler");
const handler_3 = require("./validators/handler");
const routes_1 = require("./defaultUnl/routes");
const routes_2 = require("./stats/routes");
const routes_3 = require("./validators/routes");
exports.default = (container) => {
    container
        .bind(inversify_types_1.default.Api.DefaultUnlHandler)
        .to(handler_1.default)
        .inSingletonScope();
    container
        .bind(inversify_types_1.default.Api.StatsHandler)
        .to(handler_2.default)
        .inSingletonScope();
    container
        .bind(inversify_types_1.default.Api.ValidatorHandler)
        .to(handler_3.default)
        .inSingletonScope();
    container
        .bind(inversify_types_1.default.Api.DefaultUnlRoutes)
        .to(routes_1.default)
        .inSingletonScope();
    container
        .bind(inversify_types_1.default.Api.StatsRoutes)
        .to(routes_2.default)
        .inSingletonScope();
    container
        .bind(inversify_types_1.default.Api.ValidatorRoutes)
        .to(routes_3.default)
        .inSingletonScope();
};
//# sourceMappingURL=inversify.bootstrap.js.map