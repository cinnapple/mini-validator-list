import "reflect-metadata";
import { injectable } from "inversify";

import * as crypto from "crypto";
import * as base64 from "base-64";
import * as baseX from "base-x";

const B58_DICT = "rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz";
const base58 = baseX(B58_DICT);

@injectable()
export default class Crypto {
  private addressTypePrefix = Buffer.from([0x1c]);

  private _calculateChecksum(payload: Buffer): Buffer {
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

  private _calculateBase58(payload: Buffer, checksum: Buffer): string {
    const dataToEncode = Buffer.concat([payload, checksum]);
    const address = base58.encode(dataToEncode);
    return address;
  }

  parseDefaultUNLBlob(blob: string) {
    // the code is based on https://developers.ripple.com/accounts.html#address-encoding
    const result: string[] = [];
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
}
