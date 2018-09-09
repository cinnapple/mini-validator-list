import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { ILogger } from "../../lib/types";
import { IRippleDataService } from "../../service/types";
import { Domains, Models } from "../types";
import * as moment from "moment";
import StatsUtil from "./calculate";
import { _takeLastNHours, _takeMainNetOnly } from "../common/util";

@injectable()
export default class Stats implements Domains.IStats {
  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: ILogger,
    @inject(TYPES.Service.RippleDataService)
    private _rippleDataService: IRippleDataService
  ) {}

  getSummary = async (
    _date: string,
    validatorList: Models.ValidatorSummary[]
  ) => {
    try {
      // remove non active validators in the last N hours.
      const threshould = moment().add(-6, "h");
      const mainNetValidators = validatorList.filter(
        a =>
          _takeLastNHours(threshould, moment(a.last_datetime)) &&
          _takeMainNetOnly(a)
      );
      const summary = StatsUtil.getSummaryStats(mainNetValidators);
      return summary;
    } catch (err) {
      this._logger.error(err);
      throw err;
    }
  };

  getDailyReports = async () => {
    try {
      return this._rippleDataService.getValidatorDailyReports();
    } catch (err) {
      this._logger.error(err);
      throw err;
    }
  };
}
