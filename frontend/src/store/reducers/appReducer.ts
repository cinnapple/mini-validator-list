import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import { localStorageService } from "../../services/localStorageService";
import { i18nService } from "../../services/i18nService";
import { State, AppMode } from "../../types";

const initialState: State.App = {
  themeType: localStorageService.getAppData().themeType || "light",
  lang: localStorageService.getAppData().lang || "en"
};

const setThemeTypeReducer = (state, action) => {
  return updateObject(state, {
    themeType: action.data
  });
};

const setLanguageReducer = (state, action) => {
  i18nService.setLanguage(action.data);
  return updateObject(state, {
    lang: action.data
  });
};

const reducer = (state = initialState, action) => {
  if (!i18nService.isLanguageSet()) {
    setLanguageReducer(state, { data: initialState.lang });
  }

  switch (action.type) {
    case actionTypes.TOGGLE_THEMETYPE:
      return setThemeTypeReducer(state, action);
    case actionTypes.SET_LANGUAGE:
      return setLanguageReducer(state, action);
    default:
      return state;
  }
};

export default reducer;
