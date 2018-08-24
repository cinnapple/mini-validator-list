import * as actionTypes from "../actions/actionTypes";
import { Response, State, SummaryList } from "../../types";
import { updateObject } from "../utility";

const initialState: State.Summary = {
  summary: undefined,
  ready: false
};

const setSummaryReducer = (state, action) => {
  const data = <Response<SummaryList>>action.data;
  return updateObject(state, data);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SUMMARY:
      return setSummaryReducer(state, action);
    default:
      return state;
  }
};

export default reducer;
