"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_types_1 = require("./inversify.types");
const service_1 = require("./github/service");
const service_2 = require("./rippleData/service");
const service_3 = require("./defaultUnl/service");
const service_4 = require("./geoService/service");
exports.default = (container) => {
    container
        .bind(inversify_types_1.default.Service.GitHubService)
        .to(service_1.default)
        .inSingletonScope();
    container
        .bind(inversify_types_1.default.Service.RippleDataService)
        .to(service_2.default)
        .inSingletonScope();
    container
        .bind(inversify_types_1.default.Service.GeoService)
        .to(service_4.default)
        .inSingletonScope();
    container
        .bind(inversify_types_1.default.Service.DefaultUnlService)
        .to(service_3.default)
        .inSingletonScope();
};
//# sourceMappingURL=inversify.bootstrap.js.map