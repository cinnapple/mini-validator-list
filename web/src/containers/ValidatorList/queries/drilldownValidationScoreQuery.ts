import {
  IQueryItem,
  SupportedCharts,
  IValidatorScoreOptions
} from "../../../types";
import dayjs from "dayjs";

const dateRange = [
  dayjs()
    .add(-6, "month")
    .format("YYYY-MM-DD"),
  dayjs().format("YYYY-MM-DD")
];

const drilldownValidatorScoreQuery = (
  validationPublicKey: string
): IQueryItem<IValidatorScoreOptions> => ({
  title: `Validation Score`,
  type: SupportedCharts.ValidationScore,
  bordered: false,
  pivotType: "table",
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
        values: [validationPublicKey]
      }
    ]
  },
  options: {
    props: {
      dayOfWeekField: "Calendar_ValidationReports.dayOfWeek",
      dateField: "Calendar_ValidationReports.date",
      statsField: "Calendar_ValidationReports.stats",
      monthOfYearField: "Calendar_ValidationReports.monthOfYear"
    }
  }
});

export { drilldownValidatorScoreQuery };
