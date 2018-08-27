import { Response, SummaryList } from "../../types";
import * as actionTypes from "./actionTypes";
import axiosInstance from "../../util/axios-api";

export const setSummary = (data: Response<SummaryList>) => {
  return {
    type: actionTypes.FETCH_SUMMARY,
    data: {
      summary: data.data,
      lastUpdated: data.lastUpdated
    }
  };
};

export const fetchSummaryFailed = () => {
  return {
    type: actionTypes.FETCH_REFERRERS_FAILED
  };
};

export const initSummary = () => {
  return async dispatch => {
    try {
      const result = await axiosInstance.get<Response<SummaryList>>("summary/6");
      dispatch(setSummary(result.data));
    } catch (e) {
      dispatch(fetchSummaryFailed());
    }
  };
};
