import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import { initialValidatorState, initialFilterState } from "../initialStates";

type S = Store.State.Validator;
type A = Store.Action<S>;

export default (state: S = initialValidatorState, action: A) => {
  switch (action.type) {
    case actionTypes.APPLY_FILTER:
      return updateObject(state, {
        filter: action.payload.filter
      });
    case actionTypes.RESET_FILTER:
      return updateObject(state, {
        filter: initialFilterState
      });
    case actionTypes.FETCH_VALIDATORS:
      return updateObject(state, {
        _validators: action.payload._validators
      });
    default:
      return state;
  }
};
