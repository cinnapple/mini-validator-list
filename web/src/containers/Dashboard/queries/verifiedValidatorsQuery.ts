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
  chartTransformOption: "chartPivot",
  query: {
    measures: ["MainNetValidators.count"],
    dimensions: ["MainNetValidators.verified"]
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
});

export { verifiedValidatorQuery };
