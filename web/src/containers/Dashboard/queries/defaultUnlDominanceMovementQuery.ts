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
    measures: ["UnlHistory.count"],
    dimensions: ["UnlHistory.domainCategory", "UnlHistory.originalAsOfDate"],
    timeDimensions: [
      {
        dimension: "UnlHistory.asOfDate",
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
    opt.selected["UnlHistory.originalAsOfDate"]
  ).format(`MMMM DD, YYYY`)}`,
  type: SupportedCharts.Table,
  query: {
    measures: ["UnlHistory.count"],
    dimensions: ["UnlHistory.domain"],
    filters: [
      {
        dimension: "UnlHistory.originalAsOfDate",
        operator: "equals",
        values: [opt.selected["UnlHistory.originalAsOfDate"]]
      }
    ]
  },
  options: {
    props: {
      rowKey: "UnlHistory.domain",
      columns: [
        {
          title: "Domain",
          dataIndex: "UnlHistory.domain",
          key: "1"
        },
        {
          title: "Count",
          dataIndex: "UnlHistory.count",
          key: "2"
        }
      ]
    },
    buildStats: (data: any[]) => {
      let rippleCount = 0;
      let nonRippleCount = 0;
      let total = 0;
      data.forEach(c => {
        const count = parseInt(c["UnlHistory.count"]);
        if (c["UnlHistory.domain"] === "ripple.com") {
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
