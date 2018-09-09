import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { ILogger } from "../../lib/types";
import { Domains } from "../../domain/types";
import { Handlers } from "../types";
import { _takeLastNHours } from "../../domain/common/util";
import * as moment from "moment";

@injectable()
export default class ValidatorHandler implements Handlers.IValidatorHandler {
  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: ILogger,
    @inject(TYPES.Proxy.DefaultUnl) private _defaultUnl: Domains.IDefaultUnl,
    @inject(TYPES.Proxy.Geo) private _geo: Domains.IGeo,
    @inject(TYPES.Proxy.Stats) private _stats: Domains.IStats,
    @inject(TYPES.Proxy.Validators) private _validators: Domains.IValidators
  ) {}

  getValidatorSummary = async args => {
    const date = args.query.d;
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
      const n = moment().add(-lastNHours, "h");
      data = data.filter(a => _takeLastNHours(n, moment(a.last_datetime)));
    }

    return data;
  };
}
