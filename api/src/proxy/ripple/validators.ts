import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { cached, cache } from "../../lib/cache/smartCache";
import Cache from "../../proxy/cacheKeys";

@injectable()
export default class ValidatorsProxy implements domain.IValidators {
  constructor(
    @inject(TYPES.Domain.Validators) private _actual: domain.IValidators
  ) {}

  @cache({
    key: Cache.Validators.key,
    interval: Cache.Validators.interval
  })
  async getValidators() {
    return this._actual.getValidators();
  }

  @cache({
    key: Cache.ValidatorsSummary.key,
    interval: Cache.ValidatorsSummary.interval
  })
  async getValidatorSummary(
    _date: string,
    @cached(Cache.DefaultUnl.key) defaultUnl: domain.DefaultUnl,
    @cached(Cache.DailyReports.key) dailyReports: domain.DailyReports[],
    @cached(Cache.Validators.key) allValidators: domain.Validator[],
    @cached(Cache.Geo.key) domainGeoList: domain.DomainGeo[]
  ) {
    return this._actual.getValidatorSummary(
      _date,
      defaultUnl,
      dailyReports,
      allValidators,
      domainGeoList
    );
  }
}
