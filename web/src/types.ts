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

export interface IQueryItem {
  title: string;
  query: any;
  type: SupportedCharts;
  options?: any;
  drilldown?: (opt: { selected: any }) => IQueryItem;
}

export type QueryList = IQueryItem[][];

export interface IChartPropBase {
  resultSet: any;
  query: any;
  size: Sizes;
  onDrilldown?: (opt: any) => void;
}
