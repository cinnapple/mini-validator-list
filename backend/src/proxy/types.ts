import { Frequency } from "../lib/types";

export const Cache = {
  DefaultUnl: {
    key: "ripple.defaultUNL",
    interval: Frequency.Often
  },
  UnlArchives: {
    key: "github.defaultUNLArchives",
    interval: Frequency.Often
  },
  DailyReports: {
    key: "ripple.dataapi.dailyreports",
    interval: Frequency.Often
  },
  Validators: {
    key: "ripple.dataapi.validators",
    interval: Frequency.Often
  },
  Geo: {
    key: "ipstack",
    interval: Frequency.Rarely
  },
  ValidatorsSummary: {
    key: "aggregated.validatorssummary",
    interval: Frequency.Often
  },
  Stats: {
    key: "aggregated.stats",
    interval: Frequency.Often
  }
};
