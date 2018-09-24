import * as actionTypes from "./actionTypes";
import { localStorageService } from "../../services/localStorageService";

export const toggleThemeType = themeType => {
  localStorageService.setAppData({ themeType: themeType });
  return {
    data: themeType,
    type: actionTypes.TOGGLE_THEMETYPE
  };
};

export const setLanguage = lang => ({
  data: lang,
  type: actionTypes.SET_LANGUAGE
});
