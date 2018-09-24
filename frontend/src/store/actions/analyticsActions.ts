import * as actionTypes from "./actionTypes";
import { get } from "../../services/webClient";
import { action } from "../utility";

export const initReferrals = () => async dispatch => {
  try {
    const result = await get<Store.Model.ReferralsList>("referrals");
    dispatch(
      action<Store.Model.ReferralsList>(actionTypes.SET_REFERRERS, result.data)
    );
  } catch (e) {
    dispatch(fetchReferralsFailed());
  }
};

export const fetchReferralsFailed = () => ({
  type: actionTypes.FETCH_REFERRERS_FAILED
});
