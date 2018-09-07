import { State } from "../types";
import { _sort } from "./utility";

const filterValidators = (
  validatorList: any[],
  state: State.Filter,
  options: any
) => {
  const _sorter = (a, b) => {
    return a.domain && b.domain
      ? a.domain < b.domain
        ? -1
        : a.domain > b.domain
          ? 1
          : 0
      : !a.domain && b.domain
        ? 1
        : a.domain && !b.domain
          ? -1
          : 0;
  };

  options = {
    verifiedOnly:
      options.verifiedOnly !== undefined
        ? options.verifiedOnly
        : state.verifiedOnly,
    defaultOnly:
      options.defaultOnly !== undefined
        ? options.defaultOnly
        : state.defaultOnly,
    mainNetOnly:
      options.mainNetOnly !== undefined
        ? options.mainNetOnly
        : state.mainNetOnly,
    word: options.word !== undefined ? options.word : state.filterWord,
    unique: options.unique !== undefined ? options.unique : false,
    sort: options.sort !== undefined ? options.sort : state.sort
  };

  const uniqueDomainsHashMap = {};

  const result = validatorList.reduce((prev, curr) => {
    let keep = true;

    // exclude duplicates
    if (keep && options.unique) {
      if (!uniqueDomainsHashMap[curr.domain]) {
        uniqueDomainsHashMap[curr.domain] = {
          count: 1
        };
      } else {
        uniqueDomainsHashMap[curr.domain].count++;
        keep = false;
      }
    }

    // exclude validators whose domain is not verified.
    if (keep && options.verifiedOnly) {
      if (!curr.verified) {
        keep = false;
      }
    }

    // exclude validators that are not in the default UNL.
    if (keep && options.defaultOnly) {
      if (!curr.default) {
        keep = false;
      }
    }

    // filter domain that are not main net
    if (keep && options.mainNetOnly) {
      if (curr.is_alt_net) {
        keep = false;
      }
    }

    // filter domain by the word specified
    if (keep && options.word) {
      if (!curr.domain || curr.domain.indexOf(options.word) < 0) {
        keep = false;
      }
    }

    if (keep) {
      prev.push(curr);
    }

    return prev;
  }, []);

  // sort the result in a dictionary order.
  if (options.sort) {
    result.sort(_sorter);
  }

  return result;
};

const distinctDomains = (validatorList: any[]) => {
  const domainHashMap = {};
  validatorList = validatorList.reduce((prev, curr) => {
    if (curr.verified && !domainHashMap[curr.domain]) {
      domainHashMap[curr.domain] = true;
      prev.push(curr);
    }
    return prev;
  }, []);

  _sort(validatorList, "domain", "asc");

  return validatorList;
};

const groupDomainsByLocation = (distinctDomains: any[]) => {
  const locationHashMap = {};
  distinctDomains.forEach(curr => {
    const position = JSON.stringify([curr.latitude, curr.longitude]);
    if (curr.domain) {
      if (!locationHashMap[position]) {
        locationHashMap[position] = [curr];
      } else {
        locationHashMap[position].push(curr);
      }
    }
  });

  return locationHashMap;
};

const calculateStats = (validators: any[], uniqueDomains: any[]) => {
  const stats = {
    total: validators.length,
    runByRipple: validators.filter(a => a.is_ripple).length,
    default: validators.filter(a => a.default).length,
    verified: uniqueDomains.length,
    dominance: undefined
  };

  stats.dominance = stats.total !== 0 ? stats.runByRipple / stats.total : 0;
  return stats;
};

export {
  filterValidators,
  distinctDomains,
  groupDomainsByLocation,
  calculateStats
};
