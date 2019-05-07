import { TableProps, ColumnProps } from "antd/lib/table";
import { ChartProps } from "bizcharts";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type HashTable<T> = { [key: string]: T };

export enum SupportedCharts {
  Donut = "Donut",
  StackedBar = "StackedBar",
  HorizontalStackedBar = "HorizontalStackedBar",
  Table = "Table",
  Map = "Map",
  DomainProfile = "ValidatorProfile",
  ValidationScore = "ValidationScore",
  Scoreboard = "Scoreboard"
}

export type SupportedPivotTypes = "chart" | "table";

export interface ICubePivotConfig {
  x?: string[];
  y?: string[];
  fillMissingDates?: boolean;
}

export enum Sizes {
  Default = "Default",
  Desktop = "Desktop",
  Tablet = "Tablet",
  Mobile = "Mobile"
}

// cube.js
export interface ICubeQuery {
  measures?: string[];
  dimensions?: string[];
  timeDimensions?: ICubeTimeDimension[];
  filters?: ICubeFilter[];
  limit?: number;
  order?: HashTable<"asc" | "desc">;
  timezone?: string;
}

export interface ICubeTimeDimension {
  dimension: string;
  dateRange?: string[];
  granularity?: string;
}

export interface ICubeFilter {
  dimension: string;
  operator:
    | "equals"
    | "notEquals"
    | "contains"
    | "notContains"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "set"
    | "notSet"
    | "inDateRange"
    | "notInDateRange"
    | "beforeDate"
    | "afterDate";
  values: string[];
}

export interface IMapProps {
  domainField: string;
  latitudeField: string;
  longitudeField: string;
  cityField: string;
}

export interface IProfileProps {
  nameField: string;
  domainField: string;
  twitterField: string;
  descriptionField: string;
  iconField: string;
}

export interface IValidatorScoreProps {
  dateField: string;
  dayOfWeekField: string;
  statsField: string;
  monthOfYearField: string;
}

export interface IScoreboardProps extends IValidatorScoreProps {
  validationPublicKeyField: string;
  domainField: string;
}

// chart options
export interface IChartOptionsBase {}

export interface IDonutChartOptions extends IChartOptionsBase {
  props: IExtendedChartProps;
  titleField: string;
  supportText: [string, string];
}

export interface IStackBarChartOptions extends IChartOptionsBase {
  props: IExtendedChartProps;
}

export interface IHorizontalStackBarChartOptions extends IChartOptionsBase {
  props: IExtendedChartProps;
  titleField?: string;
  supportText?: [string, string];
}

export interface IExtendedChartProps extends Omit<ChartProps, "height"> {
  height?: number;
}

export interface ITableChartOptions<T> extends IChartOptionsBase {
  props: IExtendedTableProps<T>;
  defaultFilteredInfo?: any;
  buildStats: (data: T[]) => IStatsOptions[];
}

export interface IWorldMapOptions extends IChartOptionsBase {
  props: IMapProps;
}

export interface IProfileChartOptions extends IChartOptionsBase {
  props: IProfileProps;
}

export interface IValidatorScoreOptions extends IChartOptionsBase {
  props: IValidatorScoreProps;
}

export interface IScoreboardOptions extends IChartOptionsBase {
  props: IScoreboardProps;
}

export interface IExtendedTableProps<T> extends Omit<TableProps<T>, "columns"> {
  columns: IExtendedColumnProps<T>[];
}

export interface IExtendedColumnProps<T> extends ColumnProps<T> {
  enableFilter?: boolean;
  type?: "shortdate" | "key" | "domain" | "agreement" | "score";
  domainRenderOptions?: {
    textField: string;
    relativeHoursField: string;
  };
  format?: string;
}

export interface IStatsOptions extends IChartOptionsBase {
  title: string;
  value: number | string;
  suffix?: string;
}

export interface IChartPropBase<T extends IChartOptionsBase> {
  dataSet: any;
  size: Sizes;
  onDrilldown?: (opt: any) => void;
  queryItem: IQueryItem<T>;
}

export interface ISelectedValue {
  selected: any;
}

export interface IQueryItem<T extends IChartOptionsBase> {
  title: string;
  type: SupportedCharts;
  pivotType?: SupportedPivotTypes;
  pivotConfig?: ICubePivotConfig;
  query: ICubeQuery;
  bordered?: boolean;
  options: T;
  drilldown?: (opt: ISelectedValue) => QueryList<IChartOptionsBase>;
}

export type QueryList<T extends IChartOptionsBase> = IQueryItem<T>[];
