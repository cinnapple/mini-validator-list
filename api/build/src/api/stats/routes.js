"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("../../inversify");
let StatsRoutes = class StatsRoutes {
    constructor(_handler) {
        this._handler = _handler;
    }
    get() {
        return [
            {
                method: "GET",
                path: "/summary/:lastNHours",
                handler: this._handler.getStats
            },
            {
                method: "GET",
                path: "/defaultUnlMovements",
                handler: this._handler.getDefaultUnlMovementStats
            }
        ];
    }
};
StatsRoutes = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Api.StatsHandler)),
    tslib_1.__metadata("design:paramtypes", [Object])
], StatsRoutes);
exports.default = StatsRoutes;
//# sourceMappingURL=routes.js.map