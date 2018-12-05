"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment = require("moment");
require("reflect-metadata");
const inversify_1 = require("../../inversify");
const util_1 = require("../../lib/util/util");
let DefaultUnl = class DefaultUnl {
    constructor(_loggerFactory, _configuration, _githubService, _crypto, _defaultUnlService) {
        this._loggerFactory = _loggerFactory;
        this._configuration = _configuration;
        this._githubService = _githubService;
        this._crypto = _crypto;
        this._defaultUnlService = _defaultUnlService;
        this.getDefaultUnl = (date, archives) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (date) {
                    if (!archives) {
                        throw new Error(`getting a default UNL for a specific date requires archives`);
                    }
                    const archive = archives.find(a => a.date === date);
                    if (!archive) {
                        throw new Error(`no mathcing default unl found for the date ${date}`);
                    }
                    return this._defaultUnlService.getDefaultUnlByUrl(archive.url);
                }
                return this._defaultUnlService.getDefaultUnl();
            }
            catch (err) {
                this._logger.error(err);
                throw err;
            }
        });
        this.getDefaultUnlStats = (archives, validatorSummary) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const unls = yield Promise.all(archives.map((a) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return ({
                        date: a.date,
                        parsed: yield this._defaultUnlService.getDefaultUnlByUrl(a.url)
                    });
                })));
                const seen = {};
                return unls
                    .reduce((prev, a) => {
                    const date = moment(a.date || undefined);
                    const key = `${date.year()}_${date.month() + 1}`;
                    if (!seen[key]) {
                        seen[key] = true;
                        const parsedPubKeys = this._crypto.parseDefaultUNLBlob(a.parsed.blob);
                        const rippleValidators = validatorSummary.filter(v => parsedPubKeys.indexOf(v.pubkey) >= 0 && v.domain && v.is_ripple);
                        const nonRippleValidators = validatorSummary.filter(v => parsedPubKeys.indexOf(v.pubkey) >= 0 && v.domain && !v.is_ripple);
                        const total = rippleValidators.length + nonRippleValidators.length;
                        if (total > 0) {
                            prev.push({
                                total,
                                ripple: rippleValidators.length,
                                ripplePer: rippleValidators.length / total,
                                nonRipple: nonRippleValidators.length,
                                nonRipplePer: nonRippleValidators.length / total,
                                date: key
                            });
                        }
                    }
                    return prev;
                }, [])
                    .reverse();
            }
            catch (err) {
                this._logger.error(err);
                throw err;
            }
        });
        this.getLatestDefaultUnl = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return this._defaultUnlService.getDefaultUnl();
            }
            catch (err) {
                this._logger.error(err);
                throw err;
            }
        });
        this.getDefaultUnlArchives = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this._githubService.getDefaultUnlArchives();
                util_1._sort(data, "date", "dsc");
                data.unshift({
                    name: this._configuration.ripple.defaultUnlSite,
                    url: this._configuration.ripple.defaultUnlSite,
                    date: ""
                });
                return data;
            }
            catch (err) {
                this._logger.error(err);
                throw err;
            }
        });
        this._logger = _loggerFactory.create("Domain.DefaultUnl");
    }
};
DefaultUnl = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Lib.LoggerFactory)),
    tslib_1.__param(1, inversify_1.inject(inversify_1.TYPES.Lib.Configuration)),
    tslib_1.__param(2, inversify_1.inject(inversify_1.TYPES.Service.GitHubService)),
    tslib_1.__param(3, inversify_1.inject(inversify_1.TYPES.Lib.Crypto)),
    tslib_1.__param(4, inversify_1.inject(inversify_1.TYPES.Service.DefaultUnlService)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], DefaultUnl);
exports.default = DefaultUnl;
//# sourceMappingURL=defaultUnl.js.map