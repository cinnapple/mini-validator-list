import * as actionTypes from "./actionTypes";
import { get } from "../../services/webClient";
import { action } from "../utility";

export const applyFilter = (filter: Store.State.Filter) =>
  action<Store.State.Validator>(actionTypes.APPLY_FILTER, {
    filter: filter
  });

export const resetFilter = () =>
  action<Store.State.Validator>(actionTypes.RESET_FILTER, undefined);

export const fetchValidators = (date?: string) => async dispatch => {
  try {
    const result = await get<Store.Model.Validator[]>(
      `validators?d=${date || ""}&h=${-1}`
    );
    dispatch(
      action<Store.State.Validator>(actionTypes.FETCH_VALIDATORS, {
        _validators: result.data
      })
    );
  } catch (e) {
    dispatch(fetchValidatorsFailed());
  }
};

export const fetchValidatorsFailed = () => ({
  type: actionTypes.FETCH_VALIDATORS_FAILED
});
