import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { IDefaultUnlService, IGitHubService } from "../../service/types";
import {
  ILogger,
  IConfiguration,
  ILoggerFactory,
  ICrypto
} from "../../lib/types";
import { _sort } from "../../lib/util/util";
import { Domains, Models } from "../types";

@injectable()
export default class DefaultUnl implements Domains.IDefaultUnl {
  private _logger: ILogger;

  constructor(
    @inject(TYPES.Lib.LoggerFactory) protected _loggerFactory: ILoggerFactory,
    @inject(TYPES.Lib.Configuration) private _configuration: IConfiguration,
    @inject(TYPES.Service.GitHubService) private _githubService: IGitHubService,
    @inject(TYPES.Lib.Crypto) private _crypto: ICrypto,
    @inject(TYPES.Service.DefaultUnlService)
    private _defaultUnlService: IDefaultUnlService
  ) {
    this._logger = _loggerFactory.create("Domain.DefaultUnl");
  }

  getDefaultUnl = async (
    date: string,
    archives: Models.DefaultUnlArchiveEntry[]
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
    archives: Models.DefaultUnlArchiveEntry[],
    validatorSummary: Models.ValidatorSummary[]
  ) => {
    try {
      const unls = await Promise.all(
        archives.map(async a => ({
          date: a.date,
          parsed: await this._defaultUnlService.getDefaultUnlByUrl(a.url)
        }))
      );
      return unls.map(a => {
        const parsedPubKeys = this._crypto.parseDefaultUNLBlob(a.parsed.blob);
        const rippleValidators = validatorSummary.filter(
          v => parsedPubKeys.indexOf(v.pubkey) >= 0 && v.domain && v.is_ripple
        );
        const nonRippleValidators = validatorSummary.filter(
          v => parsedPubKeys.indexOf(v.pubkey) >= 0 && v.domain && !v.is_ripple
        );
        return {
          ripple: rippleValidators.length,
          nonRipple: nonRippleValidators.length,
          date: a.date
        };
      });
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
