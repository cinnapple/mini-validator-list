import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

type S = Store.State.SelectDialog;
type A = Store.Action<S>;

const initialState: S = {
  title: undefined,
  items: undefined,
  selectedValue: undefined,
  handleSelect: undefined,
  open: false
};

const openDialog = (state: S, action: A) => {
  return updateObject(state, action.payload);
};

const closeDialog = (state: S, action: A) => {
  return updateObject(state, action.payload);
};

export default (state: S = initialState, action: A) => {
  switch (action.type) {
    case actionTypes.OPEN_DIALOG:
      return openDialog(state, action);
    case actionTypes.CLOSE_DIALOG:
      return closeDialog(state, action);
    default:
      return state;
  }
};
