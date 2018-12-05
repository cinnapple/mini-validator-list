import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { cache, cached } from "../../lib/cache/smartCache";
import Cache from "../../proxy/cacheKeys";

@injectable()
export default class StatsProxy implements domain.IStats {
  constructor(@inject(TYPES.Domain.Stats) private _actual: domain.IStats) {}

  @cache({ key: Cache.Stats.key, interval: Cache.Stats.interval })
  async getSummary(
    @cached(Cache.ValidatorsSummary.key)
    validatorList: domain.ValidatorSummary[]
  ) {
    return this._actual.getSummary(validatorList);
  }

  @cache({
    key: Cache.DailyReports.key,
    interval: Cache.DailyReports.interval
  })
  async getDailyReports() {
    return this._actual.getDailyReports();
  }
}
