export interface IDefaultUnlService {
  getDefaultUnl: () => Promise<
    Service.RippleDataApi.DefaultUnlResponse
  >;
  getDefaultUnlByUrl: (
    url: string
  ) => Promise<Service.RippleDataApi.DefaultUnlResponse>;
}

export interface IGeoService {
  getGeoData: (
    domainOrIp: string
  ) => Promise<Service.Geo.GeoResponseData>;
  getIpFromDomain: (domain: string) => Promise<string>;
}

export interface IRippleDataService {
  getValidators: () => Promise<
    Service.RippleDataApi.GetValidatorsResponse
  >;
  getValidatorDailyReports: () => Promise<
    Service.RippleDataApi.GetDailyReportResponse
  >;
}

export interface IGitHubService {
  getDefaultUnlArchives: () => Promise<
    Service.GitHubService.RepositoryContentResponse
  >;
}

export namespace Service {
  /**
   * Ripple Data API Response
   */
  export namespace RippleDataApi {
    export type DefaultUnlResponseData = {
      blob: string;
    };
    export type DefaultUnlResponse = DefaultUnlResponseData;

    export type GetValidatorsResponseData = {
      domain: string;
      domain_state: string;
      validation_public_key: string;
      last_datetime: string;
    };
    export type GetValidatorsResponse = GetValidatorsResponseData[];

    export type GetDailyReportResponseData = {
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
