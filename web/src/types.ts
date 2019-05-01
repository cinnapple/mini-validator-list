import { TableProps, ColumnProps } from "antd/lib/table";
import { ChartProps } from "bizcharts";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type HashTable<T> = { [key: string]: T };

export enum SupportedCharts {
  Donut = "Donut",
  StackedBar = "StackedBar",
  HorizontalStackedBar = "HorizontalStackedBar",
  Table = "Table",
  Map = "Map"
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
  timeDimensions?: [
    {
      dimension: string;
      granularity: string;
    }
  ];
  filters?: ICubeFilter[];
  limit?: number;
  order?: HashTable<"asc" | "desc">;
  timezone?: string;
}

export interface ICubeFilter {
  dimension: string;
  operator: string;
  values: string[];
}

export interface IMapProps {}

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

export interface IExtendedTableProps<T> extends Omit<TableProps<T>, "columns"> {
  columns: ExtendedColumnProps<T>[];
}

export interface ExtendedColumnProps<T> extends ColumnProps<T> {
  enableFilter?: boolean;
  type?: "shortdate" | "key";
  format?: string;
}

export interface IStatsOptions extends IChartOptionsBase {
  title: string;
  value: number | string;
  suffix?: string;
}

export interface IChartPropBase<T extends IChartOptionsBase> {
  resultSet: any;
  query: any;
  size: Sizes;
  options: T;
  onDrilldown?: (opt: any) => void;
}

export type QueryList<T extends IChartOptionsBase> = IQueryItem<T, any>[];

export interface IQueryItem<
  T extends IChartOptionsBase,
  S extends IChartOptionsBase = any
> {
  title: string;
  type: SupportedCharts;
  query: ICubeQuery;
  options: T;
  drilldown?: (opt: { selected: any }) => IQueryItem<S>;
}
