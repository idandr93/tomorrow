import {
  createAlert,
  deleteAlert,
  getAllAlerts,
  updateAlert,
} from '../controller/alerts/alertsController';

import express from 'express';

const alertsRouter = express.Router();
alertsRouter.use(express.json());

alertsRouter.post('/', createAlert);
alertsRouter.get('/', getAllAlerts);
alertsRouter.put('/:id', updateAlert);
alertsRouter.delete('/:id', deleteAlert);

export default alertsRouter;
