import { injectable, inject } from "inversify";
import "reflect-metadata";
import { IQuerier, IConfiguration, Lib } from "./types";
import { TYPES } from "./inversify.types";

import axios from "axios";

@injectable()
export default class Querier implements IQuerier {
  constructor(
    @inject(TYPES.Configuration) private _configuration: IConfiguration
  ) {}

  private async _get<T>(url: string): Promise<T> {
    return axios.get<T>(url).then(a => a.data);
  }

  async getDefaultUnl() {
    return this._get<Lib.RippleData.DefaultUnlRawResponse>(
      this._configuration.getDefaultUNLsURL()
    );
  }

  async getValidators() {
    return this._get<{ validators: Lib.RippleData.ValidatorRawResponse[] }>(
      this._configuration.getValidatorsURL()
    ).then(data => data.validators);
  }

  async getValidatorDailyReports() {
    return this._get<{ reports: Lib.RippleData.DailyReportRawResponse[] }>(
      this._configuration.getValidatorDailyReportsURL()
    ).then(data => data.reports);
  }
}
