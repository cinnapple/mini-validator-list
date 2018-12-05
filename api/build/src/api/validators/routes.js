"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("../../inversify");
let ValidatorRoutes = class ValidatorRoutes {
    constructor(_handler) {
        this._handler = _handler;
    }
    get() {
        return [
            {
                method: "GET",
                path: "/validators",
                handler: this._handler.getValidatorSummary
            }
        ];
    }
};
ValidatorRoutes = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Api.ValidatorHandler)),
    tslib_1.__metadata("design:paramtypes", [Object])
], ValidatorRoutes);
exports.default = ValidatorRoutes;
//# sourceMappingURL=routes.js.map