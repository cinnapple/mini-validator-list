import { localStorageService } from "./localStorageService";
import { LanguageKeys } from "../types";
const res = <LanguageKeys>require("../resources.json");

class InternationalizationService {
  getAvailableLanguages = () => res._AvailableLanguages;

  setLanguage = (lang: string) => {
    localStorageService.setAppData({ lang: lang });
  };

  isLanguageSet = () => {
    return !!localStorageService.getAppData().lang;
  };

  translate = (resource: string, params?: { [key: string]: string }) => {
    const lang = localStorageService.getAppData().lang;
    if (!resource["en"]) {
      throw Error(`No English definition found for ${resource}`);
    }
    let text = resource[lang] || resource["en"];
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        text = text.replace(`{{${key}}}`, value);
      });
    }
    return text;
  };
}

const i18nService = new InternationalizationService();

const t = i18nService.translate;

export { i18nService, t, res };
