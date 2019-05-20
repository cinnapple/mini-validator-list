import {
  IQueryItem,
  IDonutChartOptions,
  SupportedCharts,
  ITableChartOptions,
  DataRow
} from "../../../types";

const defaultUnlDominanceQuery: IQueryItem<IDonutChartOptions> = {
  id: `default-unl-dominance`,
  title: "Default UNL Dominance",
  type: SupportedCharts.Donut,
  pivotType: "chart",
  queries: [
    {
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
    }
  ],
  options: {
    props: {},
    titleField: "Non-Ripple",
    supportText: ["non-ripple", "validators"]
  },
  drilldown: opt => [[drilldown(opt)]]
};

const drilldown = (selected: DataRow): IQueryItem<ITableChartOptions<any>> => ({
  id: `${selected}`,
  title: `${selected.category} validators in Default UNL`,
  type: SupportedCharts.Table,
  queries: [
    {
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
          values: [`${selected.category}`]
        }
      ]
    }
  ],
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
          title: `${selected.category} #`,
          value: data.length,
          suffix: `(${(parseFloat(selected.percent as string) * 100).toFixed(
            0
          )}%)`
        }
      ];
    }
  }
});

export { defaultUnlDominanceQuery };
