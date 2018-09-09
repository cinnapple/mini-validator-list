import "reflect-metadata";
import { injectable } from "inversify";

import axios from "axios";

@injectable()
export default class WebClient  {
  constructor() {}

  get = async <T>(url: string) => {
    return axios.get<T>(url).then(a => a.data);
  };
}
