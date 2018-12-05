import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { cache, cached } from "../../lib/cache/smartCache";
import Cache from "../../proxy/cacheKeys";

@injectable()
export default class DefaultUnlProxy implements domain.IDefaultUnl {
  constructor(
    @inject(TYPES.Domain.DefaultUnl) private _actual: domain.IDefaultUnl
  ) {}

  @cache({
    key: Cache.DefaultUnl.key,
    interval: Cache.DefaultUnl.interval
  })
  async getDefaultUnl(
    date: string,
    @cached(Cache.UnlArchives.key) archives?: domain.DefaultUnlArchiveEntry[]
  ) {
    return this._actual.getDefaultUnl(date, archives);
  }

  @cache({
    key: Cache.UnlArchives.key,
    interval: Cache.UnlArchives.interval
  })
  async getDefaultUnlArchives() {
    return this._actual.getDefaultUnlArchives();
  }

  @cache({
    key: Cache.UnlMovementStats.key,
    interval: Cache.UnlMovementStats.interval
  })
  async getDefaultUnlStats(
    @cached(Cache.UnlArchives.key) archives: domain.DefaultUnlArchiveEntry[],
    @cached(Cache.ValidatorsSummary.key)
    validatorList: domain.ValidatorSummary[]
  ) {
    return this._actual.getDefaultUnlStats(archives, validatorList);
  }
}
