import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { IConfiguration, IProcessEnv } from "../types";

import * as path from "path";
import * as rootPath from "app-root-path";

@injectable()
export default class Configuration implements IConfiguration {
  constructor(@inject(TYPES.Lib.ProcessEnv) private _env: IProcessEnv) {}
  private getFromProcessEnv(name: string) {
    return this._env[name];
  }

  getPort(): number {
    return parseInt(this.getFromProcessEnv("PORT"));
  }

  getFetchInterval(): number {
    return parseInt(this.getFromProcessEnv("FETCH_INTERVAL"));
  }

  getGeoInfoFetchInterval(): number {
    return parseInt(this.getFromProcessEnv("GEO_FETCH_INTERVAL"));
  }

  getGAFetchInterval(): number {
    return parseInt(this.getFromProcessEnv("GA_FETCH_INTERVAL"));
  }

  getDefaultUNLsURL(): string {
    return this.getFromProcessEnv("DEFAULT_UNL_URL");
  }

  getValidatorsURL(): string {
    return this.getFromProcessEnv("VALIDATORS_URL");
  }

  getValidatorDailyReportsURL(): string {
    return this.getFromProcessEnv("VALIDATOR_DAILY_REPORTS_URL");
  }

  getIPStackFetchURL(): string {
    return this.getFromProcessEnv("IPSTACK_GET_URL");
  }

  getIPStackApiKey(): string {
    return this.getFromProcessEnv("IPSTACK_API_KEY");
  }

  getAltNetDomainsPattern(): RegExp {
    return new RegExp(this.getFromProcessEnv("ALTNET_DOMAINS_PATTERN"));
  }

  getGAViewId(): string {
    return this.getFromProcessEnv("GA_VIEW_ID");
  }

  getGAExcludedReferralDomainsRegex(): RegExp {
    return new RegExp(
      this.getFromProcessEnv("GA_REFERRER_EXCLUDE_DOMAINS_REGEX")
    );
  }

  getGoogleJwtJsonFilePath(): string {
    return path.join(
      rootPath.toString(),
      this.getFromProcessEnv("GOOGLE_JWT_JSON_FILE_PATH")
    );
  }

  isProduction(): boolean {
    return this.getFromProcessEnv("NODE_ENV") === "production";
  }
}
