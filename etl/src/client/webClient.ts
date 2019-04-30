import { injectable, inject, TYPES } from "../di";
import axios, { AxiosInstance } from "axios";
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

  get<T>(url: string) {
    return this._axios.get<T>(url).then((res: any) => res.data);
  }
}

export default WebClient;
