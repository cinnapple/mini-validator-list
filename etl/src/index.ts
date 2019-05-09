import { IJobConfig, IJob, IConfig } from "./types";
import Scheduler from "./jobs/scheduler";
import { kernel } from "./di/inversify.config";
import { TYPES } from "./di";
import * as cluster from "cluster";
import * as debug from "debug";
const _d = debug("etl:Index");

process.on("uncaughtException", err => {
  console.log(err);
});

if (cluster.isMaster) {
  // ensure jobs are properly registerted
  const config = kernel.get<IConfig>(TYPES.Config);
  config.jobs.forEach((jobConfig: IJobConfig) => {
    _d(`checking if ${jobConfig.name} is properly registered to DI kernel...`);
    kernel.get<IJob>(Symbol.for(jobConfig.name));
  });

  const jobNames =
    process.argv.length >= 3 && process.argv.slice(2, process.argv.length);
  _d(`jobs: ${jobNames}`);
  jobNames.forEach(jobName => {
    config.jobs.forEach((jobConfig: IJobConfig) => {
      if (jobName === jobConfig.name || !jobName) {
        if (jobConfig.cron) {
          _d(`scheduling ${jobConfig.name}`);
          Scheduler.create(jobConfig);
        } else if (jobConfig.spawn) {
          _d(`spawning ${jobConfig.name}`);
          const worker = cluster.fork();
          worker.on("message", msg => {
            if (msg.ready) {
              _d(`${jobConfig.name} worker is ready`);
              worker.send({ jobName: jobConfig.name });
            }
          });
        }
      }
    });
  });
} else {
  let job: IJob;
  process.on("message", msg => {
    if (!job && msg.jobName) {
      _d(`child worker starting the job: ${msg.jobName}`);
      job = kernel.get<IJob>(Symbol.for(msg.jobName));
      job.execute();
    }
  });
  process.send({ ready: true });
}

// keep the process running
process.stdin.resume();
