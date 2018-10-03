declare namespace Store {
  export type ThemeType = "dark" | "light";

  export type Language = "en" | "ja";

  export type SelectableListItemOption = {};

  export type Response<T> = {
    data: T;
  };

  export type Action<TPayload> = {
    type: string;
    payload: TPayload;
  };

  /**
   * Models
   */
  export namespace Model {
    export type AvailableLanguages = {
      en: string;
      ja?: string;
      ru?: string;
    };
    export interface Validator {
      country_code: "US";
      country_name: "United States";
      default: true;
      disagreement: 0;
      domain: "ripple.com";
      is_alt_net: false;
      is_report_available: true;
      is_ripple: true;
      last_datetime: "2018-09-26T13:40:16.020Z";
      latitude: 45.87;
      longitude: -119.69;
      pubkey: "nHBtzeujejMTAWCymPjcaQUjLgxnfxDGTGoZnP3PvHRkR24hVgjw";
      region_name: "Oregon";
      total_ledgers: 13084;
      verified: true;
    }

    export interface ReferralsList {}

    export interface SummaryList {
      allValidatorsNonRipple: 137;
      allValidatorsRipple: 10;
      allValidatorsTotal: 147;
      allValidatorsUnverified: 87;
      allValidatorsVerified: 60;
      defaultUnlDominance: 10;
      defaultUnlDominanceNonRippleTotal: 12;
      defaultUnlDominanceRippleTotal: 10;
      defaultUnlTotal: 22;
      defaultUnlTotalData: {
        count: 1;
        domain: "bithomp.com";
      }[];
      summaryDefaultUnlGroupByCountryData: {
        count: 17;
        country_code: "US";
        country_name: "United States";
        rate: 0;
      }[];
      summaryDefaultUnlGroupByCountryTotal: 6;
      summaryVerifiedGroupByCountryData: {
        count: 26;
        country_code: "US";
        country_name: "United States";
        rate: 0;
      }[];
      summaryVerifiedGroupByCountryTotal: 15;
    }

    export interface DefaultUnlMovement {
      ripple: number;
      nonRipple: number;
      date: string;
    }

    export interface Archive {
      date: "2018-09-24";
      name: "index.2018-09-24.json";
      url: "https://raw.githubusercontent.com/ripple";
    }

    export interface GeoList {
      domain: string;
    }
  }

  /**
   * States are set by actions/reducers
   */
  export namespace State {
    export type App = {
      themeType: ThemeType;
      lang: Language;
    };

    export type Filter = {
      defaultOnly: boolean;
      verifiedOnly: boolean;
      mainNetOnly: boolean;
      filterWord: string;
      lastNHours: number;
      searchFor: "domain" | "key";
      selectedUnl: string;
    };

    export type FilterResultStats = {
      total: number;
      default: number;
      runByRipple: number;
      verified: number;
      dominance: number;
    };

    export type Validator = {
      _validators?: Model.Validator[];
      validators?: Model.Validator[];
      filter?: Filter;
      filtered?: Model.Validator[];
      filteredUnique?: Model.Validator[];
      filteredForTextSearch?: Model.Validator[];
      stats?: FilterResultStats;
    };

    export type Analytics = {
      referres: any[];
      ready: boolean;
    };

    export type Summary = {
      stats?: Model.SummaryList;
      defaultUnlMovement?: Model.DefaultUnlMovement[];
    };

    export type Unl = {
      unls?: (Model.Archive & { id?: "2018-09-24" })[];
    };

    export type SelectDialog = {
      title?: string;
      items?: SelectableListItemOption[];
      selectedValue?: string;
      handleSelect?: () => void;
      open?: boolean;
    };

    export type AppData = {
      themeType: ThemeType;
      lang: Language;
    };

    export interface Notification {
      message: string;
      variant: string;
      type: string;
    }
  }

  export namespace Lang {
    export type LanguageKeys = {
      APP_TITLE: Model.AvailableLanguages;
      DOMAINMAP: Model.AvailableLanguages;
      DOMAINMAP_LOCATE_DOMAIN: Model.AvailableLanguages;
      DOMAIN_UNVERIFIED: Model.AvailableLanguages;
      DONATE: Model.AvailableLanguages;
      DONATION_LINK: Model.AvailableLanguages;
      CONDITION_FILTER: Model.AvailableLanguages;
      FILTER: Model.AvailableLanguages;
      FILTER_BY_ACTIVE_NODES_ONLY: Model.AvailableLanguages;
      FILTER_BY_DEFAULT_UNL_ONLY: Model.AvailableLanguages;
      FILTER_BY_DOMAIN_NAME: Model.AvailableLanguages;
      FILTER_BY_LAST_N_HOURS: Model.AvailableLanguages;
      FILTER_BY_LAST_N_HOURS_ALL_TIME: Model.AvailableLanguages;
      FILTER_BY_LAST_N_HOURS_LAST_HOURS: Model.AvailableLanguages;
      FILTER_BY_LAST_N_HOURS_LAST_1_WEEK: Model.AvailableLanguages;
      FILTER_BY_MAIN_NET_ONLY: Model.AvailableLanguages;
      FILTER_BY_VERIFIED_DOMAINS_ONLY: Model.AvailableLanguages;
      FILTER_CLEAR: Model.AvailableLanguages;
      HOME: Model.AvailableLanguages;
      LINK_COMMBLOG: Model.AvailableLanguages;
      LINK_RIPPLE: Model.AvailableLanguages;
      LINK_XRPCHART: Model.AvailableLanguages;
      LINK_XRPLEDGERINFO: Model.AvailableLanguages;
      LINK_DONATE: Model.AvailableLanguages;
      LINK_GITHUB: Model.AvailableLanguages;
      LINK_TWITTER: Model.AvailableLanguages;
      LOAD_ANOTHER_DEFAULT_UNL: Model.AvailableLanguages;
      MENU_GET_IN_TOUCH: Model.AvailableLanguages;
      MENU_EXTERNAL: Model.AvailableLanguages;
      MENU_VALIDATORS: Model.AvailableLanguages;
      SETTINGS: Model.AvailableLanguages;
      SETTINGS_APPEARANCE: Model.AvailableLanguages;
      SETTINGS_LANGUAGE: Model.AvailableLanguages;
      SETTINGS_THEME: Model.AvailableLanguages;
      STATS: Model.AvailableLanguages;
      STATS_DOMINANCE: Model.AvailableLanguages;
      STATS_IN_DEFAULT_UNL: Model.AvailableLanguages;
      STATS_RUN_BY_RIPPLE: Model.AvailableLanguages;
      STATS_VALIDATORS: Model.AvailableLanguages;
      THEME_DARK: Model.AvailableLanguages;
      THEME_LIGHT: Model.AvailableLanguages;
      VALIDATOR_LIST_COL_DOMAIN: Model.AvailableLanguages;
      VALIDATOR_LIST_COL_PUBKEY: Model.AvailableLanguages;
      _AvailableLanguages: Model.AvailableLanguages;
    };
  }

  export type RootReducer = {
    app: Store.State.App;
    notification: Store.State.Notification;
    selectDialog: Store.State.SelectDialog;
    validators: Store.State.Validator;
    unl: Store.State.Unl;
    summary: Store.State.Summary;
  };
}
