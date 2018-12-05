"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("../../inversify");
let DefaultUnlHandler = class DefaultUnlHandler {
    constructor(_defaultUnl) {
        this._defaultUnl = _defaultUnl;
        this.getDefaultUnlArchives = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._defaultUnl.getDefaultUnlArchives();
        });
        this.getDefaultUnl = (args) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const date = args.params.date;
            const archives = yield this._defaultUnl.getDefaultUnlArchives();
            const data = yield this._defaultUnl.getDefaultUnl(date, archives);
            return data;
        });
    }
};
DefaultUnlHandler = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Proxy.DefaultUnl)),
    tslib_1.__metadata("design:paramtypes", [Object])
], DefaultUnlHandler);
exports.default = DefaultUnlHandler;
//# sourceMappingURL=handler.js.map