import {
  IQueryItem,
  IProfileChartOptions,
  ISelectedValue,
  SupportedCharts
} from "../../../types";
import dayjs from "dayjs";

const dateRange = [
  dayjs()
    .add(-6, "month")
    .format("YYYY-MM-DD"),
  dayjs().format("YYYY-MM-DD")
];

const drilldownValidatorScoreQuery = (
  opt: ISelectedValue
): IQueryItem<IProfileChartOptions> => ({
  title: `Validation Score`,
  type: SupportedCharts.ValidationScore,
  query: {
    dimensions: [
      "Calendar_ValidationReports.date",
      "Calendar_ValidationReports.monthOfYear",
      "Calendar_ValidationReports.dayOfWeek",
      "Calendar_ValidationReports.stats"
    ],
    timeDimensions: [
      {
        dimension: "Calendar_ValidationReports.date",
        dateRange
      }
    ],
    filters: [
      {
        dimension: "Calendar_ValidationReports.validation_public_key",
        operator: "equals",
        values: [
          opt.selected["ValidatorsWithGeo.validation_public_key"],
          "NULL"
        ]
      }
    ]
  },
  options: { props: {} }
});

export { drilldownValidatorScoreQuery };
