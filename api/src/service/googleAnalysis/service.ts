import "reflect-metadata";
import { google, analyticsreporting_v4 } from "googleapis";
import { injectable, inject, TYPES } from "../../inversify";
import * as moment from "moment";

const createGAReportingApi = async () => {
  const client = await google.auth.getClient({
    keyFile: this._configuration.getGoogleJwtJsonFilePath(),
    scopes: "https://www.googleapis.com/auth/analytics"
  });
  const analytics = google.analyticsreporting({
    version: "v4",
    auth: client
  });
  return analytics;
};

@injectable()
export default class GoogleAnalyticsService
  implements service.IGoogleAnalyticsService {
  private _logger: lib.ILogger;
  private _gaClient: analyticsreporting_v4.Analyticsreporting;

  constructor(
    @inject(TYPES.Lib.LoggerFactory) _loggerFactory: lib.ILoggerFactory,
    @inject(TYPES.Lib.Configuration) private _configuration: lib.IConfiguration
  ) {
    this._logger = _loggerFactory.create("Service.GitHubService");
    setImmediate(async () => {
      this._gaClient = await createGAReportingApi();
    });
  }

  getReferrals = async () => {
    const res = await this._gaClient.reports.batchGet({
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

    // sort
    const list = res.data.reports[0].data.rows.reduce((prev, curr) => {
      const fullReferral = curr.dimensions[0];
      const domain = fullReferral.split("/")[0];
      const views = parseInt(curr.metrics[0].values[0]);
      const url = `https://${fullReferral}`;
      const title = fullReferral
        .replace(domain, "")
        .replace(/[-_\/]{1,}/gi, " ")
        .trim();

      // check if the referral has dot (.)
      if (domain.indexOf(".") < 0) {
        return prev;
      }

      // check if it is listed in excluded domains
      if (excludeRegex.exec(domain)) {
        return prev;
      }

      // exclude top page referrals
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
  };
}
