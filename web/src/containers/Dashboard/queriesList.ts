import {
  SupportedCharts,
  IDonutChartOptions,
  ITableChartOptions,
  IQueryItem,
  IStackBarChartOptions,
  IWorldMapOptions,
  IHorizontalStackBarChartOptions
} from "../../types";
import dayjs from "dayjs";
import { insertIf } from "../../helpers/util";

const verifiedValidatorQuery: IQueryItem<
  IDonutChartOptions,
  ITableChartOptions<any>
> = {
  title: "Verified Validators",
  type: SupportedCharts.Donut,
  query: {
    measures: ["MainNetValidators.count"],
    dimensions: ["MainNetValidators.verified"]
  },
  options: {
    props: {},
    titleField: "Verified",
    supportText: ["verified", "validators"]
  },
  drilldown: opt => ({
    title: `${opt.selected.category} validators`,
    query: {
      dimensions: [
        "MainNetValidators.validation_public_key",
        "MainNetValidators.unl",
        "MainNetValidators.domain"
      ],
      filters: [
        {
          dimension: "MainNetValidators.verified",
          operator: "equals",
          values: [opt.selected.category]
        }
      ]
    },
    type: SupportedCharts.Table,
    options: {
      props: {
        rowKey: "MainNetValidators.validation_public_key",
        scroll: { x: 400 },
        columns: [
          ...insertIf(
            opt.selected.category === "Verified",
            [
              {
                title: "Domain",
                dataIndex: "MainNetValidators.domain",
                key: "1"
              }
            ],
            [
              {
                title: "Key",
                dataIndex: "MainNetValidators.validation_public_key",
                key: "1"
              }
            ]
          ),
          ...insertIf(opt.selected.category === "Verified", [
            {
              title: "Default UNL?",
              dataIndex: "MainNetValidators.unl",
              key: "2"
            }
          ])
        ]
      },
      buildStats: (data: any[]) => {
        return [
          {
            title: `${opt.selected.category} validators`,
            value: data.length,
            suffix: `(${(opt.selected.percent * 100).toFixed(0)}%)`
          }
        ];
      }
    }
  })
};

const defaultUnlDominanceQuery: IQueryItem<
  IDonutChartOptions,
  ITableChartOptions<any>
> = {
  title: "Default UNL Dominance",
  type: SupportedCharts.Donut,
  query: {
    measures: ["UnlValidators.count"],
    dimensions: ["UnlValidators.ripple"]
  },
  options: {
    props: {},
    titleField: "Non-Ripple",
    supportText: ["non-ripple", "validators"]
  },
  drilldown: opt => ({
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
  })
};

const defaultUnlDominanceMovementQuery: IQueryItem<
  IStackBarChartOptions,
  ITableChartOptions<any>
> = {
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
  drilldown: opt => ({
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
  })
};

const unlOperatorMapQuery: IQueryItem<
  IWorldMapOptions,
  ITableChartOptions<any>
> = {
  title: "UNL Operator Map",
  type: SupportedCharts.Map,
  query: {
    measures: [
      "GeoLocation.latitude",
      "GeoLocation.longitude",
      "GeoLocation.unlSum",
      "GeoLocation.altNetChainSum",
      "GeoLocation.validatorCount"
    ],
    dimensions: ["GeoLocation.domain", "GeoLocation.city"],
    filters: [
      {
        // exclude test net
        dimension: "GeoLocation.altNetChainSum",
        operator: "equals",
        values: ["0"]
      },
      {
        // exclude test net
        dimension: "MainNetValidators.chain",
        operator: "notEquals",
        values: ["altnet"]
      }
    ]
  },
  options: { props: {} }
};

const breakdownByCountryQuery: IQueryItem<
  IHorizontalStackBarChartOptions,
  ITableChartOptions<any>
> = {
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
  drilldown: opt => ({
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
  })
};

export default [
  [verifiedValidatorQuery, defaultUnlDominanceQuery],
  [defaultUnlDominanceMovementQuery],
  [unlOperatorMapQuery],
  [breakdownByCountryQuery]
];
