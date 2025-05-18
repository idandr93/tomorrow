import {
  createAlert,
  getAllAlerts,
} from '../controller/alerts/alertsController';

import express from 'express';

const alertsRouter = express.Router();
alertsRouter.use(express.json());

alertsRouter.post('/', createAlert);
alertsRouter.get('/', getAllAlerts);

export default alertsRouter;
