"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("../../inversify");
let RippleDataService = class RippleDataService {
    constructor(_loggerFactory, _configuration, _webClient) {
        this._loggerFactory = _loggerFactory;
        this._configuration = _configuration;
        this._webClient = _webClient;
        this.getValidators = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this._logger.info(`getValidators`);
            return this._webClient
                .get(this._configuration.ripple.validatorsUrl)
                .then(data => data.validators);
        });
        this.getValidatorDailyReports = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this._logger.info(`getValidatorDailyReports`);
            return this._webClient
                .get(this._configuration.ripple.validatorDailyReportsUrl)
                .then(data => data.reports.rows);
        });
        this._logger = this._loggerFactory.create(`Service.RippleDataService`);
    }
};
RippleDataService = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Lib.LoggerFactory)),
    tslib_1.__param(1, inversify_1.inject(inversify_1.TYPES.Lib.Configuration)),
    tslib_1.__param(2, inversify_1.inject(inversify_1.TYPES.Lib.WebClient)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], RippleDataService);
exports.default = RippleDataService;
//# sourceMappingURL=service.js.map