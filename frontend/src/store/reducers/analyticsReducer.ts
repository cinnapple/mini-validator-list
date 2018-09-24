import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

type S = Store.State.Analytics;
type A = Store.Action<Store.Model.ReferralsList>;

const initialState: S = {
  referres: undefined,
  ready: false
};

const setReferralsReducer = (state: S, action: A) => {
  return updateObject(state, {
    referres: action.payload,
    ready: true
  });
};

const reducer = (state: S = initialState, action: A) => {
  switch (action.type) {
    case actionTypes.SET_REFERRERS:
      return setReferralsReducer(state, action);
    default:
      return state;
  }
};

export default reducer;
