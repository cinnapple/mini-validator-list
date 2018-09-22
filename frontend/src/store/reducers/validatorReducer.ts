import * as actionTypes from "../actions/actionTypes";
import { State } from "../../types";
import { updateObject } from "../utility";
import {
  filterValidators,
  distinctDomains,
  groupDomainsByLocation,
  calculateStats
} from "../dataOperations";

const initialFilter: State.Filter = {
  defaultOnly: true,
  verifiedOnly: true,
  mainNetOnly: true,
  filterWord: "",
  lastNHours: 6,
  sort: undefined
};

const initialState: State.Validator = {
  _validators: undefined, // only keep track of the initial validators
  _filter: initialFilter, // only keep track of the initial fitler
  filter: initialFilter,
  filteredValidators: undefined,
  filteredValidatorsForAutosuggest: undefined,
  uniqueDomains: undefined,
  archives: undefined,
  selectedDefaultUnlId: undefined
};

const overrideForAutosuggest = {
  verifiedOnly: true,
  unique: true,
  sort: true
};

const createArchivesSelectOptions = archives =>
  archives.map(archive => ({
    label: archive.date,
    value: archive
  }));

const filterValidatorsReducer = (state: State.Validator, action) => {
  const filter = <State.Filter>action.data || initialFilter;
  const v1 = filterValidators(state._validators, filter, {});
  const v2 = filterValidators(
    state._validators,
    filter,
    overrideForAutosuggest
  );
  const d = distinctDomains(v1);
  const l = groupDomainsByLocation(v1);
  const s = calculateStats(v1, d);
  return updateObject(state, {
    filteredValidators: v1,
    filteredValidatorsForAutosuggest: v2,
    filter: filter,
    stats: s,
    uniqueDomains: d,
    positions: l
  });
};

const setValidatorsAndArchivesReducer = (state: State.Validator, action) => {
  // original validator data
  const data = <any>action.data;
  const archivesSelectOptions = createArchivesSelectOptions(data.archives);

  const newState = updateObject(state, {
    _validators: data.validators,
    archives: data.archives,
    archivesSelectOptions,
    selectedDefaultUnlId: "",
    lastUpdated: data.lastUpdated
  });
  return updateObject(
    newState,
    filterValidatorsReducer(newState, { data: data.filter })
  );
};

const setValidatorsReducer = (state: State.Validator, action) => {
  const data = <any>action.data;
  const newState = updateObject(state, data);
  return updateObject(
    newState,
    filterValidatorsReducer(newState, { data: data.filter })
  );
};

const reducer = (state: State.Validator = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_VALIDATORS_AND_ARCHIVES:
      return setValidatorsAndArchivesReducer(state, action);
    case actionTypes.SET_VALIDATORS:
      return setValidatorsReducer(state, action);
    case actionTypes.FILTER_VALIDATORS:
      return filterValidatorsReducer(state, action);
    default:
      return state;
  }
};

export default reducer;
