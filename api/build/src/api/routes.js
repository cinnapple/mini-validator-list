"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("../inversify");
const routeTypes = [
    inversify_1.TYPES.Api.DefaultUnlRoutes,
    inversify_1.TYPES.Api.StatsRoutes,
    inversify_1.TYPES.Api.ValidatorRoutes
];
exports.default = (container) => {
    return routeTypes.reduce((prev, type) => {
        return prev.concat(container.get(type).get());
    }, []);
};
//# sourceMappingURL=routes.js.map