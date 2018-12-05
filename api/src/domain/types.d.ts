declare namespace domain {
  export type DailyReports = service.RippleDataApi.GetDailyReportResponseData;
  export type DefaultUnl = {
    blob: string;
  };
  export type DefaultUnlArchiveEntry = service.GitHubService.RepositoryContentResponseData;
  export type DomainGeo = service.Geo.GeoResponseData;
  export type Stats = {};
  export type Validator = service.RippleDataApi.GetValidatorsResponseData;
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

  export interface IValidators {
    getValidators: () => Promise<domain.Validator[]>;
    getValidatorSummary: (
      _date: string,
      defaultUnl: domain.DefaultUnl,
      dailyReports: domain.DailyReports[],
      allValidators: domain.Validator[],
      domainGeoList: domain.DomainGeo[]
    ) => Promise<domain.ValidatorSummary[]>;
  }
  export interface IDefaultUnl {
    getDefaultUnl: (
      date?: string,
      archives?: domain.DefaultUnlArchiveEntry[]
    ) => Promise<domain.DefaultUnl>;
    getDefaultUnlArchives: () => Promise<domain.DefaultUnlArchiveEntry[]>;
    getDefaultUnlStats: (
      archives: domain.DefaultUnlArchiveEntry[],
      validatorSummary: domain.ValidatorSummary[]
    ) => Promise<domain.DefaultUnlMovementStats[]>;
  }
  export interface IGeo {
    getDomainGeoList: (
      validators: domain.Validator[]
    ) => Promise<domain.DomainGeo[]>;
  }
  export interface IStats {
    getSummary: (
      validatorList: domain.ValidatorSummary[]
    ) => Promise<domain.Stats>;
    getDailyReports: () => Promise<domain.DailyReports[]>;
  }
}
