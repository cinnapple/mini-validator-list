import {
  IQueryItem,
  IStackBarChartOptions,
  SupportedCharts,
  ISelectedValue,
  ITableChartOptions
} from "../../../types";

import dayjs from "dayjs";

const defaultUnlDominanceMovementQuery: IQueryItem<IStackBarChartOptions> = {
  title: "Default UNL Dominance Movement",
  type: SupportedCharts.StackedBar,
  query: {
    measures: ["Vw_UnlValidatorHistory.count"],
    dimensions: [
      "Vw_UnlValidatorHistory.domainCategory",
      "Vw_UnlValidatorHistory.originalAsOfDate"
    ],
    timeDimensions: [
      {
        dimension: "Vw_UnlValidatorHistory.asOfDate",
        granularity: "month"
      }
    ]
  },
  options: { props: {} },
  drilldown: opt => [drilldown(opt)]
};

const drilldown = (
  opt: ISelectedValue
): IQueryItem<ITableChartOptions<any>> => ({
  title: `Default UNL as of ${dayjs(
    opt.selected["Vw_UnlValidatorHistory.originalAsOfDate"]
  ).format(`MMMM DD, YYYY`)}`,
  type: SupportedCharts.Table,
  query: {
    measures: ["Vw_UnlValidatorHistory.count"],
    dimensions: ["Vw_UnlValidatorHistory.domain"],
    filters: [
      {
        dimension: "Vw_UnlValidatorHistory.originalAsOfDate",
        operator: "equals",
        values: [opt.selected["Vw_UnlValidatorHistory.originalAsOfDate"]]
      }
    ]
  },
  options: {
    props: {
      rowKey: "Vw_UnlValidatorHistory.domain",
      columns: [
        {
          title: "Domain",
          dataIndex: "Vw_UnlValidatorHistory.domain",
          key: "1"
        },
        {
          title: "Count",
          dataIndex: "Vw_UnlValidatorHistory.count",
          key: "2"
        }
      ]
    },
    buildStats: (data: any[]) => {
      let rippleCount = 0;
      let nonRippleCount = 0;
      let total = 0;
      data.forEach(c => {
        const count = parseInt(c["Vw_UnlValidatorHistory.count"]);
        if (c["Vw_UnlValidatorHistory.domain"] === "ripple.com") {
          rippleCount += count;
        } else {
          nonRippleCount += count;
        }
        total += count;
      });
      const rippleRate = rippleCount / total;
      const nonRippleRate = nonRippleCount / total;
      return [
        {
          title: "Ripple",
          value: rippleCount,
          suffix: `(${(rippleRate * 100).toFixed(0)}%)`
        },
        {
          title: "Non-Ripple",
          value: nonRippleCount,
          suffix: `(${(nonRippleRate * 100).toFixed(0)}%)`
        }
      ];
    }
  }
});

export { defaultUnlDominanceMovementQuery };
