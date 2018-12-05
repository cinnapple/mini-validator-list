"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("../../inversify");
const util_1 = require("../../lib/util/util");
const util_2 = require("../common/util");
let Validators = class Validators {
    constructor(_loggerFactory, _configuration, _crypto, _rippleDataService) {
        this._loggerFactory = _loggerFactory;
        this._configuration = _configuration;
        this._crypto = _crypto;
        this._rippleDataService = _rippleDataService;
        this.getValidators = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return this._rippleDataService.getValidators();
            }
            catch (err) {
                this._logger.error(err);
                throw err;
            }
        });
        this.getValidatorSummary = (_date, defaultUnl, dailyReports, allValidators, domainGeoList) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const validators = allValidators;
                const defaultUnlValidators = this._crypto.parseDefaultUNLBlob(defaultUnl.blob);
                const altnetRegex = this._configuration.ripple.altNetDomainsPattern;
                const allValidationPublicKeys = util_1._union(defaultUnlValidators, validators.map(a => a.validation_public_key));
                const mergedList = allValidationPublicKeys.reduce((prev, pubkey) => {
                    if (!pubkey || pubkey === "undefined") {
                        return prev;
                    }
                    let v = util_1._first(validators, v => v.validation_public_key === pubkey);
                    if (!v) {
                        v = {
                            chain: "alt",
                            current_index: -1,
                            agreement_1h: {},
                            agreement_24h: {},
                            partial: undefined,
                            unl: false,
                            validation_public_key: pubkey,
                            domain: undefined
                        };
                    }
                    const isRipple = v && util_2._isRippleValidator(v);
                    v.domain = isRipple ? util_2._rippleDomain : v.domain;
                    const data = {
                        pubkey: v.validation_public_key,
                        domain: v.domain,
                        is_ripple: isRipple,
                        verified: !!v.domain,
                        default: undefined,
                        is_report_available: false,
                        is_alt_net: false,
                        agreement: 0,
                        disagreement: 0,
                        total_ledgers: 0,
                        city: undefined,
                        country_name: undefined,
                        country_code: undefined,
                        region_name: undefined,
                        latitude: 0,
                        longitude: 0,
                        last_datetime: new Date().toString()
                    };
                    const defaultUnlItem = util_1._first(defaultUnlValidators, pubkey => pubkey === v.validation_public_key);
                    if (defaultUnlItem) {
                        data.default = !!defaultUnlItem;
                    }
                    data.is_alt_net = v.domain && !!altnetRegex.exec(data.domain);
                    const reportItem = util_1._first(dailyReports, report => report.validation_public_key === v.validation_public_key);
                    if (reportItem) {
                        data.is_report_available = true;
                        if (!data.is_alt_net) {
                            data.is_alt_net = reportItem.chain !== "main";
                        }
                    }
                    const geoItem = util_1._first(domainGeoList, geo => geo.domain === v.domain, {
                        city: undefined,
                        country_name: undefined,
                        country_code: undefined,
                        region_name: undefined,
                        latitude: undefined,
                        longitude: undefined
                    });
                    if (geoItem) {
                        data.city = geoItem.city;
                        data.country_name = geoItem.country_name;
                        data.country_code = geoItem.country_code;
                        data.region_name = geoItem.region_name;
                        data.latitude = geoItem.latitude;
                        data.longitude = geoItem.longitude;
                    }
                    prev.push(data);
                    return prev;
                }, []);
                return mergedList;
            }
            catch (err) {
                this._logger.error(err);
                throw err;
            }
        });
        this._logger = _loggerFactory.create("Domain.Validators");
    }
};
Validators = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Lib.LoggerFactory)),
    tslib_1.__param(1, inversify_1.inject(inversify_1.TYPES.Lib.Configuration)),
    tslib_1.__param(2, inversify_1.inject(inversify_1.TYPES.Lib.Crypto)),
    tslib_1.__param(3, inversify_1.inject(inversify_1.TYPES.Service.RippleDataService)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object])
], Validators);
exports.default = Validators;
//# sourceMappingURL=validators.js.map