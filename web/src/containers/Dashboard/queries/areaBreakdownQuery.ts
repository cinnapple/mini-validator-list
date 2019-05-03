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
      "GeoLocation.count",
      "GeoLocation.unlSum",
      "GeoLocation.notUnlButVerifiedSum"
    ],
    dimensions: ["GeoLocation.countryName"],
    filters: [
      {
        // exclude test net
        dimension: "MainNetValidators.chain",
        operator: "notEquals",
        values: ["altnet"]
      }
    ],
    order: {
      "GeoLocation.count": "desc",
      "GeoLocation.countryName": "asc"
    }
  },
  options: { props: {} },
  drilldown: opt => [drilldown(opt)]
};

const drilldown = (
  opt: ISelectedValue
): IQueryItem<ITableChartOptions<any>> => ({
  title: `Validators in ${opt.selected["GeoLocation.countryName"]}`,
  type: SupportedCharts.Table,
  query: {
    dimensions: [
      "GeoLocation.domain",
      "MainNetValidators.validation_public_key",
      "MainNetValidators.unl",
      "MainNetValidators.ripple",
      "MainNetValidators.unlHost"
    ],
    filters: [
      {
        dimension: "GeoLocation.countryName",
        operator: "equals",
        values: [opt.selected["GeoLocation.countryName"]]
      },
      {
        // exclude test net
        dimension: "MainNetValidators.chain",
        operator: "notEquals",
        values: ["altnet"]
      }
    ]
  },
  options: {
    props: {
      rowKey: "MainNetValidators.validation_public_key",
      columns: [
        {
          title: "Domain",
          dataIndex: "GeoLocation.domain",
          key: "1"
        },
        {
          title: "UNL?",
          dataIndex: "MainNetValidators.unl",
          key: "2"
        },
        {
          title: "Key",
          dataIndex: "MainNetValidators.validation_public_key",
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
        defaultUnl +=
          c["MainNetValidators.unlHost"] === "vl.ripple.com" ? 1 : 0;
        ripple += c["MainNetValidators.ripple"] === "Ripple" ? 1 : 0;
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
