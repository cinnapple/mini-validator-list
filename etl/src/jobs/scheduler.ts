import * as schedule from "node-schedule";
import { kernel } from "../di/inversify.config";
import { IJob, IJobConfig } from "../types";
import * as debug from "debug";
const _d = debug("etl:Scheduler");

class Scheduler {
  static create(jobConfig: IJobConfig) {
    const run = async () => {
      const job = kernel.get<IJob>(Symbol.for(jobConfig.name));
      _d(`executing the job...${jobConfig.name}`);
      const ctx = {
        start: new Date(),
        args: jobConfig.args || {}
      };
      return job
        .execute(ctx)
        .then(() => _d(`finished executing the job ${jobConfig.name}`))
        .catch(err => _d(err));
    };
    if (jobConfig.runImmediate) {
      run();
    }
    const j = schedule.scheduleJob(jobConfig.cron, run);
  }
}

export default Scheduler;
