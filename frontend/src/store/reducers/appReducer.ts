import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import { i18nService } from "../../services/i18nService";
import { initialAppState } from "../initialStates";

const reducer = (state = initialAppState, action) => {
  if (!i18nService.isLanguageSet()) {
    i18nService.setLanguage(initialAppState.lang);
  }

  switch (action.type) {
    case actionTypes.TOGGLE_THEMETYPE:
      return updateObject(state, {
        themeType: action.data
      });
    case actionTypes.SET_LANGUAGE:
      i18nService.setLanguage(action.data);
      return updateObject(state, {
        lang: action.data
      });
    default:
      return state;
  }
};

export default reducer;
