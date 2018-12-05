"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("../../inversify");
const util_1 = require("../../lib/util/util");
let StatsUtil = class StatsUtil {
    constructor() { }
    static getSummaryStats(validatorInfo) {
        const mainNetValidators = validatorInfo.filter(a => !a.is_alt_net);
        return Object.assign({}, this.allValidatorStats(mainNetValidators), this.defaultUnlStats(mainNetValidators), this.byCountryStats(mainNetValidators));
    }
};
StatsUtil.byCountryStats = (mainNetValidators) => {
    const verifiedValidators = mainNetValidators.filter(a => a.verified && a.country_name);
    let verifiedList = util_1._groupByWithCount(verifiedValidators, "country_name").map(a => {
        const found = verifiedValidators.find(b => a.country_name === b.country_name);
        return Object.assign({}, a, { country_code: found.country_code });
    });
    util_1._sort(verifiedList, "count", "dsc");
    verifiedList = util_1._addRate(verifiedList, "count");
    const defaultUnlValidators = mainNetValidators.filter(a => a.default && a.country_name);
    let defaultList = util_1._groupByWithCount(defaultUnlValidators, "country_name").map(a => {
        const found = defaultUnlValidators.find(b => a.country_name === b.country_name);
        return Object.assign({}, a, { country_code: found.country_code });
    });
    util_1._sort(defaultList, "count", "dsc");
    defaultList = util_1._addRate(defaultList, "count");
    return {
        summaryVerifiedGroupByCountryTotal: verifiedList.length,
        summaryVerifiedGroupByCountryData: verifiedList,
        summaryDefaultUnlGroupByCountryTotal: defaultList.length,
        summaryDefaultUnlGroupByCountryData: defaultList
    };
};
StatsUtil.defaultUnlStats = (mainNetValidators) => {
    const defaultValidators = mainNetValidators.filter(a => a.default);
    const total = defaultValidators.length;
    const ripple = defaultValidators.filter(a => a.is_ripple).length;
    const nonRipple = total - ripple;
    const list = util_1._groupByWithCount(defaultValidators, "domain");
    util_1._sort(list, "domain", "asc");
    return {
        defaultUnlTotal: total,
        defaultUnlDominance: ripple,
        defaultUnlTotalData: list,
        defaultUnlDominanceRippleTotal: ripple,
        defaultUnlDominanceNonRippleTotal: nonRipple
    };
};
StatsUtil.allValidatorStats = (mainNetValidators) => {
    const total = mainNetValidators.length;
    const verified = mainNetValidators.filter(a => a.verified).length;
    const unverified = mainNetValidators.filter(a => !a.verified).length;
    const ripple = mainNetValidators.filter(a => a.is_ripple).length;
    const nonRipple = mainNetValidators.filter(a => !a.is_ripple).length;
    return {
        allValidatorsTotal: total,
        allValidatorsVerified: verified,
        allValidatorsUnverified: unverified,
        allValidatorsRipple: ripple,
        allValidatorsNonRipple: nonRipple
    };
};
StatsUtil = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], StatsUtil);
exports.default = StatsUtil;
//# sourceMappingURL=calculate.js.map