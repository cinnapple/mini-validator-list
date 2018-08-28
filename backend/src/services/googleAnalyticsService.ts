import { injectable, inject } from "inversify";
import "reflect-metadata";
import { IConfiguration, Lib, Cache, IGoogleService } from "../types";
import * as moment from "moment";
import { TYPES } from "../inversify.types";
import { Memoize } from "../cache/cache.types";

@injectable()
export default class GoogleAnalyticsService implements IGoogleService {
  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: Lib.ILogger,
    @inject(TYPES.Configuration) private _configuration: IConfiguration,
    @inject(TYPES.Memoizer) private _memoizer: Memoize.IMemoizer,
    @inject(TYPES.Lib.GoogleApi)
    private _googleQueierPromise: Promise<Lib.Google.IApi>
  ) {
    const interval = this._configuration.getGAFetchInterval();
    setImmediate(async () => {
      await this._memoizer.register(
        Cache.TYPES.GOOGLE_REFERRALS,
        this._fetchReport.bind(this),
        { interval: interval, immediate: true }
      );
    });
  }

  private async _fetchReport() {
    const res = await (await this._googleQueierPromise).reports.batchGet({
      requestBody: {
        reportRequests: [
          {
            viewId: this._configuration.getGAViewId(),
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

    const excludeRegex = this._configuration.getGAExcludedReferralDomainsRegex();

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

    return list;
  }

  getReferrals = async () =>
    this._memoizer.get<Lib.Google.IApiResponse>(Cache.TYPES.GOOGLE_REFERRALS);
}
