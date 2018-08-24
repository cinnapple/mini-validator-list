import { Logger } from "../node_modules/winston";
import Koa from "koa";
import Router from "koa-router";
import * as Octokit from "@octokit/rest";
import { analyticsreporting_v4 } from "../node_modules/googleapis";

export type HashMap<TType> = { [key: string]: TType };

export interface IThirdPartyLibFactory {
  createServer(): Lib.Koa.IServer;
  createRouter(): Lib.Koa.IRouter;
  createLogger(): Lib.ILogger;
  createGAReportingApi(): Promise<Lib.Google.IApi>;
  createGitHubApi(): Lib.GitHub.IApi;
}

export interface ICacheManagerFactory {
  createReadonly<TCacheType>(
    key: Cache.MANAGERS
  ): IReadOnlyCacheManager<TCacheType>;
  create<TCacheType>(key: Cache.MANAGERS): ICacheManager<TCacheType>;
}

export interface IIntervalManager {
  clearInterval(name: string): void;
  createInterval(name: string, action: () => void, interval: number): void;
}

export interface IReadOnlyCacheManager<TCacheType> {
  get<TExtractCacheType extends TCacheType>(
    name: string
  ): Cache.IDataCache<TExtractCacheType>;
  waitFor(name: string, who?: string): void;
}

export interface ICacheManager<TCacheType>
  extends IReadOnlyCacheManager<TCacheType> {
  set(name: string, action: () => Promise<TCacheType | TCacheType[]>): void;
}

export interface IServer {
  listen(): void;
}

export namespace Cache {
  export enum MANAGERS {
    RIPPLE_SERVICE,
    GITHUB_SERVICE,
    GA_SERVICE
  }
  export const TYPES = {
    RIPPLE_DEFAULT_UNL: "ripple.defaultUNL",
    RIPPLE_DAILY_REPORT: "ripple.reports",
    RIPPLE_VALIDATORS: "ripple.validators",
    GOOGLE_REFERRALS: "google.referrals",
    GITHUB_DEFAULT_UNL_ARCHIVES: "github.defaultUNLArchives",
    GITHUB_DEFAULT_UNL: "github.defaultUNL",
    IPSTACK_GEO: "ipstack.geo",
    MERGED_DATA: "data.merged",
    SUMMARY_DATA: "data.summary"
  };
  export interface IDataCache<TCacheType> {
    lastUpdated: Date;
    list: TCacheType[];
  }
  export type MergedData = {
    pubkey: string;
    domain: string;
    is_ripple: boolean;
    verified: boolean;
    default: boolean;
    is_alt_net: boolean;
    agreement: number;
    disagreement: number;
    total_ledgers: number;
    city: string;
    country_name: string;
    country_code: string;
    region_name: string;
    latitude: number;
    longitude: number;
  };

  export type SummaryStats = {};
}

export namespace Stats {
  export type Item = {
    heading: string;
    value: number;
  };
  export namespace Data {
    export type List = { list: any[] };
    export type XY = { x: number[]; y: string[] };
  }
}

export type ResolveDnsResponse = {
  domain: string;
  ip: string;
};

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
}

export interface IQuerier {
  getDefaultUnl(): Promise<Lib.RippleData.DefaultUnlRawResponse>;
  getValidators(): Promise<Lib.RippleData.ValidatorRawResponse[]>;
  getValidatorDailyReports(): Promise<Lib.RippleData.DailyReportRawResponse[]>;
  getIpFromDomain(domain: string): Promise<ResolveDnsResponse>;
  getGeoInfo(ips: string[]): Promise<Lib.IPStackResponse>;
}

export interface IRippleService {
  getValidatorInfo(params?: {
    date: string;
    defaultUnl: Lib.RippleData.DefaultUnlRawResponse;
  }): Promise<Cache.IDataCache<Cache.MergedData>>;
  getValidatorSummary();
  getGeoInfo(): Promise<Cache.IDataCache<Lib.IPStackResponse>>;
}

export interface IGoogleService {
  getReferrals(): Promise<Cache.IDataCache<Lib.Google.IApiResponse>>;
}

export interface IGitHubService {
  getDefaultUnlArchives(): Promise<
    Cache.IDataCache<Lib.GitHub.IRepositoryContentResponse>
  >;
  startFetchDefaultUnl(date: string): void;
  getDefaultUnl(
    date: string
  ): Promise<Cache.IDataCache<Lib.RippleData.DefaultUnlRawResponse>>;
  getLastDefaultUnlDate(): Promise<string>;
}

export interface ICrypto {
  parseDefaultUNLResponse: (
    defaultUNLResponse: Lib.RippleData.DefaultUnlRawResponse
  ) => string[];
}

export namespace Lib {
  export type IPStackResponse = {
    domain?: string;
    ip: string;
    country_code: string;
    country_name: string;
    region_name: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  export namespace RippleData {
    export type DefaultUnlRawResponse = {
      blob: string;
    };
    export type ValidatorRawResponse = {
      domain: string;
      domain_state: string;
      validation_public_key: string;
      last_datetime: string;
    };
    export type DailyReportRawResponse = {
      validation_public_key: string;
      date: string;
      total_ledgers: number;
      main_net_agreement: string;
      main_net_ledgers: number;
      alt_net_agreement: string;
      alt_net_ledgers: number;
      other_ledgers: number;
      domain: string;
      domain_state: string;
      last_datetime: string;
      is_report_available: boolean;
    };
  }
  export interface ILogger extends Logger {}
  export namespace Koa {
    export interface IServer extends Koa {}
    export interface IRouter extends Router {}
  }
  export namespace GitHub {
    export interface IApi extends Octokit {}
    export interface IRepositoryContentResponse {
      name: string;
      url: string;
      date: string;
    }
  }
  export namespace Google {
    export type JwtJson = {
      web: {
        client_id: string;
        project_id: string;
        auth_uri: string;
        token_uri: string;
        auth_provider_x509_cert_url: string;
        client_secret: string;
      };
    };
    export interface IApi extends analyticsreporting_v4.Analyticsreporting {}
    export interface IApiResponse {
      fullReferral: string;
      domain: string;
      views: string;
      url: string;
      title: string;
    }
    [];
  }
}
