import { injectable, inject } from "inversify";

import Lib from "../lib";
import Service from "../service";
import Domain from "../domain";
import Proxy from "../proxy";
import Api from "../api";

const TYPES = {
  ...Lib,
  ...Service,
  ...Domain,
  ...Proxy,
  ...Api
};

export { TYPES, inject, injectable };
