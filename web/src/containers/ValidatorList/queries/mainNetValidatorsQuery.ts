import {
  IQueryItem,
  ITableChartOptions,
  SupportedCharts
} from "../../../types";
import { drilldownProfileQuery } from "./drilldownProfileQuery";
import { drilldownDomainMapOperatorQuery } from "./drilldownDomainMapQuery";
import { drilldownValidatorScoreQuery } from "./drilldownValidationScoreQuery";

const mainNetValidatorListQuery: IQueryItem<ITableChartOptions<any>> = {
  title: "Main Net Validators",
  type: SupportedCharts.Table,
  bordered: false,
  query: {
    dimensions: [
      "ValidatorsWithGeo.domain",
      "ValidatorsWithGeo.chain",
      "ValidatorsWithGeo.ripple",
      "ValidatorsWithGeo.unlHost",
      "ValidatorsWithGeo.validation_public_key",
      "ValidatorsWithGeo.agreement24hScore",
      "ValidatorsWithGeo.lastUpdatedInHours",
      "ValidatorsWithGeo.countryName"
    ],
    filters: [
      {
        dimension: "ValidatorsWithGeo.chain",
        operator: "notEquals",
        values: ["altnet"]
      }
    ]
  },
  options: {
    props: {
      rowKey: "ValidatorsWithGeo.validation_public_key",
      scroll: { x: 1000 },
      columns: [
        {
          title: "Domain",
          dataIndex: "ValidatorsWithGeo.domain",
          key: "ValidatorsWithGeo.domain",
          enableFilter: true,
          type: "domain",
          domainRenderOptions: {
            textField: "ValidatorsWithGeo.validation_public_key",
            relativeHoursField: "ValidatorsWithGeo.lastUpdatedInHours"
          }
        },
        {
          title: "Location",
          dataIndex: "ValidatorsWithGeo.countryName",
          key: "ValidatorsWithGeo.countryName",
          enableFilter: true
        },
        {
          title: "UNLs",
          dataIndex: "ValidatorsWithGeo.unlHost",
          key: "ValidatorsWithGeo.unlHost",
          enableFilter: true
        },
        {
          title: "Chain",
          dataIndex: "ValidatorsWithGeo.chain",
          key: "ValidatorsWithGeo.chain",
          enableFilter: true
        },
        {
          title: "Score (24h)",
          dataIndex: "ValidatorsWithGeo.agreement24hScore",
          key: "ValidatorsWithGeo.agreement24hScore",
          type: "score"
        },
        {
          title: "Last Seen (UTC)",
          dataIndex: "ValidatorsWithGeo.lastUpdatedInHours",
          key: "ValidatorsWithGeo.lastUpdatedInHours",
          type: "shortdate",
          format: "YYYY-MM-DD HH:mm"
        }
      ]
    },
    buildStats: (data: any[]) => {
      const total = data.length;
      let active = 0;
      let defaultUnl = 0;
      let ripple = 0;
      const countries: any = {};
      data.forEach(c => {
        defaultUnl +=
          c["ValidatorsWithGeo.unlHost"] === "vl.ripple.com" ? 1 : 0;
        ripple += c["ValidatorsWithGeo.ripple"] === "Ripple" ? 1 : 0;
        if (c["ValidatorsWithGeo.countryName"]) {
          countries[c["ValidatorsWithGeo.countryName"]] = 1;
        }
        if (c["ValidatorsWithGeo.lastUpdatedInHours"] < 1) {
          active++;
        }
      });
      const defaultUnlRate = total === 0 ? 0 : defaultUnl / total;
      const dominance = total === 0 ? 0 : ripple / total;
      return [
        {
          title: "Active / Total",
          value: active,
          suffix: `/ ${total}`
        },
        {
          title: "Countries",
          value: Object.keys(countries).length
        },
        {
          title: "In Default UNL",
          value: defaultUnl,
          suffix: `(${(defaultUnlRate * 100).toFixed(0)}%)`
        },
        {
          title: "Ripple Share",
          value: ripple,
          suffix: `(${(dominance * 100).toFixed(0)}%)`
        }
      ];
    }
  },
  drilldown: opt => [
    drilldownValidatorScoreQuery(
      opt.selected["ValidatorsWithGeo.validation_public_key"]
    ),
    drilldownProfileQuery(opt.selected["ValidatorsWithGeo.domain"]),
    drilldownDomainMapOperatorQuery(opt.selected["ValidatorsWithGeo.domain"])
  ]
};

export { mainNetValidatorListQuery };
