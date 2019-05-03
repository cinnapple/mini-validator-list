import { injectable, inject, TYPES } from "../di";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { IWebClient } from "../types";

@injectable()
class WebClient implements IWebClient {
  private _axios: AxiosInstance;

  constructor() {
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      responseType: "json"
    };
    this._axios = axios.create(requestConfig);
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this._axios.get<T>(url, config).then((res: any) => res.data);
  }
}

export default WebClient;
