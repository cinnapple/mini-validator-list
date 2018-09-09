import { Frequency } from "../lib/types";

export const Cache = {
  RIPPLE_DEFAULT_UNL: {
    key: "ripple.defaultUNL",
    interval: Frequency.Often
  },
  GITHUB_DEFAULT_UNL_ARCHIVES: {
    key: "github.defaultUNLArchives",
    interval: Frequency.Often
  },
  GITHUB_DEFAULT_UNL: {
    key: "github.defaultUNL",
    interval: Frequency.Never
  },
  RIPPLE_DAILY_REPORT: {
    key: "ripple.dataapi.dailyreports",
    interval: Frequency.Often
  },
  RIPPLE_VALIDATORS: {
    key: "ripple.dataapi.validators",
    interval: Frequency.Never
  },
  IPSTACK_GEO: {
    key: "ipstack",
    interval: Frequency.Rarely
  },
  MERGED_DATA: {
    key: "aggregated.validatorssummary",
    interval: Frequency.Often
  },
  SUMMARY_DATA: {
    key: "aggregated.stats",
    interval: Frequency.Often
  }
};
