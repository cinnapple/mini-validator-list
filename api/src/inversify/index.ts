import { injectable, inject } from "inversify";

import Lib from "../lib/inversify.types";
import Service from "../service/inversify.types";
import Domain from "../domain/inversify.types";
import Proxy from "../proxy/inversify.types";
import Api from "../api/inversify.types";

const TYPES = {
  ...Lib,
  ...Service,
  ...Domain,
  ...Proxy,
  ...Api
};

export { TYPES, inject, injectable };
