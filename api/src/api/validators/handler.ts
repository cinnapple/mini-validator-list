import * as moment from "moment";
import "reflect-metadata";
import { _takeLastNHours } from "../../domain/common/util";
import { inject, injectable, TYPES } from "../../inversify";

@injectable()
export default class ValidatorHandler implements api.IValidatorHandler {
  constructor(
    @inject(TYPES.Proxy.DefaultUnl) private _defaultUnl: domain.IDefaultUnl,
    @inject(TYPES.Proxy.Geo) private _geo: domain.IGeo,
    @inject(TYPES.Proxy.Stats) private _stats: domain.IStats,
    @inject(TYPES.Proxy.Validators) private _validators: domain.IValidators
  ) {}

  public getValidatorSummary = async args => {
    const date = args.query.d || "";
    const lastNHours = args.query.h || 6;

    const archives = await this._defaultUnl.getDefaultUnlArchives();
    const defaultUnl = await this._defaultUnl.getDefaultUnl(date, archives);
    const dailyReports = await this._stats.getDailyReports();
    const validators = await this._validators.getValidators();
    const domainGeoList = await this._geo.getDomainGeoList(validators);
    let data = await this._validators.getValidatorSummary(
      date,
      defaultUnl,
      dailyReports,
      validators,
      domainGeoList
    );

    // apply the filter by last n hours
    if (lastNHours > 0) {
      const current = moment().add(-lastNHours, "h");
      data = data.filter(a =>
        _takeLastNHours(current, moment(a.last_datetime))
      );
    }

    return data;
  };
}
