import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import * as moment from "moment";
// tslint:disable-next-line:import-name
import StatsUtil from "./calculate";
import { _takeLastNHours, _takeMainNetOnly } from "../common/util";

@injectable()
export default class Stats implements domain.IStats {
  private _logger: lib.ILogger;

  constructor(
    @inject(TYPES.Lib.LoggerFactory)
    protected _loggerFactory: lib.ILoggerFactory,
    @inject(TYPES.Service.RippleDataService)
    private _rippleDataService: service.IRippleDataService
  ) {
    this._logger = _loggerFactory.create("Domain.Stats");
  }

  getSummary = async (validatorList: domain.ValidatorSummary[]) => {
    try {
      // remove non active validators in the last N hours.
      const threshould = moment().add(-6, "h");
      const mainNetValidators = validatorList.filter(
        a =>
          a.default ||
          (_takeLastNHours(threshould, moment(a.last_datetime)) &&
            _takeMainNetOnly(a))
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
