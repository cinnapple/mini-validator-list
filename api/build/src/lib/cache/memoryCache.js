"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
class InMemoryCache {
    constructor() {
        this.get = (name) => {
            return this._obj[name];
        };
        this.set = (name, value) => {
            if (this.get(name)) {
                this.del(name);
            }
            return (this._obj[name] = value);
        };
        this.del = (name) => {
            delete this._obj[name];
        };
        this.keys = () => {
            return Object.keys(this._obj);
        };
        this._obj = {};
    }
}
exports.default = InMemoryCache;
//# sourceMappingURL=memoryCache.js.map