import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import { initialSummaryState } from "../initialStates";

type S = Store.State.Summary;
type A = Store.Action<Store.State.Summary>;

export default (state: S = initialSummaryState, action: A) => {
  switch (action.type) {
    case actionTypes.FETCH_SUMMARY:
      return updateObject(state, {
        stats: action.payload.stats
      });
    default:
      return state;
  }
};
