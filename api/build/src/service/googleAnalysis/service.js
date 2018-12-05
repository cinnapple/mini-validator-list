"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const googleapis_1 = require("googleapis");
const inversify_1 = require("../../inversify");
const moment = require("moment");
const createGAReportingApi = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const client = yield googleapis_1.google.auth.getClient({
        keyFile: this._configuration.getGoogleJwtJsonFilePath(),
        scopes: "https://www.googleapis.com/auth/analytics"
    });
    const analytics = googleapis_1.google.analyticsreporting({
        version: "v4",
        auth: client
    });
    return analytics;
});
let GoogleAnalyticsService = class GoogleAnalyticsService {
    constructor(_loggerFactory, _configuration) {
        this._configuration = _configuration;
        this.getReferrals = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield this._gaClient.reports.batchGet({
                requestBody: {
                    reportRequests: [
                        {
                            viewId: this._configuration.ga.viewId,
                            dateRanges: [
                                {
                                    startDate: moment(new Date())
                                        .add(-7, "days")
                                        .format("YYYY-MM-DD"),
                                    endDate: moment(new Date()).format("YYYY-MM-DD")
                                }
                            ],
                            dimensions: [
                                {
                                    name: "ga:fullReferrer"
                                }
                            ]
                        }
                    ]
                }
            });
            const excludeRegex = this._configuration.ga.excludedReferralDomainsRegex;
            const list = res.data.reports[0].data.rows.reduce((prev, curr) => {
                const fullReferral = curr.dimensions[0];
                const domain = fullReferral.split("/")[0];
                const views = parseInt(curr.metrics[0].values[0]);
                const url = `https://${fullReferral}`;
                const title = fullReferral
                    .replace(domain, "")
                    .replace(/[-_\/]{1,}/gi, " ")
                    .trim();
                if (domain.indexOf(".") < 0) {
                    return prev;
                }
                if (excludeRegex.exec(domain)) {
                    return prev;
                }
                if (fullReferral.replace(domain, "") === "/") {
                    return prev;
                }
                if (!prev[domain]) {
                    prev[domain] = [];
                }
                prev.push({ fullReferral, domain, views, url, title });
                return prev;
            }, []);
            const sortByViews = (a, b) => {
                return -1 * (a.views > b.views ? 1 : a.views < b.views ? -1 : 0);
            };
            list.sort(sortByViews);
            this._logger.info(`Fetched ${list.length} referrals.`);
            return list;
        });
        this._logger = _loggerFactory.create("Service.GitHubService");
        setImmediate(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this._gaClient = yield createGAReportingApi();
        }));
    }
};
GoogleAnalyticsService = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Lib.LoggerFactory)),
    tslib_1.__param(1, inversify_1.inject(inversify_1.TYPES.Lib.Configuration)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], GoogleAnalyticsService);
exports.default = GoogleAnalyticsService;
//# sourceMappingURL=service.js.map