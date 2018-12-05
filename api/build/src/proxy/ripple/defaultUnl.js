"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("../../inversify");
const smartCache_1 = require("../../lib/cache/smartCache");
const cacheKeys_1 = require("../../proxy/cacheKeys");
let DefaultUnlProxy = class DefaultUnlProxy {
    constructor(_actual) {
        this._actual = _actual;
    }
    getDefaultUnl(date, archives) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._actual.getDefaultUnl(date, archives);
        });
    }
    getDefaultUnlArchives() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._actual.getDefaultUnlArchives();
        });
    }
    getDefaultUnlStats(archives, validatorList) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._actual.getDefaultUnlStats(archives, validatorList);
        });
    }
};
tslib_1.__decorate([
    smartCache_1.cache({
        key: cacheKeys_1.default.DefaultUnl.key,
        interval: cacheKeys_1.default.DefaultUnl.interval
    }),
    tslib_1.__param(1, smartCache_1.cached(cacheKeys_1.default.UnlArchives.key)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], DefaultUnlProxy.prototype, "getDefaultUnl", null);
tslib_1.__decorate([
    smartCache_1.cache({
        key: cacheKeys_1.default.UnlArchives.key,
        interval: cacheKeys_1.default.UnlArchives.interval
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DefaultUnlProxy.prototype, "getDefaultUnlArchives", null);
tslib_1.__decorate([
    smartCache_1.cache({
        key: cacheKeys_1.default.UnlMovementStats.key,
        interval: cacheKeys_1.default.UnlMovementStats.interval
    }),
    tslib_1.__param(0, smartCache_1.cached(cacheKeys_1.default.UnlArchives.key)),
    tslib_1.__param(1, smartCache_1.cached(cacheKeys_1.default.ValidatorsSummary.key)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], DefaultUnlProxy.prototype, "getDefaultUnlStats", null);
DefaultUnlProxy = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Domain.DefaultUnl)),
    tslib_1.__metadata("design:paramtypes", [Object])
], DefaultUnlProxy);
exports.default = DefaultUnlProxy;
//# sourceMappingURL=defaultUnl.js.map