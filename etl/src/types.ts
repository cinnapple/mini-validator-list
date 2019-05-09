import { AxiosRequestConfig } from "axios";

export type HashTable<T> = { [key: string]: T };

export interface IConfig {
  connectionString: string;
  githubToken: string;
  ipstackToken: string;
  redisUrl: string;
  jobs: IJobConfig[];
}

export interface IJobConfig {
  name: string;
  cron?: string;
  spawn?: boolean;
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
  get: <T extends IDbTable>(stmt: string) => Promise<T[]>;
  refreshMaterializedView: (viewNames: string[]) => Promise<void>;
}

export interface IRippleDataApi {
  getNetworkValidators: () => Promise<IGetValidatorsResponse[]>;
  getValidatorReports: (
    pubkey: string
  ) => Promise<IGetValidatorReportReponse[]>;
  getManifests: (pubkey: string) => Promise<IGetValidatorManifestsReponse[]>;
  getTopologyNodes: () => Promise<IGetTopologyNodesResponse[]>;
}

export interface IRippleLibApiConfig {
  maxConnections: number;
  handleValidation?: (item: RealtimeValidationData) => void;
  handleLedger?: (item: RealtimeLedgerData) => void;
}

export interface IRippleLibApi {
  subscribe: (config: IRippleLibApiConfig) => Promise<void>;
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

export interface IGetValidatorReportReponse {
  validation_public_key: string;
  date: string;
  chain: string;
  score: string;
  total: string;
  missed: string;
}

export interface IGetValidatorManifestsReponse {
  count: number;
  ephemeral_public_key: string;
  first_datetime: string;
  last_datetime: string;
  master_public_key: string;
  master_signature: string;
  sequence: string;
  signature: string;
}

export interface IGetTopologyNodesResponse {
  node_public_key: string;
  ip?: string;
  port?: number;
  version: string;
  uptime: number;
  inbound_count: number;
  outbound_count: number;
}

export interface IWebClient {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

export interface IGithubApi {
  getRippleUnlList: () => Promise<any>;
  getDomainIconList: () => Promise<any>;
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

export interface ILedgerEventArg {
  baseFeeXRP: string; // e.g. "0.00001";
  ledgerHash: string; // e.g. "27FEF1A12C4BFB8B0B70C85A196BC75C27E312460D23F7F2B7707C14B4649AC5";
  ledgerVersion: number; // e.g. 47508326;
  ledgerTimestamp: string; // e.g. "2019-05-25T20:05:42.000Z";
  reserveBaseXRP: string; // e.g. "20";
  reserveIncrementXRP: string; // e.g. "5";
  transactionCount: number; // e.g. 33;
  validatedLedgerVersions: string; // e.g. "47472353-47508326";
}

export interface IValidationEventArg {
  flags: number; // e.g. 2147483649;
  full: boolean; // e.g. true;
  ledger_hash: string; //e.g. '8AA9576962C61E4A6FAEB982189B6D8D9C78389422A552166ACEFA924D45DA50',
  ledger_index: string; // e.g. '19682531',
  signature: string; // e.g.'304402200A6B2FFB4483C5912C444F2B07BE485B765CD6C943C9AD7F53A61B3C530799D002201B6DF02BE3C799FD1D074C773D5312365984BBDC88E5942E618A7BB4CA7D9806',
  signing_time: number; // e.g. 612132986,
  type: string; // e.g. 'validationReceived',
  validation_public_key: string; // e.g. 'n944nVL4GHUBpZWUn2XaQXYT92b42BYHpwAisiCqvL159tEmWY46' }
}

export interface RealtimeLedgerData extends ILedgerEventArg {
  validation_public_key: string;
  domain: string;
  elapsedSeconds: number;
}

export interface RealtimeValidationData extends IValidationEventArg {
  validation_public_key: string;
  domain: string;
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

export interface IDbValidationReport extends IDbTable {
  validation_public_key: string;
  date: Date;
  chain: string;
  score: number;
  total: number;
  missed: number;
}

export interface IDbManifests extends IDbTable {
  count: number;
  ephemeral_public_key: string;
  first_datetime: Date;
  last_datetime: Date;
  master_public_key: string;
  master_signature: string;
  sequence: number;
  signature: string;
}

export interface IDbDomainKeyMapSchema extends IDbTable {
  validation_public_key: string;
  domain: string;
}
