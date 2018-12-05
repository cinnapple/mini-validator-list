"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("inversify");
const crypto = require("crypto");
const base64 = require("base-64");
const baseX = require("base-x");
const B58_DICT = "rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz";
const base58 = baseX(B58_DICT);
let Crypto = class Crypto {
    constructor() {
        this.addressTypePrefix = Buffer.from([0x1c]);
    }
    _calculateChecksum(payload) {
        const chksum_hash1 = crypto
            .createHash("sha256")
            .update(payload)
            .digest();
        const chksum_hash2 = crypto
            .createHash("sha256")
            .update(chksum_hash1)
            .digest();
        return chksum_hash2.slice(0, 4);
    }
    _calculateBase58(payload, checksum) {
        const dataToEncode = Buffer.concat([payload, checksum]);
        const address = base58.encode(dataToEncode);
        return address;
    }
    parseDefaultUNLBlob(blob) {
        const result = [];
        const validatorList = JSON.parse(base64.decode(blob)).validators;
        for (const pubkey_hex of validatorList) {
            const pubkey = Buffer.from(pubkey_hex.validation_public_key, "hex");
            const payload = Buffer.concat([this.addressTypePrefix, pubkey]);
            const checksum = this._calculateChecksum(payload);
            const address = this._calculateBase58(payload, checksum);
            result.push(address);
        }
        return result;
    }
};
Crypto = tslib_1.__decorate([
    inversify_1.injectable()
], Crypto);
exports.default = Crypto;
//# sourceMappingURL=crypto.js.map