import * as actionTypes from "./actionTypes";
import { get } from "../../services/webClient";
import { action } from "../utility";

export const fetchArchives = () => async dispatch => {
  try {
    const result = await get<Store.Model.Archive[]>(`/archives`);
    const archives = result.data.map(archive => ({
      ...archive,
      id: archive.date
    }));
    dispatch(
      action<Store.State.Unl>(actionTypes.FETCH_ARCHIVES, {
        unls: archives
      })
    );
  } catch (e) {
    dispatch(fetchArchivesFailed());
  }
};

export const fetchArchivesFailed = () => ({
  type: actionTypes.FETCH_ARCHIVES_FAILED
});
