import { State } from "../../types";
import * as actionTypes from "./actionTypes";
import axiosInstance from "../../util/axios-api";

export const filterValidators = (filter?: State.Filter) => {
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

const getValidators = async (date?: string, lastNHours?: number) => {
  lastNHours = lastNHours || 6;
  const url = `validators?d=${date || ""}&h=${lastNHours || ""}`;
  return axiosInstance.get<any>(url).then(result => result.data);
};

export const updateValidators = (date: string, filter: State.Filter) => {
  return async dispatch => {
    try {
      if (date) {
        // if default unl is selected, query to start the fetch.
        axiosInstance.get(`/archives/${date}`);
      }
      const lastNHours = date ? -1 : filter.lastNHours;
      const data = await getValidators(date, lastNHours);
      const validators = data.data;
      dispatch({
        type: actionTypes.SET_VALIDATORS,
        data: {
          _validators: validators,
          lastUpdated: validators.lastUpdated,
          selectedDefaultUnlId: date || "",
          filter: filter
        }
      });
    } catch (e) {
      dispatch(fetchValidatorsFailed());
    }
  };
};

export const initValidators = () => {
  return async dispatch => {
    try {
      const promises = [getValidators(), axiosInstance.get<any>("/archives")];
      const data = await Promise.all(promises);
      const validators = data[0].data;
      const archives = data[1].data.data.map(archive => ({
        ...archive,
        id: archive.date
      }));
      dispatch({
        type: actionTypes.INIT_VALIDATORS_AND_ARCHIVES,
        data: {
          lastUpdated: validators.lastUpdated,
          validators: validators,
          archives: archives,
          selectedDefaultUnlId: ""
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
