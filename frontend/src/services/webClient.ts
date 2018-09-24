import axios from "axios";
import { setupCache } from "axios-cache-adapter";

const cache = setupCache({
  maxAge: 15 * 60 * 1000, // 15 mins
  exclude: { query: false },
  key: req => req.url + JSON.stringify(req.params)
});

const webClient = axios.create({
  baseURL: "api",
  adapter: cache.adapter
});

const get = <T>(url) => {
  return webClient.get<Store.Response<T>>(url).then(result => result.data);
};

export { get, webClient };
