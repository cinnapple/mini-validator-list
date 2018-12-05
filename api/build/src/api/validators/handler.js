"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment = require("moment");
require("reflect-metadata");
const util_1 = require("../../domain/common/util");
const inversify_1 = require("../../inversify");
let ValidatorHandler = class ValidatorHandler {
    constructor(_defaultUnl, _geo, _stats, _validators) {
        this._defaultUnl = _defaultUnl;
        this._geo = _geo;
        this._stats = _stats;
        this._validators = _validators;
        this.getValidatorSummary = (args) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const date = args.query.d || "";
            const lastNHours = args.query.h || 6;
            const archives = yield this._defaultUnl.getDefaultUnlArchives();
            const defaultUnl = yield this._defaultUnl.getDefaultUnl(date, archives);
            const dailyReports = yield this._stats.getDailyReports();
            const validators = yield this._validators.getValidators();
            const domainGeoList = yield this._geo.getDomainGeoList(validators);
            let data = yield this._validators.getValidatorSummary(date, defaultUnl, dailyReports, validators, domainGeoList);
            if (lastNHours > 0) {
                const current = moment().add(-lastNHours, "h");
                data = data.filter(a => util_1._takeLastNHours(current, moment(a.last_datetime)));
            }
            return data;
        });
    }
};
ValidatorHandler = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Proxy.DefaultUnl)),
    tslib_1.__param(1, inversify_1.inject(inversify_1.TYPES.Proxy.Geo)),
    tslib_1.__param(2, inversify_1.inject(inversify_1.TYPES.Proxy.Stats)),
    tslib_1.__param(3, inversify_1.inject(inversify_1.TYPES.Proxy.Validators)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object])
], ValidatorHandler);
exports.default = ValidatorHandler;
//# sourceMappingURL=handler.js.map