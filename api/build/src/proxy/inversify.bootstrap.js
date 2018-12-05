"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_types_1 = require("./inversify.types");
const validators_1 = require("./ripple/validators");
const defaultUnl_1 = require("./ripple/defaultUnl");
const geo_1 = require("./location/geo");
const stats_1 = require("./analytics/stats");
exports.default = (container) => {
    container
        .bind(inversify_types_1.default.Proxy.Validators)
        .to(validators_1.default)
        .inSingletonScope();
    container
        .bind(inversify_types_1.default.Proxy.DefaultUnl)
        .to(defaultUnl_1.default)
        .inSingletonScope();
    container
        .bind(inversify_types_1.default.Proxy.Geo)
        .to(geo_1.default)
        .inSingletonScope();
    container
        .bind(inversify_types_1.default.Proxy.Stats)
        .to(stats_1.default)
        .inSingletonScope();
};
//# sourceMappingURL=inversify.bootstrap.js.map