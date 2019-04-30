import { injectable, inject, TYPES } from "../di";
import { IHistoryFetchStrategy, IGithubApi } from "../types";
import * as moment from "moment";

class RippleUnlHistoryFetchStrategy implements IHistoryFetchStrategy {
  private _fileNameRegexp = new RegExp(/^index\..*\.json$/);

  private _dateRegexp = new RegExp(/index\.([\d-]{1,})\.json/);

  constructor(@inject(TYPES.GithubApi) private _githubApi: IGithubApi) {}

  private _isDefaultUnlFile = (file: any) => {
    return !!this._fileNameRegexp.exec(file.name);
  };

  private _getDate = (file: any) => {
    try {
      const match = this._dateRegexp.exec(file.name);
      return moment(match[1]).toDate();
    } catch {
      return null;
    }
  };

  private transform = (data: any[]) =>
    data.filter(this._isDefaultUnlFile).map(file => ({
      id: file.name,
      date: this._getDate(file),
      url: file.download_url
    }));

  getList() {
    return this._githubApi.getRippleUnlList().then(this.transform);
  }
}

export default RippleUnlHistoryFetchStrategy;
