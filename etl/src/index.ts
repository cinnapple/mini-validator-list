import { IJobConfig, IJob, IConfig } from "./types";
import Scheduler from "./jobs/scheduler";
import { kernel } from "./di/inversify.config";
import * as debug from "debug";
import { TYPES } from "./di";
const _d = debug("etl:Index");

process.on("uncaughtException", err => {
  console.log(err);
});

// ensure jobs are properly registerted
const config = kernel.get<IConfig>(TYPES.Config);
config.jobs.forEach((jobConfig: IJobConfig) => {
  _d(`checking if ${jobConfig.name} is properly registered to DI kernel...`);
  kernel.get<IJob>(Symbol.for(jobConfig.name));
});

const jobName = process.argv.length >= 3 && process.argv[2].trim();
config.jobs.forEach((jobConfig: IJobConfig) => {
  if (jobName === jobConfig.name || !jobName) {
    _d(`scheduling ${jobConfig.name}`);
    Scheduler.create(jobConfig);
  }
});

// keep the process running
process.stdin.resume();
