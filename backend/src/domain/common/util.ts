import * as moment from "moment";
import WELL_KNOWN_PUBKEYS from "../../resources/wellKnownValidators";
import { Models } from "../types";

const _rippleDomain = "ripple.com";

const _isRippleValidator = (validator: Models.Validator) => {
  const isWellKnown =
    validator.validation_public_key &&
    WELL_KNOWN_PUBKEYS[_rippleDomain].indexOf(
      validator.validation_public_key
    ) >= 0;
  const endsWith =
    validator.domain && validator.domain.split("/")[0].endsWith(_rippleDomain);

  return isWellKnown || endsWith;
};

const _takeLastNHours = (
  threshould: moment.Moment,
  last_datetime: moment.Moment
) => last_datetime.diff(threshould) > 0;

const _takeMainNetOnly = (validator: Models.ValidatorSummary) =>
  !validator.is_alt_net;

export { _isRippleValidator, _rippleDomain, _takeLastNHours, _takeMainNetOnly };
