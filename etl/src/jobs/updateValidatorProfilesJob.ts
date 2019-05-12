import { injectable, inject, TYPES } from "../di";
import { IJob, IStore, IWebClient, IGithubApi, HashTable } from "../types";
import * as yaml from "js-yaml";
import * as debug from "debug";
const _d = debug("etl:UpdateValidatorProfilesJob");

@injectable()
class UpdateValidatorProfilesJob implements IJob {
  private url =
    "https://raw.githubusercontent.com/cinnapple/mini-validator-list-data/master/domain-profiles.yml";

  constructor(
    @inject(TYPES.Store) private _store: IStore,
    @inject(TYPES.WebClient) private _webClient: IWebClient,
    @inject(TYPES.GithubApi) private _github: IGithubApi
  ) {}

  private parseDomainProfileYaml = (data: any) => {
    const result = yaml.safeLoad(data);
    return result;
  };

  private fetchDomainIcons = (data: any) => {
    return this._github.getDomainIconList().then(async iconList => {
      for (let i of iconList) {
        const imageDomain = i.name
          .split(".")
          .slice(0, -1)
          .join(".");
        if (data[imageDomain]) {
          _d(`fetching icon for ${imageDomain}`);
          await this._webClient
            .get(i.download_url, { responseType: "arraybuffer" })
            .then(
              (res: any) =>
                (data[imageDomain].icon = Buffer.from(res, "binary").toString(
                  "base64"
                ))
            );
        }
      }
      return data;
    });
  };

  private mergeDomainProfileWithIcons = (data: HashTable<any>) => {
    const last_updated = new Date();
    return Object.keys(data).map((domain: string) => ({
      domain,
      name: data[domain].name,
      description: data[domain].description || "",
      twitter: data[domain].twitter || "",
      web: data[domain].web || "",
      icon: data[domain].icon || "",
      created: last_updated,
      last_updated
    }));
  };

  private fetchData = () => {
    return this._webClient
      .get(this.url)
      .then(this.parseDomainProfileYaml)
      .then(this.fetchDomainIcons)
      .then(this.mergeDomainProfileWithIcons);
  };

  execute() {
    return this.fetchData()
      .then(x =>
        this._store.upsert("profiles", x, "profiles_pk", ["created", "domain"])
      )
      .then(x => this._store.refreshMaterializedView(["m_validatordetails"]));
  }
}

export default UpdateValidatorProfilesJob;
