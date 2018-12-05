"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("../../inversify");
let DefaultUnlRoutes = class DefaultUnlRoutes {
    constructor(_handler) {
        this._handler = _handler;
    }
    get() {
        return [
            {
                method: "GET",
                path: "/archives",
                handler: this._handler.getDefaultUnlArchives
            },
            {
                method: "GET",
                path: "/archives/:date",
                handler: this._handler.getDefaultUnl
            }
        ];
    }
};
DefaultUnlRoutes = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Api.DefaultUnlHandler)),
    tslib_1.__metadata("design:paramtypes", [Object])
], DefaultUnlRoutes);
exports.default = DefaultUnlRoutes;
//# sourceMappingURL=routes.js.map