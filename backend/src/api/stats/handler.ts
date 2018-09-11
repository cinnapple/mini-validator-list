import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { Domains } from "../../domain/types";
import { Handlers } from "../types";

@injectable()
export default class StatsHandler implements Handlers.IStatsHandler {
  constructor(
    @inject(TYPES.Proxy.DefaultUnl) private _defaultUnl: Domains.IDefaultUnl,
    @inject(TYPES.Proxy.Validators) private _validators: Domains.IValidators,
    @inject(TYPES.Proxy.Geo) private _geo: Domains.IGeo,
    @inject(TYPES.Proxy.Stats) private _stats: Domains.IStats
  ) {}

  getStats = async args => {
    args.params.lastNHours || 6;

    const defaultUnl = await this._defaultUnl.getLatestDefaultUnl();
    const dailyReports = await this._stats.getDailyReports();
    const validators = await this._validators.getValidators();
    const domainGeoList = await this._geo.getDomainGeoList(validators);
    const validatorSummary = await this._validators.getValidatorSummary(
      "",
      defaultUnl,
      dailyReports,
      validators,
      domainGeoList
    );
    return this._stats.getSummary("", validatorSummary);
  };
}
