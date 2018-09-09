import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { IDefaultUnlService, IGitHubService } from "../../service/types";
import { ILogger, IConfiguration } from "../../lib/types";
import { _sort } from "../../lib/util/util";
import { Domains, Models } from "../types";

@injectable()
export default class DefaultUnl implements Domains.IDefaultUnl {
  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: ILogger,
    @inject(TYPES.Lib.Configuration) private _configuration: IConfiguration,
    @inject(TYPES.Service.GitHubService) private _githubService: IGitHubService,
    @inject(TYPES.Service.DefaultUnlService)
    private _defaultUnlService: IDefaultUnlService
  ) {}

  getDefaultUnl = async (
    date: string,
    archives: Models.DefaultUnlArchiveEntry[]
  ) => {
    try {
      if (date) {
        const filter = archives.filter(a => a.date === date);
        if (filter.length === 0) {
          throw new Error(`no mathcing default unl found for the date ${date}`);
        }
        return this._defaultUnlService.getDefaultUnlByUrl(filter[0].url);
      } else {
        return this._defaultUnlService.getDefaultUnl();
      }
    } catch (err) {
      this._logger.error(err);
      throw err;
    }
  };

  getLatestDefaultUnl = async () => {
    try {
      return this._defaultUnlService.getDefaultUnl();
    } catch (err) {
      this._logger.error(err);
      throw err;
    }
  };

  getDefaultUnlArchives = async () => {
    try {
      const data = await this._githubService.getDefaultUnlArchives();
      _sort(data, "date", "dsc");
      data.unshift({
        name: this._configuration.getDefaultUNLsURL(),
        url: this._configuration.getDefaultUNLsURL(),
        date: ""
      });
      return data;
    } catch (err) {
      this._logger.error(err);
      throw err;
    }
  };
}
