"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("../../inversify");
let StatsHandler = class StatsHandler {
    constructor(_defaultUnl, _validators, _geo, _stats) {
        this._defaultUnl = _defaultUnl;
        this._validators = _validators;
        this._geo = _geo;
        this._stats = _stats;
        this.getStats = (args) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            args.params.lastNHours || 6;
            const defaultUnl = yield this._defaultUnl.getDefaultUnl();
            const dailyReports = yield this._stats.getDailyReports();
            const validators = yield this._validators.getValidators();
            const domainGeoList = yield this._geo.getDomainGeoList(validators);
            const validatorSummary = yield this._validators.getValidatorSummary(undefined, defaultUnl, dailyReports, validators, domainGeoList);
            return this._stats.getSummary(validatorSummary);
        });
        this.getDefaultUnlMovementStats = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const archives = yield this._defaultUnl.getDefaultUnlArchives();
            const defaultUnl = yield this._defaultUnl.getDefaultUnl();
            const dailyReports = yield this._stats.getDailyReports();
            const validators = yield this._validators.getValidators();
            const domainGeoList = yield this._geo.getDomainGeoList(validators);
            const validatorSummary = yield this._validators.getValidatorSummary(undefined, defaultUnl, dailyReports, validators, domainGeoList);
            return this._defaultUnl.getDefaultUnlStats(archives, validatorSummary);
        });
    }
};
StatsHandler = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Proxy.DefaultUnl)),
    tslib_1.__param(1, inversify_1.inject(inversify_1.TYPES.Proxy.Validators)),
    tslib_1.__param(2, inversify_1.inject(inversify_1.TYPES.Proxy.Geo)),
    tslib_1.__param(3, inversify_1.inject(inversify_1.TYPES.Proxy.Stats)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object])
], StatsHandler);
exports.default = StatsHandler;
//# sourceMappingURL=handler.js.map