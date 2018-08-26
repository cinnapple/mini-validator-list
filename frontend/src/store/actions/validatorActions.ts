import { IFilter, Archive } from "../../types";
import * as actionTypes from "./actionTypes";
import axiosInstance from "../../util/axios-api";

export const filterValidators = (filter: IFilter) => {
  return {
    type: actionTypes.FILTER_VALIDATORS,
    data: filter
  };
};

export const fetchValidatorsFailed = () => {
  return {
    type: actionTypes.FETCH_VALIDATORS_FAILED
  };
};

export const initValidators = (date, filter) => {
  return async dispatch => {
    try {
      const promises = [
        axiosInstance.get<any>(`validators${date ? `/${date}` : ""}`),
        axiosInstance.get<any>("/archives")
      ];
      const data = await Promise.all(promises);
      const validators = data[0].data.data;
      const archives = data[1].data.data.map(archive => ({
        ...archive,
        id: archive.date
      }));
      archives[0].date += " (Latest)";
      dispatch({
        type: actionTypes.SET_VALIDATORS,
        data: {
          lastUpdated: validators.lastUpdated,
          validators: validators,
          archives: archives,
          selectedDefaultUnlId: date || archives[0].id,
          filter: filter
        }
      });
    } catch (e) {
      dispatch(fetchValidatorsFailed());
    }
  };
};

export const fetchArchivesFailed = () => {
  return {
    type: actionTypes.FETCH_ARCHIVES_FAILED
  };
};

export const selectDefaultUnl = date => {
  return async dispatch => {
    try {
      axiosInstance.get(`/archives/${date}`);
      dispatch({
        type: actionTypes.DEFAULT_UNL_SELECTED,
        data: date
      });
    } catch (e) {
      dispatch(fetchArchivesFailed());
    }
  };
};

export const unselectDefaultUnl = () => {
  return async dispatch => {
    try {
      dispatch({
        type: actionTypes.DEFAULT_UNL_UNSELECTED,
        data: undefined
      });
    } catch (e) {
      dispatch(fetchArchivesFailed());
    }
  };
};
