import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { ICache } from "../../lib/types";
import { Domains, Models } from "../../domain/types";
import { Cache } from "../types";

@injectable()
export default class ValidatorsProxy implements Domains.IValidators {
  constructor(
    @inject(TYPES.Lib.Cache) private _cache: ICache,
    @inject(TYPES.Domain.Validators) private _actual: Domains.IValidators
  ) {}

  getValidators = async () =>
    this._cache.get(
      Cache.RIPPLE_VALIDATORS.key,
      ``,
      () => this._actual.getValidators(),
      Cache.RIPPLE_VALIDATORS.interval
    );

  getValidatorSummary = async (
    date: string,
    defaultUnl: Models.DefaultUnl,
    dailyReports: Models.DailyReports[],
    allValidators: Models.Validator[],
    domainGeoList: Models.DomainGeo[]
  ) =>
    this._cache.get(
      Cache.MERGED_DATA.key,
      `${date || ""}`,
      () =>
        this._actual.getValidatorSummary(
          date,
          defaultUnl,
          dailyReports,
          allValidators,
          domainGeoList
        ),
      Cache.MERGED_DATA.interval
    );
}
