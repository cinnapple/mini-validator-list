import * as cubejs from "@cubejs-client/core";
import config from "../config";

const cubejsClient = cubejs(config.cubejs.token, {
  apiUrl: config.cubejs.apiUrl
});

export default cubejsClient;
