import { drilldownValidatorScoreQuery } from "../../ValidatorList/queries/drilldownValidationScoreQuery";
import { ISelectedValue } from "../../../types";
import { drilldownProfileQuery } from "../../ValidatorList/queries/drilldownProfileQuery";
import { drilldownDomainMapOperatorQuery } from "../../ValidatorList/queries/drilldownDomainMapQuery";

export default (opt: ISelectedValue) => [
  [drilldownValidatorScoreQuery(opt.selected.validationPublicKey)],
  [
    drilldownProfileQuery(opt.selected.domain),
    drilldownDomainMapOperatorQuery(opt.selected.domain)
  ]
];
