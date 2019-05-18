import {
  SupportedCharts,
  IQueryItem,
  IHorizontalStackBarChartOptions,
  ISelectedValue,
  ITableChartOptions
} from "../../../types";

const areaBreakdownQuery: IQueryItem<IHorizontalStackBarChartOptions> = {
  title: "Breakdown by Country",
  type: SupportedCharts.HorizontalStackedBar,
  query: {
    measures: [
      "Vw_ValidatorDetails.count",
      "Vw_ValidatorDetails.unlSum",
      "Vw_ValidatorDetails.notUnlButVerifiedSum"
    ],
    dimensions: ["Vw_ValidatorDetails.countryName"],
    filters: [
      {
        // exclude test net
        dimension: "Vw_ValidatorDetails.chain",
        operator: "notEquals",
        values: ["altnet"]
      }
    ],
    order: {
      "Vw_ValidatorDetails.count": "desc",
      "Vw_ValidatorDetails.countryName": "asc"
    }
  },
  options: { props: {} },
  drilldown: opt => [[drilldown(opt)]]
};

const drilldown = (
  opt: ISelectedValue
): IQueryItem<ITableChartOptions<any>> => ({
  title: `Validators in ${opt.selected["Vw_ValidatorDetails.countryName"]}`,
  type: SupportedCharts.Table,
  query: {
    dimensions: [
      "Vw_ValidatorDetails.domain",
      "Vw_ValidatorDetails.validation_public_key",
      "Vw_ValidatorDetails.unl",
      "Vw_ValidatorDetails.ripple",
      "Vw_ValidatorDetails.hosts"
    ],
    filters: [
      {
        dimension: "Vw_ValidatorDetails.countryName",
        operator: "equals",
        values: [opt.selected["Vw_ValidatorDetails.countryName"]]
      },
      {
        // exclude test net
        dimension: "Vw_ValidatorDetails.chain",
        operator: "notEquals",
        values: ["altnet"]
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
        },
        {
          title: "UNL?",
          dataIndex: "Vw_ValidatorDetails.unl",
          key: "2"
        },
        {
          title: "Key",
          dataIndex: "Vw_ValidatorDetails.validation_public_key",
          key: "3",
          type: "key"
        }
      ]
    },
    buildStats: (data: any[]) => {
      const total = data.length;
      let defaultUnl = 0;
      let ripple = 0;
      data.forEach(c => {
        defaultUnl += (c["Vw_ValidatorDetails.hosts"] || "").includes(
          "vl.ripple.com"
        )
          ? 1
          : 0;
        ripple += c["Vw_ValidatorDetails.ripple"] === "Ripple" ? 1 : 0;
      });
      const defaultUnlRate = total === 0 ? 0 : defaultUnl / total;
      const dominance = total === 0 ? 0 : ripple / total;
      return [
        {
          title: "Total",
          value: total
        },
        {
          title: "In Default UNL",
          value: defaultUnl,
          suffix: `(${(defaultUnlRate * 100).toFixed(0)}%)`
        },
        {
          title: "Ripple",
          value: ripple,
          suffix: `(${(dominance * 100).toFixed(0)}%)`
        }
      ];
    }
  }
});

export { areaBreakdownQuery };
