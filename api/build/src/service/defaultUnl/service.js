"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("../../inversify");
let RippleDefaultUnlSiteService = class RippleDefaultUnlSiteService {
    constructor(_loggerFactory, _configuration, _webClient) {
        this._loggerFactory = _loggerFactory;
        this._configuration = _configuration;
        this._webClient = _webClient;
        this.getDefaultUnl = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this._logger.info(`getDefaultUnl`);
            return this._webClient.get(this._configuration.ripple.defaultUnlSite);
        });
        this.getDefaultUnlByUrl = (url) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this._logger.info(`getDefaultUnlByUrl ${url}`);
            return this._webClient.get(url);
        });
        this._logger = this._loggerFactory.create(`Service.RippleDefaultUnlSiteService`);
    }
};
RippleDefaultUnlSiteService = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Lib.LoggerFactory)),
    tslib_1.__param(1, inversify_1.inject(inversify_1.TYPES.Lib.Configuration)),
    tslib_1.__param(2, inversify_1.inject(inversify_1.TYPES.Lib.WebClient)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], RippleDefaultUnlSiteService);
exports.default = RippleDefaultUnlSiteService;
//# sourceMappingURL=service.js.map