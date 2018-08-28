import { injectable, inject } from "inversify";
import "reflect-metadata";
import { IConfiguration, Lib, Cache, GitHub } from "../types";
import { TYPES } from "../inversify.types";
import fetch from "node-fetch";
import { Memoize } from "../cache/cache.types";
import { _sort } from "../util";

const fileNameRegexp = new RegExp(/^index\..*\.json$/);
const dateRegexp = new RegExp(/index\.([\d-]{1,})\.json/);

const isDefaultUnlFile = file => {
  return !!fileNameRegexp.exec(file.name);
};

const getDate = file => {
  const match = dateRegexp.exec(file.name);
  if (match.length > 1) {
    return match[1];
  }
  return "";
};

@injectable()
export default class GitHubService implements GitHub.IGitHubService {
  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: Lib.ILogger,
    @inject(TYPES.Configuration) private _configuration: IConfiguration,
    @inject(TYPES.Memoizer) private _memoizer: Memoize.IMemoizer,
    @inject(TYPES.Lib.GitHubApi) private _githubClient: GitHub.IApi
  ) {
    const interval = this._configuration.getGAFetchInterval();

    setImmediate(async () => {
      await this._memoizer.register(
        Cache.TYPES.GITHUB_DEFAULT_UNL_ARCHIVES,
        this._getDefaultUNLArchives.bind(this),
        { interval: interval, immediate: true }
      );
      await this._memoizer.register(
        Cache.TYPES.GITHUB_DEFAULT_UNL,
        this._getDefaultUNL.bind(this)
      );
    });
  }

  private async _getDefaultUNLArchives() {
    const res = await this._githubClient.repos.getContent({
      owner: "ripple",
      repo: "vl",
      path: ""
    });
    const data = res.data.filter(isDefaultUnlFile).map(file => {
      return {
        name: file.name,
        url: file.download_url,
        date: getDate(file)
      };
    });
    _sort(data, "date", "dsc");
    return data;
  }

  private async _getDefaultUNL(date: string) {
    const archives = await this._memoizer.get<
      GitHub.IRepositoryContentResponse[]
    >(Cache.TYPES.GITHUB_DEFAULT_UNL_ARCHIVES);

    const filter = archives.data.filter(a => a.date === date);
    if (filter.length === 0) {
      return new Error(`no mathcing default unl found for the date ${date}`);
    }
    const defaultUnlArchive = filter[0];
    const res = await fetch(defaultUnlArchive.url);
    return res.json();
  }

  async getDefaultUnlArchives() {
    return this._memoizer.get<GitHub.IRepositoryContentResponse>(
      Cache.TYPES.GITHUB_DEFAULT_UNL_ARCHIVES
    );
  }

  async getDefaultUnlByDate(date: string) {
    return this._memoizer.get<Lib.RippleData.DefaultUnlRawResponse>(
      Cache.TYPES.GITHUB_DEFAULT_UNL,
      { date: date }
    );
  }
}
