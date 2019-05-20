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

const validatorProfileQuery = (
  validationPublicKey: string
): IQueryItem<IValidatorScoreOptions> => ({
  id: `validation-score`,
  title: `${validationPublicKey}`,
  type: SupportedCharts.ValidatorProfile,
  pivotType: "table",
  queries: [
    {
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
    {
      dimensions: [
        "Vw_ValidatorDetails.domain",
        "Vw_ValidatorDetails.icon",
        "Vw_ValidatorDetails.name",
        "Vw_ValidatorDetails.description",
        "Vw_ValidatorDetails.twitter",
        "Vw_ValidatorDetails.web",
        "Vw_ValidatorDetails.icon",
        "Vw_ValidatorDetails.countryName",
        "Vw_ValidatorDetails.continentName",
        "Vw_ValidatorDetails.latitude",
        "Vw_ValidatorDetails.longitude"
      ],
      filters: [
        {
          dimension: "Vw_ValidatorDetails.validation_public_key",
          operator: "equals",
          values: [validationPublicKey]
        }
      ]
    }
  ],
  options: {
    props: {
      dayOfWeekField: "Vw_ValidatorReportCalendar.dayOfWeek",
      dateField: "Vw_ValidatorReportCalendar.date",
      statsField: "Vw_ValidatorReportCalendar.stats",
      monthOfYearField: "Vw_ValidatorReportCalendar.monthOfYear",
      nameField: "Vw_ValidatorDetails.name",
      domainField: "Vw_ValidatorDetails.domain",
      latitudeField: "Vw_ValidatorDetails.latitude",
      longitudeField: "Vw_ValidatorDetails.longitude",
      cityField: "Vw_ValidatorDetails.city",
      countryNameField: "Vw_ValidatorDetails.countryName",
      iconField: "Vw_ValidatorDetails.icon"
    } as any
  }
});

export { validatorProfileQuery };
