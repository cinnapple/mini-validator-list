import * as config from "../config.json";
import { IConfig } from "../types.js";
import FatalError from "../errors/FatalError.js";

// ensure all env vars are set
const envVars = {
  ipstackToken: process.env["IPSTACK_API_KEY"],
  githubToken: process.env["GITHUB_API_KEY"],
  postgresUser: process.env["POSTGRES_USER"],
  postgresPassword: process.env["POSTGRES_PASSWORD"],
  postgresDb: process.env["POSTGRES_DB"],
  dbHost: process.env["DB_HOST"]
};

Object.keys(envVars).forEach(key => {
  const val = (envVars as any)[key];
  if (!val) {
    throw new FatalError(`Environment variable ${key} not set`);
  }
});

const merged = <IConfig>{
  ...config,
  ipstackToken: envVars.ipstackToken,
  githubToken: envVars.githubToken,
  connectionString: `postgresql://${envVars.postgresUser}:${
    envVars.postgresPassword
  }@${envVars.dbHost}:5432/${envVars.postgresDb}`
};

export default merged;
