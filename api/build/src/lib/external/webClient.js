"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("inversify");
const axios_1 = require("axios");
let WebClient = class WebClient {
    constructor() {
        this.get = (url) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return axios_1.default.get(url).then(a => a.data);
        });
    }
};
WebClient = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], WebClient);
exports.default = WebClient;
//# sourceMappingURL=webClient.js.map