import {
  IQueryItem,
  SupportedCharts,
  IScoreboardOptions
} from "../../../types";
import dayjs from "dayjs";

const dateRange = [
  dayjs()
    .add(-2, "month")
    .format("YYYY-MM-DD"),
  dayjs().format("YYYY-MM-DD")
];

const scoreboardQuery: IQueryItem<IScoreboardOptions> = {
  title: "Default UNL Scoreboard",
  type: SupportedCharts.Scoreboard,
  bordered: false,
  query: {
    dimensions: [
      "Calendar_ValidationReports.domain",
      "Calendar_ValidationReports.validation_public_key",
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
        dimension: "Calendar_ValidationReports.unl",
        operator: "equals",
        values: ["Y"]
      },
      {
        dimension: "Calendar_ValidationReports.chain",
        operator: "notEquals",
        values: ["altnet"]
      }
    ]
  },
  options: {
    props: {
      validationPublicKeyField:
        "Calendar_ValidationReports.validation_public_key",
      domainField: "Calendar_ValidationReports.domain",
      dayOfWeekField: "Calendar_ValidationReports.dayOfWeek",
      dateField: "Calendar_ValidationReports.date",
      statsField: "Calendar_ValidationReports.stats",
      monthOfYearField: "Calendar_ValidationReports.monthOfYear"
    }
  }
};

export { scoreboardQuery };
