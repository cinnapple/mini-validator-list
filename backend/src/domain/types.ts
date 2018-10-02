import { Service } from "../service/types";

export namespace Models {
  export type DailyReports = Service.RippleDataApi.GetDailyReportResponseData;
  export type DefaultUnl = {
    blob: string;
  };
  export type DefaultUnlArchiveEntry = Service.GitHubService.RepositoryContentResponseData;
  export type DomainGeo = Service.Geo.GeoResponseData;
  export type Stats = {};
  export type Validator = Service.RippleDataApi.GetValidatorsResponseData;
  export type ValidatorSummary = {
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
    last_datetime: string;
  };
  export type DefaultUnlMovementStats = {
    ripple: number;
    nonRipple: number;
    date: string;
  };
}

export namespace Domains {
  export interface IValidators {
    getValidators: () => Promise<Models.Validator[]>;
    getValidatorSummary: (
      _date: string,
      defaultUnl: Models.DefaultUnl,
      dailyReports: Models.DailyReports[],
      allValidators: Models.Validator[],
      domainGeoList: Models.DomainGeo[]
    ) => Promise<Models.ValidatorSummary[]>;
  }
  export interface IDefaultUnl {
    getDefaultUnl: (
      date?: string,
      archives?: Models.DefaultUnlArchiveEntry[]
    ) => Promise<Models.DefaultUnl>;
    getDefaultUnlArchives: () => Promise<Models.DefaultUnlArchiveEntry[]>;
    getDefaultUnlStats: (
      archives: Models.DefaultUnlArchiveEntry[],
      validatorSummary: Models.ValidatorSummary[]
    ) => Promise<Models.DefaultUnlMovementStats[]>;
  }
  export interface IGeo {
    getDomainGeoList: (
      validators: Models.Validator[]
    ) => Promise<Models.DomainGeo[]>;
  }
  export interface IStats {
    getSummary: (
      validatorList: Models.ValidatorSummary[]
    ) => Promise<Models.Stats>;
    getDailyReports: () => Promise<Models.DailyReports[]>;
  }
}
