"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("../../inversify");
const mock_getDomainGeoList_1 = require("../../resources/mock.getDomainGeoList");
const smartCache_1 = require("../../lib/cache/smartCache");
const cacheKeys_1 = require("../../proxy/cacheKeys");
let GeoProxy = class GeoProxy {
    constructor(_configuration, _actual) {
        this._configuration = _configuration;
        this._actual = _actual;
    }
    getDomainGeoList(validators) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this._configuration.isProduction) {
                return Promise.resolve(mock_getDomainGeoList_1.default.list);
            }
            return this._actual.getDomainGeoList(validators);
        });
    }
};
tslib_1.__decorate([
    smartCache_1.cache({ key: cacheKeys_1.default.Geo.key, interval: cacheKeys_1.default.Geo.interval }),
    tslib_1.__param(0, smartCache_1.cached(cacheKeys_1.default.Validators.key)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], GeoProxy.prototype, "getDomainGeoList", null);
GeoProxy = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Lib.Configuration)),
    tslib_1.__param(1, inversify_1.inject(inversify_1.TYPES.Domain.Geo)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], GeoProxy);
exports.default = GeoProxy;
//# sourceMappingURL=geo.js.map