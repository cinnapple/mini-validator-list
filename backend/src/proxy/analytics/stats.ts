import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { ICache } from "../../lib/types";
import { Cache } from "../types";
import { Domains, Models } from "../../domain/types";

@injectable()
export default class StatsProxy implements Domains.IStats {
  constructor(
    @inject(TYPES.Lib.Cache) private _cache: ICache,
    @inject(TYPES.Domain.Stats) private _actual: Domains.IStats
  ) {}

  getSummary = async (date: string, validatorList: Models.ValidatorSummary[]) =>
    this._cache.get(
      Cache.SUMMARY_DATA.key,
      `${date || ""}`,
      () => this._actual.getSummary(date, validatorList),
      Cache.SUMMARY_DATA.interval
    );

  getDailyReports = async () =>
    this._cache.get(
      Cache.RIPPLE_DAILY_REPORT.key,
      ``,
      () => this._actual.getDailyReports(),
      Cache.RIPPLE_DAILY_REPORT.interval
    );
}
