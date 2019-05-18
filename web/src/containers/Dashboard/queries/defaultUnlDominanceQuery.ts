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
  pivotType: "chart",
  query: {
    measures: ["Vw_ValidatorDetails.count"],
    dimensions: ["Vw_ValidatorDetails.ripple"],
    filters: [
      {
        dimension: "Vw_ValidatorDetails.chain",
        operator: "notEquals",
        values: ["altnet"]
      },
      {
        dimension: "Vw_ValidatorDetails.unl",
        operator: "equals",
        values: ["Yes"]
      }
    ]
  },
  options: {
    props: {},
    titleField: "Non-Ripple",
    supportText: ["non-ripple", "validators"]
  },
  drilldown: opt => [[drilldown(opt)]]
};

const drilldown = (
  opt: ISelectedValue
): IQueryItem<ITableChartOptions<any>> => ({
  title: `${opt.selected.category} validators in Default UNL`,
  type: SupportedCharts.Table,
  query: {
    dimensions: ["Vw_ValidatorDetails.domain"],
    filters: [
      {
        dimension: "Vw_ValidatorDetails.chain",
        operator: "notEquals",
        values: ["altnet"]
      },
      {
        dimension: "Vw_ValidatorDetails.unl",
        operator: "equals",
        values: ["Yes"]
      },
      {
        dimension: "Vw_ValidatorDetails.ripple",
        operator: "equals",
        values: [opt.selected.category]
      }
    ]
  },
  options: {
    props: {
      rowKey: "Vw_ValidatorDetails.validation_public_key",
      columns: [
        {
          title: "Domain",
          dataIndex: "Vw_ValidatorDetails.domain",
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
