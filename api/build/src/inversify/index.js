"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
exports.injectable = inversify_1.injectable;
exports.inject = inversify_1.inject;
const inversify_types_1 = require("../lib/inversify.types");
const inversify_types_2 = require("../service/inversify.types");
const inversify_types_3 = require("../domain/inversify.types");
const inversify_types_4 = require("../proxy/inversify.types");
const inversify_types_5 = require("../api/inversify.types");
const TYPES = Object.assign({}, inversify_types_1.default, inversify_types_2.default, inversify_types_3.default, inversify_types_4.default, inversify_types_5.default);
exports.TYPES = TYPES;
//# sourceMappingURL=index.js.map