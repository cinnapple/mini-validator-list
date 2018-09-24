import { localStorageService } from "../services/localStorageService";

export const initialAppState: Store.State.App = {
  themeType: localStorageService.getAppData().themeType || "light",
  lang: localStorageService.getAppData().lang || "en"
};

export const initialFilterState: Store.State.Filter = {
  defaultOnly: true,
  verifiedOnly: true,
  mainNetOnly: true,
  filterWord: "",
  lastNHours: 6,
  searchFor: "domain",
  selectedUnl: ""
};

export const initialDefaultUnlFilterState: Store.State.Filter = {
  ...initialFilterState,
  lastNHours: -1
};

export const initialValidatorState: Store.State.Validator = {
  _validators: undefined, // only keep track of the initial validators
  filter: initialFilterState,
  filtered: [],
  filteredUnique: [],
  filteredForTextSearch: [],
  stats: undefined
};

export const initialArchivesState: Store.State.Unl = {
  unls: []
};

export const initialSummaryState: Store.State.Summary = {
  stats: undefined
};
