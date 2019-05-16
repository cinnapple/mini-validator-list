import {
  IQueryItem,
  IDonutChartOptions,
  SupportedCharts,
  ISelectedValue,
  ITableChartOptions
} from "../../../types";
import { insertIf } from "../../../helpers/util";

const verifiedValidatorQuery: IQueryItem<IDonutChartOptions> = {
  title: "Verified Validators",
  type: SupportedCharts.Donut,
  pivotType: "chart",
  query: {
    measures: ["Vw_ValidatorDetails.count"],
    dimensions: ["Vw_ValidatorDetails.verified"],
    filters: [
      {
        dimension: "Vw_ValidatorDetails.chain",
        operator: "notEquals",
        values: ["altnet"]
      }
    ]
  },
  options: {
    props: {},
    titleField: "Verified",
    supportText: ["verified", "validators"]
  },
  drilldown: opt => [drilldown(opt)]
};

const drilldown = (
  opt: ISelectedValue
): IQueryItem<ITableChartOptions<any>> => ({
  title: `${opt.selected.category} validators`,
  query: {
    dimensions: [
      "Vw_ValidatorDetails.validation_public_key",
      "Vw_ValidatorDetails.unl",
      "Vw_ValidatorDetails.domain"
    ],
    filters: [
      {
        dimension: "Vw_ValidatorDetails.chain",
        operator: "notEquals",
        values: ["altnet"]
      },
      {
        dimension: "Vw_ValidatorDetails.verified",
        operator: "equals",
        values: [opt.selected.category]
      }
    ]
  },
  type: SupportedCharts.Table,
  options: {
    props: {
      rowKey: "Vw_ValidatorDetails.validation_public_key",
      scroll: { x: 400 },
      columns: [
        ...insertIf(
          opt.selected.category === "Verified",
          [
            {
              title: "Domain",
              dataIndex: "Vw_ValidatorDetails.domain",
              key: "1"
            }
          ],
          [
            {
              title: "Key",
              dataIndex: "Vw_ValidatorDetails.validation_public_key",
              key: "1"
            }
          ]
        ),
        ...insertIf(opt.selected.category === "Verified", [
          {
            title: "Default UNL?",
            dataIndex: "Vw_ValidatorDetails.unl",
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
});

export { verifiedValidatorQuery };
