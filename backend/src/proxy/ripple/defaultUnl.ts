import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { ICache } from "../../lib/types";
import { Domains, Models } from "../../domain/types";
import { Cache } from "../types";

@injectable()
export default class DefaultUnlProxy implements Domains.IDefaultUnl {
  constructor(
    @inject(TYPES.Lib.Cache) private _cache: ICache,
    @inject(TYPES.Domain.DefaultUnl) private _actual: Domains.IDefaultUnl
  ) {}

  getDefaultUnl = async (
    date: string,
    archives: Models.DefaultUnlArchiveEntry[]
  ) =>
    this._cache.get(
      Cache.GITHUB_DEFAULT_UNL.key,
      `${date || ""}`,
      () => this._actual.getDefaultUnl(date, archives),
      Cache.GITHUB_DEFAULT_UNL.interval
    );

  getLatestDefaultUnl = async () =>
    this._cache.get(
      Cache.RIPPLE_DEFAULT_UNL.key,
      "",
      () => this._actual.getLatestDefaultUnl(),
      Cache.RIPPLE_DEFAULT_UNL.interval
    );

  getDefaultUnlArchives = async () =>
    this._cache.get(
      Cache.GITHUB_DEFAULT_UNL_ARCHIVES.key,
      "",
      () => this._actual.getDefaultUnlArchives(),
      Cache.GITHUB_DEFAULT_UNL_ARCHIVES.interval
    );
}
