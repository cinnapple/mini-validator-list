import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { Domains, Models } from "../../domain/types";
import { Cache } from "../types";
import { cache, cached } from "../../lib/cache/smartCache";

@injectable()
export default class DefaultUnlProxy implements Domains.IDefaultUnl {
  constructor(
    @inject(TYPES.Domain.DefaultUnl) private _actual: Domains.IDefaultUnl
  ) {}

  @cache({
    key: Cache.DefaultUnl.key,
    interval: Cache.DefaultUnl.interval
  })
  async getDefaultUnl(
    date: string,
    @cached(Cache.UnlArchives.key) archives?: Models.DefaultUnlArchiveEntry[]
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
    @cached(Cache.UnlArchives.key) archives: Models.DefaultUnlArchiveEntry[],
    @cached(Cache.ValidatorsSummary.key)
    validatorList: Models.ValidatorSummary[]
  ) {
    return this._actual.getDefaultUnlStats(archives, validatorList);
  }
}
