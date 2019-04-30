import { injectable, inject, TYPES } from "../di";
import { IGithubApi } from "../types";
import RippleUnlHistoryFetchStrategy from "./rippleUnlHistoryFetchStrategy";

@injectable()
class UnlHistoryFetchStrategyFactory {
  constructor(@inject(TYPES.GithubApi) private _githubApi: IGithubApi) {}

  create(host: string) {
    switch (host) {
      case "https://vl.ripple.com":
        return new RippleUnlHistoryFetchStrategy(this._githubApi);
    }
  }
}

export default UnlHistoryFetchStrategyFactory;
