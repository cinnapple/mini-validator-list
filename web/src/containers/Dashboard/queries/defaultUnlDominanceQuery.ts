import {
  IQueryItem,
  IDonutChartOptions,
  SupportedCharts,
  ISelectedValue,
  ITableChartOptions
} from "../../../types";

const defaultUnlDominanceQuery: IQueryItem<IDonutChartOptions> = {
  title: "Default UNL Dominance",
  type: SupportedCharts.Donut,
  chartTransformOption: "chartPivot",
  query: {
    measures: ["UnlValidators.count"],
    dimensions: ["UnlValidators.ripple"]
  },
  options: {
    props: {},
    titleField: "Non-Ripple",
    supportText: ["non-ripple", "validators"]
  },
  drilldown: opt => [drilldown(opt)]
};

const drilldown = (
  opt: ISelectedValue
): IQueryItem<ITableChartOptions<any>> => ({
  title: `${opt.selected.category} validators in Default UNL`,
  type: SupportedCharts.Table,
  query: {
    dimensions: ["UnlValidators.domain"],
    filters: [
      {
        dimension: "UnlValidators.ripple",
        operator: "equals",
        values: [opt.selected.category]
      }
    ]
  },
  options: {
    props: {
      rowKey: "UnlValidators.validation_public_key",
      columns: [
        {
          title: "Domain",
          dataIndex: "UnlValidators.domain",
          key: "1"
        }
      ]
    },
    buildStats: (data: any[]) => {
      return [
        {
          title: `${opt.selected.category} #`,
          value: data.length,
          suffix: `(${(opt.selected.percent * 100).toFixed(0)}%)`
        }
      ];
    }
  }
});

export { defaultUnlDominanceQuery };
