import * as Octokit from "@octokit/rest";

import { Logger } from "../../node_modules/winston";
// import { analyticsreporting_v4 } from "../../node_modules/googleapis";

export type HashMap<TType> = { [key: string]: TType };

export interface IProcessEnv extends HashMap<string> {}

export interface IConfiguration {
  getFetchInterval(): number;
  getGeoInfoFetchInterval(): number;
  getGAFetchInterval(): number;
  getDefaultUNLsURL(): string;
  getValidatorsURL(): string;
  getValidatorDailyReportsURL(): string;
  getIPStackFetchURL(): string;
  getIPStackApiKey(): string;
  getPort(): number;
  getAltNetDomainsPattern(): RegExp;
  getGAViewId(): string;
  getGAExcludedReferralDomainsRegex(): RegExp;
  getGoogleJwtJsonFilePath(): string;
  isProduction(): boolean;
}

export interface ILogger extends Logger {}

export interface IThirdPartyLibFactory {
  createLogger(): ILogger;
  createGitHubApi(): Octokit;
  // createGAReportingApi(): Promise<Google.IApi>;
}

export interface IWebClient {
  get: <T>(url: string) => Promise<T>;
}

export interface ICrypto {
  parseDefaultUNLBlob: (blob: string) => string[];
}

// export namespace Google {
//   export type JwtJson = {
//     web: {
//       client_id: string;
//       project_id: string;
//       auth_uri: string;
//       token_uri: string;
//       auth_provider_x509_cert_url: string;
//       client_secret: string;
//     };
//   };
//   export interface IApi extends analyticsreporting_v4.Analyticsreporting {}
//   export interface IApiResponse {
//     fullReferral: string;
//     domain: string;
//     views: string;
//     url: string;
//     title: string;
//   }
//   [];
// }

export type GitHubClient = Octokit;

/**
 * API Handlers
 */
export type HandlerArgs<TParams, TQuery> = {
  params: TParams;
  query: TQuery;
};

export type Handler<TParams, TQuery, TData> = (
  args?: HandlerArgs<TParams, TQuery>
) => Promise<TData>;

export type Route = {
  method: string;
  path: string;
  handler: Function;
};

export interface IRoutes {
  get(): Route[];
}

export interface ICache {
  get: <TItem>(
    key: string,
    variant: string,
    setter: () => Promise<TItem>,
    interval: number
  ) => Promise<TItem>;
}

export enum Frequency {
  Often = 1000 * 60,
  Rarely = 1000 * 60 * 60 * 24, // every 24 hours
  Never = -1
}
