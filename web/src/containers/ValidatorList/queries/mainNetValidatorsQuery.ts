import {
  IQueryItem,
  ITableChartOptions,
  SupportedCharts
} from "../../../types";
import { drilldownProfileQuery } from "./drilldownProfileQuery";
import { drilldownDomainMapOperatorQuery } from "./drilldownDomainMapQuery";
import { drilldownValidatorScoreQuery } from "./drilldownValidationScoreQuery";
import { nullIf } from "../../../helpers/util";

const mainNetValidatorListQuery: IQueryItem<ITableChartOptions<any>> = {
  title: "Main Net Validators",
  type: SupportedCharts.Table,
  query: {
    dimensions: [
      "Vw_ValidatorDetails.domain",
      "Vw_ValidatorDetails.chain",
      "Vw_ValidatorDetails.ripple",
      "Vw_ValidatorDetails.hosts",
      "Vw_ValidatorDetails.validation_public_key",
      "Vw_ValidatorDetails.agreement24hScore",
      "Vw_ValidatorDetails.lastUpdatedInHours",
      "Vw_ValidatorDetails.countryName"
    ],
    filters: [
      {
        dimension: "Vw_ValidatorDetails.chain",
        operator: "notEquals",
        values: ["altnet"]
      }
    ]
  },
  options: {
    props: {
      rowKey: "Vw_ValidatorDetails.validation_public_key",
      scroll: { x: 1000 },
      columns: [
        {
          title: "Domain",
          dataIndex: "Vw_ValidatorDetails.domain",
          key: "Vw_ValidatorDetails.domain",
          enableFilter: true,
          type: "domain",
          domainRenderOptions: {
            textField: "Vw_ValidatorDetails.validation_public_key",
            relativeHoursField: "Vw_ValidatorDetails.lastUpdatedInHours"
          }
        },
        {
          title: "Location",
          dataIndex: "Vw_ValidatorDetails.countryName",
          key: "Vw_ValidatorDetails.countryName",
          enableFilter: true
        },
        {
          title: "In UNLs",
          dataIndex: "Vw_ValidatorDetails.hosts",
          key: "Vw_ValidatorDetails.hosts",
          enableFilter: true,
          type: "unls"
        },
        {
          title: "Chain",
          dataIndex: "Vw_ValidatorDetails.chain",
          key: "Vw_ValidatorDetails.chain",
          enableFilter: true
        },
        {
          title: "Score (24h)",
          dataIndex: "Vw_ValidatorDetails.agreement24hScore",
          key: "Vw_ValidatorDetails.agreement24hScore",
          type: "score"
        },
        {
          title: "Last Seen",
          dataIndex: "Vw_ValidatorDetails.lastUpdatedInHours",
          key: "Vw_ValidatorDetails.lastUpdatedInHours",
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
        defaultUnl += nullIf(c["Vw_ValidatorDetails.hosts"], "").includes(
          "vl.ripple.com"
        )
          ? 1
          : 0;
        ripple += c["Vw_ValidatorDetails.ripple"] === "Ripple" ? 1 : 0;
        if (c["Vw_ValidatorDetails.countryName"]) {
          countries[c["Vw_ValidatorDetails.countryName"]] = 1;
        }
        if (c["Vw_ValidatorDetails.lastUpdatedInHours"] < 1) {
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
    [
      drilldownValidatorScoreQuery(
        opt.selected["Vw_ValidatorDetails.validation_public_key"]
      )
    ],
    [drilldownProfileQuery(opt.selected["Vw_ValidatorDetails.domain"])],
    [
      drilldownDomainMapOperatorQuery(
        opt.selected["Vw_ValidatorDetails.domain"]
      )
    ]
  ]
};

export { mainNetValidatorListQuery };
