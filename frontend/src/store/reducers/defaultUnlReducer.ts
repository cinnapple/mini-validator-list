import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import { initialArchivesState } from "../initialStates";

type S = Store.State.Unl;
type A = Store.Action<S>;

export default (state: S = initialArchivesState, action: A) => {
  switch (action.type) {
    case actionTypes.FETCH_ARCHIVES:
      return updateObject(state, {
        unls: action.payload.unls
      });
    default:
      return state;
  }
};
