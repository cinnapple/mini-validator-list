import { injectable, inject, TYPES } from "../di";
import * as Octokit from "@octokit/rest";
import { IGithubApi, IConfig } from "../types";

@injectable()
class GithubApi implements IGithubApi {
  private _client: Octokit;

  constructor(@inject(TYPES.Config) private _config: IConfig) {
    this._client = new Octokit({ auth: this._config.githubToken });
  }

  getRippleUnlList() {
    return this._client.repos
      .getContents({
        owner: "ripple",
        repo: "vl",
        path: ""
      })
      .then(res => res.data);
  }

  getDomainIconList() {
    return this._client.repos
      .getContents({
        owner: "cinnapple",
        repo: "mini-validator-list-data",
        path: "domain-icons"
      })
      .then(res => res.data);
  }
}

export default GithubApi;
