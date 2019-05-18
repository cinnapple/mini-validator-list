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
  pivotType: "table",
  query: {
    dimensions: [
      "Vw_ValidatorReportCalendar.date",
      "Vw_ValidatorReportCalendar.monthOfYear",
      "Vw_ValidatorReportCalendar.dayOfWeek",
      "Vw_ValidatorReportCalendar.stats"
    ],
    timeDimensions: [
      {
        dimension: "Vw_ValidatorReportCalendar.date",
        dateRange
      }
    ],
    filters: [
      {
        dimension: "Vw_ValidatorReportCalendar.validation_public_key",
        operator: "equals",
        values: [validationPublicKey]
      }
    ]
  },
  options: {
    props: {
      dayOfWeekField: "Vw_ValidatorReportCalendar.dayOfWeek",
      dateField: "Vw_ValidatorReportCalendar.date",
      statsField: "Vw_ValidatorReportCalendar.stats",
      monthOfYearField: "Vw_ValidatorReportCalendar.monthOfYear"
    }
  }
});

export { drilldownValidatorScoreQuery };
