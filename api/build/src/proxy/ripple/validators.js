"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("../../inversify");
const smartCache_1 = require("../../lib/cache/smartCache");
const cacheKeys_1 = require("../../proxy/cacheKeys");
let ValidatorsProxy = class ValidatorsProxy {
    constructor(_actual) {
        this._actual = _actual;
    }
    getValidators() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._actual.getValidators();
        });
    }
    getValidatorSummary(_date, defaultUnl, dailyReports, allValidators, domainGeoList) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._actual.getValidatorSummary(_date, defaultUnl, dailyReports, allValidators, domainGeoList);
        });
    }
};
tslib_1.__decorate([
    smartCache_1.cache({
        key: cacheKeys_1.default.Validators.key,
        interval: cacheKeys_1.default.Validators.interval
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ValidatorsProxy.prototype, "getValidators", null);
tslib_1.__decorate([
    smartCache_1.cache({
        key: cacheKeys_1.default.ValidatorsSummary.key,
        interval: cacheKeys_1.default.ValidatorsSummary.interval
    }),
    tslib_1.__param(1, smartCache_1.cached(cacheKeys_1.default.DefaultUnl.key)),
    tslib_1.__param(2, smartCache_1.cached(cacheKeys_1.default.DailyReports.key)),
    tslib_1.__param(3, smartCache_1.cached(cacheKeys_1.default.Validators.key)),
    tslib_1.__param(4, smartCache_1.cached(cacheKeys_1.default.Geo.key)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Array, Array, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], ValidatorsProxy.prototype, "getValidatorSummary", null);
ValidatorsProxy = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Domain.Validators)),
    tslib_1.__metadata("design:paramtypes", [Object])
], ValidatorsProxy);
exports.default = ValidatorsProxy;
//# sourceMappingURL=validators.js.map