import * as actionTypes from "../actions/actionTypes";
import { Response, ReferralsList, State } from "../../types";
import { updateObject } from "../utility";

const initialState: State.Analytics = {
  referres: undefined,
  ready: false
};

const setReferralsReducer = (state, action) => {
  const data = <Response<ReferralsList>>action.data;
  return updateObject(state, {
    referres: data.data,
    lastUpdated: data.lastUpdated,
    ready: true
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_REFERRERS:
      return setReferralsReducer(state, action);
    default:
      return state;
  }
};

export default reducer;
