"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("../../inversify");
const winston = require("winston");
class Logger {
    constructor(_name, _logger) {
        this._name = _name;
        this._logger = _logger;
        this.info = (message) => {
            this._logger.info(message, { name: this._name });
        };
        this.error = (message) => {
            this._logger.error(message, { name: this._name });
        };
        this.warn = (message) => {
            this._logger.warn(message, { name: this._name });
        };
    }
}
let LoggerFactory = class LoggerFactory {
    constructor() {
        this.create = (name) => {
            return new Logger(name, this._logger);
        };
        const transports = [];
        this._addConsoleLogging(transports);
        this._logger = winston.createLogger({
            transports: transports
        });
    }
    _addConsoleLogging(transports) {
        transports.push(new winston.transports.Console());
    }
};
LoggerFactory = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], LoggerFactory);
exports.default = LoggerFactory;
//# sourceMappingURL=loggerFactory.js.map