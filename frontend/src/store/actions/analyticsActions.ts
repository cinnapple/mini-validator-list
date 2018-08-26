import { Response, ReferralsList } from "../../types";
import * as actionTypes from "./actionTypes";
import axiosInstance from "../../util/axios-api";

export const setReferrals = (data: Response<ReferralsList>) => {
  return {
    type: actionTypes.SET_REFERRERS,
    data: data
  };
};

export const fetchReferralsFailed = () => {
  return {
    type: actionTypes.FETCH_REFERRERS_FAILED
  };
};

export const initReferrals = () => {
  return async dispatch => {
    try {
      const data = await Promise.all([
        axiosInstance.get<Response<ReferralsList>>("referrals")
      ]);
      const referrals = data[0].data;
      dispatch(setReferrals(referrals));
    } catch (e) {
      dispatch(fetchReferralsFailed());
    }
  };
};
