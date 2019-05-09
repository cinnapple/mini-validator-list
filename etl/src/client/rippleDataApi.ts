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

  getNetworkValidators = () =>
    this._axios
      .get("/network/validators")
      .then((res: any) => res.data.validators);

  getValidatorReports = (pubkey: string) =>
    this._axios
      .get(`/network/validators/${pubkey}/reports`)
      .then((res: any) => res.data.reports);

  getManifests = (pubkey: string) =>
    this._axios
      .get(`/network/validators/${pubkey}/manifests`)
      .then((res: any) => res.data.manifests);

  getTopologyNodes = () =>
    this._axios
      .get(`/network/topology/nodes`)
      .then((res: any) => res.data.nodes);
}

export default RippleDataApi;
