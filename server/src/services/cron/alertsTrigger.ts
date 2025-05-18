import { CronJob } from 'cron';
import AlertsModel from '../../models/AlertsModel';
import { alertsEvaluator } from './alertsEvaluator';

const checkAlertsTriggers = async () => {
  const allAlerts = await AlertsModel.find();

  await alertsEvaluator(allAlerts);
};

const job = new CronJob(
  '*/10 * * * *', // cronTime: every 10 minutes
  checkAlertsTriggers, // onTick
  null, // onComplete
  true, // start
  'Asia/Jerusalem', // timeZone
  null, // context
  false // runOnInit
);

export default job;
