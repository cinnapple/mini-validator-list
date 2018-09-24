import { createSelector } from "reselect";
import { initialFilterState } from "../initialStates";

const wasActiveLastN = (v: Store.Model.Validator, n: number) => {
  if (v.last_datetime) {
    const hours =
      Math.abs(new Date().getTime() - new Date(v.last_datetime).getTime()) /
      36e5;
    return hours <= n;
  }
  return false;
};

const filterValidators = (
  validators: Store.Model.Validator[],
  filter: Store.State.Filter
) => {
  if (!validators || !filter) {
    return {
      filtered: [],
      filteredUnique: [],
      filteredForTextSearch: []
    };
  }

  const filteredForTextSearch = {};
  const filteredUnique = {};
  return validators.reduce(
    (prev, curr) => {
      let keep = true;

      // exclude validators whose domain is not verified.
      if (keep && filter.verifiedOnly) {
        keep = curr.verified;
      }

      // exclude validators that are not in the default UNL.
      if (keep && filter.defaultOnly) {
        keep = curr.default;
      }

      // filter domain that are not main net
      if (keep && filter.mainNetOnly) {
        keep = !curr.is_alt_net;
      }

      // eliminate data reported in less than the last N Hours
      if (keep && filter.lastNHours >= 0) {
        keep = wasActiveLastN(curr, filter.lastNHours);
      }

      // keep what we've got so far in distinct validators
      if (keep && !filteredForTextSearch[curr.domain]) {
        filteredForTextSearch[curr.domain] = 1;
        prev.filteredForTextSearch.push(curr);
      }

      // filter domain by the word specified
      if (keep && filter.filterWord) {
        const target =
          filter.searchFor === "domain" ? curr.domain : curr.pubkey;
        if (!target || target.indexOf(filter.filterWord) < 0) {
          keep = false;
        }
      }

      if (keep && !filteredUnique[curr.domain]) {
        filteredUnique[curr.domain] = 1;
        prev.filteredUnique.push(curr);
      }

      if (keep) {
        prev.filtered.push(curr);
      }

      return prev;
    },
    <
      {
        filtered: Store.Model.Validator[];
        filteredUnique: Store.Model.Validator[];
        filteredForTextSearch: Store.Model.Validator[];
      }
    >{
      filtered: [],
      filteredUnique: [],
      filteredForTextSearch: []
    }
  );
};

/**
 * Reduce to a set of unique domains that have the properties of: 
 * verified status, main-net, active in the last 6 hours
 */
const filterValidatorsForCountryOverview = (
  validators: Store.Model.Validator[]
) => {
  if (!validators) {
    return [];
  }
  const seen = {};
  return validators.reduce((prev, curr) => {
    if (curr.verified && !curr.is_alt_net && !seen[curr.domain]) {
      if (wasActiveLastN(curr, 6)) {
        prev.push(curr);
        seen[curr.domain] = true;
      }
    }
    return prev;
  }, []);
};

const getStats = (
  filtered: Store.Model.Validator[],
  distinct: Store.Model.Validator[]
) => {
  const stats: Store.State.FilterResultStats = {
    total: filtered.length,
    runByRipple: filtered.filter(a => a.is_ripple).length,
    default: filtered.filter(a => a.default).length,
    verified: distinct.length,
    dominance: undefined
  };

  stats.dominance = stats.total !== 0 ? stats.runByRipple / stats.total : 0;
  return stats;
};

/**
 * input selectors
 */
const getValidatorFilter = (state: Store.State.Validator) => state.filter;

const getValidators = (state: Store.State.Validator) => state._validators;

/**
 * memoized selectors
 */
export const getFilteredValidators = createSelector(
  [getValidatorFilter, getValidators],
  (validatorFilter, validators) => {
    return filterValidators(validators, validatorFilter);
  }
);

export const getFilteredValidatorsForCountryOverview = createSelector(
  [getValidators],
  validators => {
    return filterValidatorsForCountryOverview(validators);
  }
);

export const getFilteredStats = createSelector(
  [getFilteredValidators],
  filteredSet => {
    return getStats(filteredSet.filtered, filteredSet.filteredUnique);
  }
);

export const isFilterDifferent = createSelector(
  [getValidatorFilter],
  currentFilter => {
    return !!Object.keys(initialFilterState).find(key => {
      return initialFilterState[key] !== currentFilter[key];
    });
  }
);
