import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";

import * as winston from "winston";
import { google } from "googleapis";
import * as Octokit from "@octokit/rest";
import { IConfiguration } from "../types";
import { IThirdPartyLibFactory } from "../types";

@injectable()
export default class ThirdPartyLibFactory implements IThirdPartyLibFactory {
  constructor(
    @inject(TYPES.Lib.Configuration) private _configuration: IConfiguration
  ) {}
  createLogger = () => {
    return winston.createLogger({
      transports: [new winston.transports.Console()]
    });
  };
  createGAReportingApi = async () => {
    const client = await google.auth.getClient({
      keyFile: this._configuration.getGoogleJwtJsonFilePath(),
      scopes: "https://www.googleapis.com/auth/analytics"
    });
    const analytics = google.analyticsreporting({
      version: "v4",
      auth: client
    });
    return analytics;
  };
  createGitHubApi = () => new Octokit();
}
