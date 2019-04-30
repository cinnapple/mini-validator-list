import { injectable, inject, TYPES } from "../di";
import axios, { AxiosInstance } from "axios";
import { IRippleDataApi } from "../types";

@injectable()
class RippleDataApi implements IRippleDataApi {
  private _axios: AxiosInstance;

  constructor() {
    this._axios = axios.create({
      baseURL: "https://data.ripple.com/v2",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      responseType: "json"
    });
  }

  getNetworkValidators() {
    return this._axios
      .get("/network/validators")
      .then((res: any) => res.data.validators);
  }
}

export default RippleDataApi;
