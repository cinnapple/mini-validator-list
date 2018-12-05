"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const inversify_bootstrap_1 = require("../lib/inversify.bootstrap");
const inversify_bootstrap_2 = require("../service/inversify.bootstrap");
const inversify_bootstrap_3 = require("../domain/inversify.bootstrap");
const inversify_bootstrap_4 = require("../proxy/inversify.bootstrap");
const inversify_bootstrap_5 = require("../api/inversify.bootstrap");
const container = new inversify_1.Container();
exports.container = container;
inversify_bootstrap_1.default(container);
inversify_bootstrap_2.default(container);
inversify_bootstrap_3.default(container);
inversify_bootstrap_4.default(container);
inversify_bootstrap_5.default(container);
//# sourceMappingURL=bootstrap.js.map