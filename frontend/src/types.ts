export enum AppMode {
  CURRENT_MODE = "CURRENT",
  ARCHIVE_MODE = "ARCHIVE"
}

export type ThemeType = "dark" | "light";

export type Language = "en" | "ja";

export type AppData = {
  themeType: ThemeType;
  lang: Language;
};

export namespace State {
  export type App = {
    themeType: ThemeType;
    lang: Language;
  };
  export type Validator = {
    _validators: any[];
    filter: IFilter;
    filteredValidators: any[];
    filteredValidatorsForAutosuggest: any[];
    uniqueDomains: any[];
    archives: any[];
    selectedDefaultUnlId: undefined;
  };
  export type Analytics = {
    referres: any[];
    ready: boolean;
  };
  export type Summary = {
    summary: any[];
    ready: boolean;
  };
  export type ArchivesState = {
    archives: any[];
    lastUpdated: Date;
    ready: boolean;
  };
  export type SelectDialogState = {
    title: string;
    items: SelectableListItemOption[];
    selectedValue: string;
    handleSelect: () => void;
    open?: boolean;
  };
}

export type SelectableListItemOption = {};

export interface Response<T> {
  data: T;
  lastUpdated: Date;
}

export interface ValidatorList {
  domain: string;
}

export interface ReferralsList {}

export interface SummaryList {}

export interface Archive {
  date: string;
  name: string;
}

export interface GeoList {
  domain: string;
}

export interface IFilter {
  defaultOnly: boolean;
  verifiedOnly: boolean;
  mainNetOnly: boolean;
  sort: boolean;
  filterWord: string;
}

export type AvailableLanguages = {
  en: string;
  ja?: string;
  ru?: string;
};

export type LanguageKeys = {
  APP_TITLE: AvailableLanguages;
  DOMAINMAP: AvailableLanguages;
  DOMAINMAP_LOCATE_DOMAIN: AvailableLanguages;
  DOMAIN_UNVERIFIED: AvailableLanguages;
  DONATE: AvailableLanguages;
  DONATION_LINK: AvailableLanguages;
  FILTER: AvailableLanguages;
  FILTER_BY_DEFAULT_UNL_ONLY: AvailableLanguages;
  FILTER_BY_DOMAIN_NAME: AvailableLanguages;
  FILTER_BY_MAIN_NET_ONLY: AvailableLanguages;
  FILTER_BY_VERIFIED_DOMAINS_ONLY: AvailableLanguages;
  FILTER_CLEAR: AvailableLanguages;
  HOME: AvailableLanguages;
  LINK_COMMBLOG: AvailableLanguages;
  LINK_RIPPLE: AvailableLanguages;
  LINK_XRPCHART: AvailableLanguages;
  LINK_XRPLEDGERINFO: AvailableLanguages;
  LINK_DONATE: AvailableLanguages;
  LINK_GITHUB: AvailableLanguages;
  LINK_TWITTER: AvailableLanguages;
  LOAD_ANOTHER_DEFAULT_UNL: AvailableLanguages;
  MENU_GET_IN_TOUCH: AvailableLanguages;
  MENU_EXTERNAL: AvailableLanguages;
  MENU_VALIDATORS: AvailableLanguages;
  SETTINGS: AvailableLanguages;
  SETTINGS_APPEARANCE: AvailableLanguages;
  SETTINGS_LANGUAGE: AvailableLanguages;
  SETTINGS_THEME: AvailableLanguages;
  STATS: AvailableLanguages;
  STATS_DOMINANCE: AvailableLanguages;
  STATS_IN_DEFAULT_UNL: AvailableLanguages;
  STATS_RUN_BY_RIPPLE: AvailableLanguages;
  STATS_VALIDATORS: AvailableLanguages;
  THEME_DARK: AvailableLanguages;
  THEME_LIGHT: AvailableLanguages;
  VALIDATOR_LIST_COL_DOMAIN: AvailableLanguages;
  VALIDATOR_LIST_COL_PUBKEY: AvailableLanguages;
  _AvailableLanguages: AvailableLanguages;
};
