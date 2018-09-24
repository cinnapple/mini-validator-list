import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

type S = Store.State.Notification;
type A = Store.Action<S>;

const initialState: S = {
  message: "",
  type: "",
  variant: ""
};

const showNotification = (state: S, action: A) => {
  return updateObject(state, action.payload);
};

export default (state: S = initialState, action: A) => {
  switch (action.type) {
    case actionTypes.SHOW_NOTIFICATION:
      return showNotification(state, action);
    default:
      return state;
  }
};
