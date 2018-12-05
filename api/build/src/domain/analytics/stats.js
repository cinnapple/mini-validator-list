"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("../../inversify");
const moment = require("moment");
const calculate_1 = require("./calculate");
const util_1 = require("../common/util");
let Stats = class Stats {
    constructor(_loggerFactory, _rippleDataService) {
        this._loggerFactory = _loggerFactory;
        this._rippleDataService = _rippleDataService;
        this.getSummary = (validatorList) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const threshould = moment().add(-6, "h");
                const mainNetValidators = validatorList.filter(a => a.default ||
                    (util_1._takeLastNHours(threshould, moment(a.last_datetime)) &&
                        util_1._takeMainNetOnly(a)));
                const summary = calculate_1.default.getSummaryStats(mainNetValidators);
                return summary;
            }
            catch (err) {
                this._logger.error(err);
                throw err;
            }
        });
        this.getDailyReports = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return this._rippleDataService.getValidatorDailyReports();
            }
            catch (err) {
                this._logger.error(err);
                throw err;
            }
        });
        this._logger = _loggerFactory.create("Domain.Stats");
    }
};
Stats = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Lib.LoggerFactory)),
    tslib_1.__param(1, inversify_1.inject(inversify_1.TYPES.Service.RippleDataService)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], Stats);
exports.default = Stats;
//# sourceMappingURL=stats.js.map