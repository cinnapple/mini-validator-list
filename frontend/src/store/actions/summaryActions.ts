import * as actionTypes from "./actionTypes";
import { get } from "../../services/webClient";
import { action } from "../utility";

export const initSummary = () => async dispatch => {
  try {
    const result = await get<Store.Model.SummaryList>("summary/6");
    dispatch(
      action<Store.State.Summary>(actionTypes.FETCH_SUMMARY, {
        stats: result.data
      })
    );
  } catch (e) {
    dispatch(fetchSummaryFailed());
  }
};

export const initDefaultUnlMovement = () => async dispatch => {
  try {
    const result = await get<Store.Model.DefaultUnlMovement[]>(
      "defaultUnlMovements"
    );
    dispatch(
      action<Store.State.Summary>(actionTypes.FETCH_MOVEMENT, {
        defaultUnlMovement: result.data
      })
    );
  } catch (e) {
    dispatch(fetchSummaryFailed());
  }
};

export const fetchSummaryFailed = () => ({
  type: actionTypes.FETCH_REFERRERS_FAILED
});
