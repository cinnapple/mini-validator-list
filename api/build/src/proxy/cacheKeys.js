"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../lib/enum");
exports.default = {
    DefaultUnl: {
        key: "ripple.defaultUNL",
        interval: enum_1.Frequency.Often
    },
    UnlArchives: {
        key: "github.defaultUNLArchives",
        interval: enum_1.Frequency.Often
    },
    DailyReports: {
        key: "ripple.dataapi.dailyreports",
        interval: enum_1.Frequency.Often
    },
    Validators: {
        key: "ripple.dataapi.validators",
        interval: enum_1.Frequency.Often
    },
    Geo: {
        key: "ipstack",
        interval: enum_1.Frequency.Rarely
    },
    ValidatorsSummary: {
        key: "aggregated.validatorssummary",
        interval: enum_1.Frequency.Often
    },
    Stats: {
        key: "aggregated.stats",
        interval: enum_1.Frequency.Often
    },
    UnlMovementStats: {
        key: "ripple.defaultUNLMovementStats",
        interval: enum_1.Frequency.Rarely
    }
};
//# sourceMappingURL=cacheKeys.js.map