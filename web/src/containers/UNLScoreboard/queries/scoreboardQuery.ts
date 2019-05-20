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
  id: `scoreboard`,
  title: "Default UNL Scoreboard",
  type: SupportedCharts.Scoreboard,
  queries: [
    {
      dimensions: [
        "Vw_ValidatorReportCalendar.domain",
        "Vw_ValidatorReportCalendar.validation_public_key",
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
          dimension: "Vw_ValidatorReportCalendar.unl",
          operator: "equals",
          values: ["Y"]
        },
        {
          dimension: "Vw_ValidatorReportCalendar.chain",
          operator: "equals",
          values: ["main"]
        }
      ]
    },
    {
      dimensions: [
        "Vw_ValidatorDetails.domain",
        "Vw_ValidatorDetails.chain",
        "Vw_ValidatorDetails.icon",
        "Vw_ValidatorDetails.validation_public_key"
      ],
      filters: [
        {
          dimension: "Vw_ValidatorDetails.unl",
          operator: "equals",
          values: ["Yes"]
        },
        {
          dimension: "Vw_ValidatorDetails.chain",
          operator: "notEquals",
          values: ["altnet"]
        }
      ]
    }
  ],
  options: {
    props: {
      validationPublicKeyField:
        "Vw_ValidatorReportCalendar.validation_public_key",
      domainField: "Vw_ValidatorReportCalendar.domain",
      dayOfWeekField: "Vw_ValidatorReportCalendar.dayOfWeek",
      dateField: "Vw_ValidatorReportCalendar.date",
      statsField: "Vw_ValidatorReportCalendar.stats",
      monthOfYearField: "Vw_ValidatorReportCalendar.monthOfYear"
    }
  }
};

export { scoreboardQuery };
