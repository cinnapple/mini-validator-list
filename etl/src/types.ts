export type HashTable<T> = { [key: string]: T };

export interface IConfig {
  connectionString: string;
  githubToken: string;
  ipstackToken: string;
  jobs: IJobConfig[];
}

export interface IJobConfig {
  name: string;
  cron: string;
  runImmediate: boolean;
  args?: HashTable<any>;
}

export interface IJob {
  execute: (ctx?: JobContext) => Promise<void>;
}

export type JobContext = {
  start: Date;
  args: HashTable<any>;
};

export interface IStore {
  insert: (table: string, data: any) => Promise<void>;
  upsert: (
    table: string,
    data: any,
    constraintKey: string,
    skipUpdateCols: string[]
  ) => Promise<void>;
}

export interface IRippleDataApi {
  getNetworkValidators: () => Promise<IGetValidatorsResponse[]>;
}

export interface IGetValidatorsResponse {
  validation_public_key: string;
  domain: string;
  chain: string;
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
}

export interface IWebClient {
  get<T>(url: string): Promise<T>;
}

export interface IGithubApi {
  getRippleUnlList: () => Promise<any>;
}

export interface IGeoLocationApi {
  tryGetGeoData(domain: string): Promise<IIPStackResponse>;
}

export interface IIPStackResponse {
  ip: string;
  continent_code: string;
  continent_name: string;
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  latitude: number;
  longitude: number;
}

export interface IHistoryFetchStrategyFactory {
  create(host: string): IHistoryFetchStrategy;
}

export interface IUnlHistory {
  id: string;
  url: string;
  date: Date;
}

export interface IHistoryFetchStrategy {
  getList(): Promise<IUnlHistory[]>;
}

export interface IDbTable {
  last_updated: Date;
  created: Date;
}

export interface IDbGeoLocationSchema extends IDbTable {
  domain: string;
  continent_name: string;
  continent_code: string;
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  latitude: number;
  longitude: number;
}

export interface IDbUnlSnapshotSchema extends IDbTable {
  validator_public_key: string;
  host: string;
}

export interface IDbValidatorSchema extends IDbTable {
  validation_public_key: string;
  domain: string;
  chain: string;
  current_index: number;
  agreement_1h_missed: number;
  agreement_1h_total: number;
  agreement_1h_score: number;
  agreement_1h_incomplete: boolean;
  agreement_24h_missed: number;
  agreement_24h_total: number;
  agreement_24h_score: number;
  agreement_24h_incomplete: boolean;
  partial: boolean;
  unl: boolean;
}

export interface IDbDomainKeyMapSchema extends IDbTable {
  validation_public_key: string;
  domain: string;
}
