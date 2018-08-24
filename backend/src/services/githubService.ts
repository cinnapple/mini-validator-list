import { injectable, inject } from "inversify";
import "reflect-metadata";
import {
  IConfiguration,
  Lib,
  Cache,
  ICacheManagerFactory,
  ICacheManager,
  IIntervalManager,
  IGitHubService
} from "../types";
import { TYPES } from "../inversify.types";
import fetch from "node-fetch";
import { DATED_CACHE } from "../util";

type AvailableTypes =
  | Lib.GitHub.IRepositoryContentResponse
  | Lib.RippleData.DefaultUnlRawResponse;

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

const sortByDate = (a, b) => {
  return (a.date > b.date ? 1 : a.date < b.date ? -1 : 0) * -1;
};

@injectable()
export default class GitHubService implements IGitHubService {
  private _githubCacheManager: ICacheManager<AvailableTypes>;

  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: Lib.ILogger,
    @inject(TYPES.Configuration) private _configuration: IConfiguration,
    @inject(TYPES.CacheManagerFactory)
    private _cacheManagerFactory: ICacheManagerFactory,
    @inject(TYPES.Lib.GitHubApi) private _githubClient: Lib.GitHub.IApi,
    @inject(TYPES.IntervalManager) private _intervalManger: IIntervalManager
  ) {
    this._githubCacheManager = this._cacheManagerFactory.create(
      Cache.MANAGERS.GITHUB_SERVICE
    );
    this._startIntervalFetchAll();
    this._startInitialFetchAll();
  }

  private _startIntervalFetchAll() {
    const interval = this._configuration.getGAFetchInterval();
    this._intervalManger.createInterval(
      "githubFetch",
      () => this._fetchDefaultUNLArchives(),
      interval
    );
  }

  private async _startInitialFetchAll() {
    this._fetchDefaultUNLArchives();
  }

  private async _fetchDefaultUNLArchives() {
    this._githubCacheManager.set(
      Cache.TYPES.GITHUB_DEFAULT_UNL_ARCHIVES,
      async () => {
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
        data.sort(sortByDate);
        return Promise.resolve(data);
      }
    );
  }

  private async _fetchDefaultUNL(date: string) {
    this._githubCacheManager.set(
      DATED_CACHE(Cache.TYPES.GITHUB_DEFAULT_UNL, date),
      async () => {
        const filter = this._githubCacheManager
          .get<Lib.GitHub.IRepositoryContentResponse>(
            Cache.TYPES.GITHUB_DEFAULT_UNL_ARCHIVES
          )
          .list.filter(a => a.date === date);
        if (filter.length === 0) {
          return Promise.reject(
            `no mathcing default unl found for the date ${date}`
          );
        }
        const defaultUnlArchive = filter[0];
        const res = await fetch(defaultUnlArchive.url);
        const json = await res.json();
        return Promise.resolve(json);
      }
    );
  }

  async getDefaultUnl(
    date: string
  ): Promise<Cache.IDataCache<Lib.RippleData.DefaultUnlRawResponse>> {
    this.startFetchDefaultUnl(date);
    await this._githubCacheManager.waitFor(
      DATED_CACHE(Cache.TYPES.GITHUB_DEFAULT_UNL, date)
    );
    return this._githubCacheManager.get<Lib.RippleData.DefaultUnlRawResponse>(
      DATED_CACHE(Cache.TYPES.GITHUB_DEFAULT_UNL, date)
    );
  }

  async getLastDefaultUnlDate(): Promise<string> {
    await this._githubCacheManager.waitFor(
      Cache.TYPES.GITHUB_DEFAULT_UNL_ARCHIVES
    );
    const last = this._githubCacheManager.get<
      Lib.GitHub.IRepositoryContentResponse
    >(Cache.TYPES.GITHUB_DEFAULT_UNL_ARCHIVES).list[0];
    return last.date;
  }

  startFetchDefaultUnl(date: string): void {
    const cache = this._githubCacheManager.get<
      Lib.RippleData.DefaultUnlRawResponse
    >(DATED_CACHE(Cache.TYPES.GITHUB_DEFAULT_UNL, date));
    if (!cache) {
      this._fetchDefaultUNL(date);
    }
  }

  async getDefaultUnlArchives(): Promise<
    Cache.IDataCache<Lib.GitHub.IRepositoryContentResponse>
  > {
    await this._githubCacheManager.waitFor(
      Cache.TYPES.GITHUB_DEFAULT_UNL_ARCHIVES
    );
    return this._githubCacheManager.get<Lib.GitHub.IRepositoryContentResponse>(
      Cache.TYPES.GITHUB_DEFAULT_UNL_ARCHIVES
    );
  }
}
