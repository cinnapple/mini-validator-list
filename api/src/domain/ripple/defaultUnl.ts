import * as moment from "moment";
import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { _sort } from "../../lib/util/util";

@injectable()
export default class DefaultUnl implements domain.IDefaultUnl {
  private _logger: lib.ILogger;

  constructor(
    @inject(TYPES.Lib.LoggerFactory)
    protected _loggerFactory: lib.ILoggerFactory,
    @inject(TYPES.Lib.Configuration) private _configuration: lib.IConfiguration,
    @inject(TYPES.Service.GitHubService)
    private _githubService: service.IGitHubService,
    @inject(TYPES.Lib.Crypto) private _crypto: lib.ICrypto,
    @inject(TYPES.Service.DefaultUnlService)
    private _defaultUnlService: service.IDefaultUnlService
  ) {
    this._logger = _loggerFactory.create("Domain.DefaultUnl");
  }

  getDefaultUnl = async (
    date: string,
    archives: domain.DefaultUnlArchiveEntry[]
  ) => {
    try {
      if (date) {
        if (!archives) {
          throw new Error(
            `getting a default UNL for a specific date requires archives`
          );
        }
        const archive = archives.find(a => a.date === date);
        if (!archive) {
          throw new Error(`no mathcing default unl found for the date ${date}`);
        }
        return this._defaultUnlService.getDefaultUnlByUrl(archive.url);
      }
      return this._defaultUnlService.getDefaultUnl();
    } catch (err) {
      this._logger.error(err);
      throw err;
    }
  };

  getDefaultUnlStats = async (
    archives: domain.DefaultUnlArchiveEntry[],
    validatorSummary: domain.ValidatorSummary[]
  ) => {
    try {
      const unls = await Promise.all(
        archives.map(async a => ({
          date: a.date,
          parsed: await this._defaultUnlService.getDefaultUnlByUrl(a.url)
        }))
      );
      const seen = {};
      return unls
        .reduce((prev, a) => {
          const date = moment(a.date || undefined);
          const key = `${date.year()}_${date.month() + 1}`;
          if (!seen[key]) {
            seen[key] = true;
            const parsedPubKeys = this._crypto.parseDefaultUNLBlob(
              a.parsed.blob
            );
            const rippleValidators = validatorSummary.filter(
              v =>
                parsedPubKeys.indexOf(v.pubkey) >= 0 && v.domain && v.is_ripple
            );
            const nonRippleValidators = validatorSummary.filter(
              v =>
                parsedPubKeys.indexOf(v.pubkey) >= 0 && v.domain && !v.is_ripple
            );
            const total = rippleValidators.length + nonRippleValidators.length;
            if (total > 0) {
              prev.push({
                total,
                ripple: rippleValidators.length,
                ripplePer: rippleValidators.length / total,
                nonRipple: nonRippleValidators.length,
                nonRipplePer: nonRippleValidators.length / total,
                date: key
              });
            }
          }
          return prev;
        }, [])
        .reverse();
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
        name: this._configuration.ripple.defaultUnlSite,
        url: this._configuration.ripple.defaultUnlSite,
        date: ""
      });
      return data;
    } catch (err) {
      this._logger.error(err);
      throw err;
    }
  };
}
