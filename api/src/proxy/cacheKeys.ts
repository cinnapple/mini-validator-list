import { Frequency } from "../lib/enum";

export default {
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
  },
  UnlMovementStats: {
    key: "ripple.defaultUNLMovementStats",
    interval: Frequency.Rarely
  }
};
