import { injectable, inject } from "inversify";
import "reflect-metadata";
import { Lib, Cache } from "./types";
import { TYPES } from "./inversify.types";
import { _sort, _groupByWithCount, _addRate } from "./util";

@injectable()
export default class StatsUtil {
  constructor(@inject(TYPES.Lib.Logger) protected _logger: Lib.ILogger) {}

  private static byCountryStats = (
    mainNetValidators: Cache.MergedData[]
  ): any => {
    const verifiedValidators = mainNetValidators.filter(
      a => a.verified && a.country_name
    );
    let verifiedList = _groupByWithCount(
      verifiedValidators,
      "country_name"
    ).map(a => {
      const found = verifiedValidators.find(
        b => a.country_name === b.country_name
      );
      return {
        ...a,
        country_code: found.country_code
      };
    });
    _sort(verifiedList, "count", "dsc");
    verifiedList = _addRate(verifiedList, "count");

    const defaultUnlValidators = mainNetValidators.filter(
      a => a.default && a.country_name
    );
    let defaultList = _groupByWithCount(
      defaultUnlValidators,
      "country_name"
    ).map(a => {
      const found = defaultUnlValidators.find(
        b => a.country_name === b.country_name
      );
      return {
        ...a,
        country_code: found.country_code
      };
    });
    _sort(defaultList, "count", "dsc");
    defaultList = _addRate(defaultList, "count");

    return {
      summaryVerifiedGroupByCountryTotal: verifiedList.length,
      summaryVerifiedGroupByCountryData: verifiedList,
      summaryDefaultUnlGroupByCountryTotal: defaultList.length,
      summaryDefaultUnlGroupByCountryData: defaultList
    };
  };

  private static defaultUnlStats = (
    mainNetValidators: Cache.MergedData[]
  ): any => {
    const defaultValidators = mainNetValidators.filter(a => a.default);
    const total = defaultValidators.length;
    const ripple = defaultValidators.filter(a => a.is_ripple).length;
    const nonRipple = total - ripple;

    // group by domain
    const list = _groupByWithCount(defaultValidators, "domain");
    _sort(list, "domain", "asc");

    return {
      defaultUnlTotal: total,
      defaultUnlDominance: ripple,
      defaultUnlTotalData: list,
      defaultUnlDominanceRippleTotal: ripple,
      defaultUnlDominanceNonRippleTotal: nonRipple
    };
  };

  private static allValidatorStats = (
    mainNetValidators: Cache.MergedData[]
  ): any => {
    const total = mainNetValidators.length;
    const verified = mainNetValidators.filter(a => a.verified).length;
    const unverified = mainNetValidators.filter(a => !a.verified).length;
    const ripple = mainNetValidators.filter(a => a.is_ripple).length;
    const nonRipple = mainNetValidators.filter(a => !a.is_ripple).length;

    return {
      allValidatorsTotal: total,
      allValidatorsVerified: verified,
      allValidatorsUnverified: unverified,
      allValidatorsRipple: ripple,
      allValidatorsNonRipple: nonRipple,
    };
  };

  static getSummaryStats(validatorInfo: Cache.MergedData[]): any {
    const mainNetValidators = validatorInfo.filter(a => !a.is_alt_net);
    return {
      ...this.allValidatorStats(mainNetValidators),
      ...this.defaultUnlStats(mainNetValidators),
      ...this.byCountryStats(mainNetValidators)
    };
  }
}
