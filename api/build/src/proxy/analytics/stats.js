"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("../../inversify");
const smartCache_1 = require("../../lib/cache/smartCache");
const cacheKeys_1 = require("../../proxy/cacheKeys");
let StatsProxy = class StatsProxy {
    constructor(_actual) {
        this._actual = _actual;
    }
    getSummary(validatorList) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._actual.getSummary(validatorList);
        });
    }
    getDailyReports() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._actual.getDailyReports();
        });
    }
};
tslib_1.__decorate([
    smartCache_1.cache({ key: cacheKeys_1.default.Stats.key, interval: cacheKeys_1.default.Stats.interval }),
    tslib_1.__param(0, smartCache_1.cached(cacheKeys_1.default.ValidatorsSummary.key)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], StatsProxy.prototype, "getSummary", null);
tslib_1.__decorate([
    smartCache_1.cache({
        key: cacheKeys_1.default.DailyReports.key,
        interval: cacheKeys_1.default.DailyReports.interval
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatsProxy.prototype, "getDailyReports", null);
StatsProxy = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Domain.Stats)),
    tslib_1.__metadata("design:paramtypes", [Object])
], StatsProxy);
exports.default = StatsProxy;
//# sourceMappingURL=stats.js.map