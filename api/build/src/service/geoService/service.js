"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("../../inversify");
const dns = require("dns");
const bluebird = require("bluebird");
let GeoService = class GeoService {
    constructor(_loggerFactory, _configuration, _webClient) {
        this._loggerFactory = _loggerFactory;
        this._configuration = _configuration;
        this._webClient = _webClient;
        this._lookupAsync = bluebird.promisify(dns.lookup);
        this._wait = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return bluebird.delay(200);
        });
        this.getGeoData = (domainOrIp) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this._wait();
            const url = `${this._configuration.ipStack.url}/${domainOrIp}?access_key=${this._configuration.ipStack.apiKey}`;
            return this._webClient.get(url).catch(err => {
                this._logger.error(err);
                return {};
            });
        });
        this.getIpFromDomain = (domain) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._lookupAsync(domain).catch(() => "");
        });
        this._logger = this._loggerFactory.create(`Service.GeoService`);
    }
};
GeoService = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Lib.LoggerFactory)),
    tslib_1.__param(1, inversify_1.inject(inversify_1.TYPES.Lib.Configuration)),
    tslib_1.__param(2, inversify_1.inject(inversify_1.TYPES.Lib.WebClient)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], GeoService);
exports.default = GeoService;
//# sourceMappingURL=service.js.map