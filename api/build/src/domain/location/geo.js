"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("../../inversify");
const _roundCoordinate = (num) => {
    const factor = 100;
    return Math.round(num * factor) / factor;
};
const _reverseSplit = (domain) => {
    const trimIndex = domain.indexOf("/");
    return domain
        .slice(0, trimIndex >= 0 ? trimIndex : domain.length)
        .split(".")
        .reverse();
};
const _reverseJoin = (domainChunks) => {
    return domainChunks
        .slice()
        .reverse()
        .join(".");
};
let Geo = class Geo {
    constructor(_loggerFactory, _configuration, _geoService) {
        this._loggerFactory = _loggerFactory;
        this._configuration = _configuration;
        this._geoService = _geoService;
        this._createEmptyDomain = domain => ({
            domain,
            ip: "",
            country_code: "",
            country_name: "",
            region_name: "",
            city: "",
            latitude: -1,
            longitude: -1
        });
        this._lookup = (domain) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let data;
            const reverseSplit = _reverseSplit(domain);
            const domainChunks = [];
            for (let i = 0; i < reverseSplit.length; i++) {
                domainChunks.push(reverseSplit[i]);
                if (i > 0) {
                    const partialDomain = _reverseJoin(domainChunks);
                    data = yield this._geoService.getGeoData(partialDomain);
                    if (data.country_code) {
                        break;
                    }
                    const ip = yield this._geoService.getIpFromDomain(partialDomain);
                    data = yield this._geoService.getGeoData(ip);
                    if (data.country_code) {
                        break;
                    }
                }
            }
            if (data && data.country_code) {
                data.domain = domain;
                return data;
            }
            const logMessage = `The domain lookup failed for ${domain}`;
            this._logger.warn(logMessage);
            throw Error(logMessage);
        });
        this.getDomainGeoList = (validators) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const domains = {};
                validators.reduce((prev, v) => {
                    if (v.domain && !domains[v.domain]) {
                        prev.push(v.domain);
                        domains[v.domain] = true;
                    }
                    return prev;
                }, []);
                const geoDataSet = yield Promise.all(Object.keys(domains).map(domain => this._lookup(domain).catch(() => this._createEmptyDomain(domain))));
                const list = geoDataSet.map(geoData => ({
                    domain: geoData.domain,
                    ip: geoData.ip,
                    country_name: geoData.country_name,
                    country_code: geoData.country_code,
                    region_name: geoData.region_name,
                    city: geoData.city,
                    latitude: _roundCoordinate(geoData.latitude),
                    longitude: _roundCoordinate(geoData.longitude)
                }));
                this._logger.info(`${list.length} domain lookup succeeded out of ${validators.length} validators.`);
                return list;
            }
            catch (err) {
                this._logger.error(err);
                throw err;
            }
        });
        this._logger = _loggerFactory.create("Domain.Geo");
    }
};
Geo = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Lib.LoggerFactory)),
    tslib_1.__param(1, inversify_1.inject(inversify_1.TYPES.Lib.Configuration)),
    tslib_1.__param(2, inversify_1.inject(inversify_1.TYPES.Service.GeoService)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], Geo);
exports.default = Geo;
//# sourceMappingURL=geo.js.map