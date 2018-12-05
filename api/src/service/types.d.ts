declare namespace service {
  export interface IDefaultUnlService {
    getDefaultUnl: () => Promise<RippleDataApi.DefaultUnlResponse>;
    getDefaultUnlByUrl: (
      url: string
    ) => Promise<RippleDataApi.DefaultUnlResponse>;
  }

  export interface IGeoService {
    getGeoData: (domainOrIp: string) => Promise<Geo.GeoResponseData>;
    getIpFromDomain: (domain: string) => Promise<string>;
  }

  export interface IRippleDataService {
    getValidators: () => Promise<RippleDataApi.GetValidatorsResponse>;
    getValidatorDailyReports: () => Promise<
      RippleDataApi.GetDailyReportResponse
    >;
  }

  export interface IGitHubService {
    getDefaultUnlArchives: () => Promise<
      GitHubService.RepositoryContentResponse
    >;
  }

  export interface IGoogleAnalyticsService {
    getReferrals: () => Promise<GitHubService.RepositoryContentResponse>;
  }

  /**
   * Ripple Data API Response
   */
  export namespace RippleDataApi {
    export type DefaultUnlResponseData = {
      blob: string;
    };
    export type DefaultUnlResponse = DefaultUnlResponseData;

    export type GetValidatorsResponseData = {
      validation_public_key: string;
      domain: string;
      chain: "main" | "alt";
      current_index: number;
      agreement_1h: {
        missed: number;
        total: number;
        score: string;
        incomplete: boolean;
      };
      agreement_24h: {
        missed: number;
        total: number;
        score: string;
        incomplete: boolean;
      };
      partial: boolean;
      unl: boolean;
    };
    export type GetValidatorsResponse = GetValidatorsResponseData[];

    export type GetDailyReportResponseData = {
      validation_public_key: string;
      date: string;
      chain: "main" | "test";
      score: string;
      total: string;
      missed: string;
    };
    export type GetDailyReportResponse = GetDailyReportResponseData[];
  }
  /**
   * GitHub client (Octokit) Response
   */
  export namespace GitHubService {
    export type RepositoryContentResponseData = {
      name: string;
      url: string;
      date: string;
    };
    export type RepositoryContentResponse = RepositoryContentResponseData[];
  }
  /**
   * Node DNS Lookup Response
   */
  export namespace DnsLookup {
    export type ResolveDnsResponse = {
      domain: string;
      ip: string;
    };
  }
  /**
   * IP Stack API Response
   */
  export namespace Geo {
    export type GeoResponseData = {
      domain?: string;
      ip: string;
      country_code: string;
      country_name: string;
      region_name: string;
      city: string;
      latitude: number;
      longitude: number;
    };
    export type GeoResponse = GeoResponseData[];
  }
}
