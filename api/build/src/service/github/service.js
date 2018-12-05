"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const Octokit = require("@octokit/rest");
const inversify_1 = require("../../inversify");
const fileNameRegexp = new RegExp(/^index\..*\.json$/);
const dateRegexp = new RegExp(/index\.([\d-]{1,})\.json/);
const isDefaultUnlFile = file => {
    return !!fileNameRegexp.exec(file.name);
};
const getDate = file => {
    const match = dateRegexp.exec(file.name);
    if (match.length > 1) {
        return match[1];
    }
    return "";
};
let GitHubService = class GitHubService {
    constructor(_loggerFactory, _configuration) {
        this._configuration = _configuration;
        this._createGitHubClient = () => {
            const oktokit = new Octokit();
            const token = this._configuration.github.token;
            if (token) {
                oktokit.authenticate({
                    token,
                    type: "token"
                });
                this._logger.info(`Authenticated with GitHub.`);
            }
            return oktokit;
        };
        this.getDefaultUnlArchives = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this._logger.info(`getDefaultUnlArchives`);
            const res = yield this._githubClient.repos.getContents({
                owner: "ripple",
                repo: "vl",
                path: ""
            });
            const data = res.data.filter(isDefaultUnlFile).map(file => {
                return {
                    name: file.name,
                    url: file.download_url,
                    date: getDate(file)
                };
            });
            return data;
        });
        this._logger = _loggerFactory.create("Service.GitHubService");
        this._githubClient = this._createGitHubClient();
    }
};
GitHubService = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(inversify_1.TYPES.Lib.LoggerFactory)),
    tslib_1.__param(1, inversify_1.inject(inversify_1.TYPES.Lib.Configuration)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], GitHubService);
exports.default = GitHubService;
//# sourceMappingURL=service.js.map