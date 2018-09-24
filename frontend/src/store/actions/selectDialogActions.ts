import * as actionTypes from "./actionTypes";
import { action } from "../utility";

export const openDialog = (
  title: string,
  items: Store.SelectableListItemOption[],
  selectedValue: string,
  handleSelect: () => void
) =>
  action<Store.State.SelectDialog>(actionTypes.OPEN_DIALOG, {
    title,
    items,
    selectedValue,
    handleSelect,
    open: true
  });

export const closeDialog = () =>
  action<Store.State.SelectDialog>(actionTypes.CLOSE_DIALOG, {
    open: false
  });
