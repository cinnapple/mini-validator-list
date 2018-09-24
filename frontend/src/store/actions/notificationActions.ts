import * as actionTypes from "./actionTypes";
import { action } from "../utility";

export const showNotification = (
  message: string,
  variant: string,
  type: string
) => async dispatch => {
  try {
    dispatch(
      action<Store.State.Notification>(actionTypes.SHOW_NOTIFICATION, {
        message,
        variant,
        type
      })
    );
  } catch (e) {
    dispatch(failed());
  }
};

export const failed = () => ({
  type: actionTypes.FETCH_ARCHIVES_FAILED
});
