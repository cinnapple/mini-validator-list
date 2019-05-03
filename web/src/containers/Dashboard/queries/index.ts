import { verifiedValidatorQuery } from "./verifiedValidatorsQuery";
import { defaultUnlDominanceQuery } from "./defaultUnlDominanceQuery";
import { defaultUnlDominanceMovementQuery } from "./defaultUnlDominanceMovementQuery";
import { unlOperatorMapQuery } from "./domainMapQuery";
import { areaBreakdownQuery } from "./areaBreakdownQuery";

export default [
  [verifiedValidatorQuery, defaultUnlDominanceQuery],
  [defaultUnlDominanceMovementQuery],
  [unlOperatorMapQuery],
  [areaBreakdownQuery]
];
