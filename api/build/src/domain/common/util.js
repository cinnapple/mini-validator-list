"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wellKnownValidators_1 = require("../../resources/wellKnownValidators");
const _rippleDomain = "ripple.com";
exports._rippleDomain = _rippleDomain;
const _isRippleValidator = (validator) => {
    const isWellKnown = validator.validation_public_key &&
        wellKnownValidators_1.default[_rippleDomain].indexOf(validator.validation_public_key) >= 0;
    const endsWith = validator.domain && validator.domain.split("/")[0].endsWith(_rippleDomain);
    return isWellKnown || endsWith;
};
exports._isRippleValidator = _isRippleValidator;
const _takeLastNHours = (threshould, last_datetime) => last_datetime.diff(threshould) > 0;
exports._takeLastNHours = _takeLastNHours;
const _takeMainNetOnly = (validator) => !validator.is_alt_net;
exports._takeMainNetOnly = _takeMainNetOnly;
//# sourceMappingURL=util.js.map