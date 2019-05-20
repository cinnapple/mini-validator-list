import {
  IQueryItem,
  IDonutChartOptions,
  SupportedCharts,
  ITableChartOptions,
  DataRow
} from "../../../types";
import { insertIf } from "../../../helpers/util";

const verifiedValidatorQuery: IQueryItem<IDonutChartOptions> = {
  id: `verified-validators`,
  title: "Verified Validators",
  type: SupportedCharts.Donut,
  pivotType: "chart",
  queries: [
    {
      measures: ["Vw_ValidatorDetails.count"],
      dimensions: ["Vw_ValidatorDetails.verified"],
      filters: [
        {
          dimension: "Vw_ValidatorDetails.chain",
          operator: "notEquals",
          values: ["altnet"]
        }
      ]
    }
  ],
  options: {
    props: {},
    titleField: "Verified",
    supportText: ["verified", "validators"]
  },
  drilldown: opt => [[drilldown(opt)]]
};

const drilldown = (selected: DataRow): IQueryItem<ITableChartOptions<any>> => ({
  id: `${verifiedValidatorQuery.id}/${selected["category"]}`,
  title: `${selected.category} validators`,
  queries: [
    {
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
          values: [selected.category as string]
        }
      ]
    }
  ],
  type: SupportedCharts.Table,
  options: {
    props: {
      rowKey: "Vw_ValidatorDetails.validation_public_key",
      scroll: { x: 400 },
      columns: [
        ...insertIf(
          selected.category === "Verified",
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
        ...insertIf(selected.category === "Verified", [
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
          title: `${selected.category} validators`,
          value: data.length,
          suffix: `(${(parseFloat(selected.percent as string) * 100).toFixed(
            0
          )}%)`
        }
      ];
    }
  }
});

export { verifiedValidatorQuery };
