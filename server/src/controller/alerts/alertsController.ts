import { Request, Response } from 'express';
import AlertsModel from '../../models/AlertsModel';
import { AlertState, CreateAlertRequestBody } from './alertsController.types';

const operatorRegex = /(===|!==|>=|<=|==|>|<)/;

export const createAlert = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const body: CreateAlertRequestBody = req.body;
    const { email, city, coordinates, parameters, threshold, name } = body;

    // basic validation
    if ((!coordinates && !city) || !parameters || !threshold) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const conditions = threshold.split(',').reduce((acc, thr) => {
      const match = thr.match(operatorRegex);
      if (!match) return acc;
      const thresholdValue = thr.split(match[0]);
      if (thresholdValue.length === 0) return acc;
      const numberValue = thresholdValue[1].trim();
      if (!isNaN(Number(numberValue))) {
        acc[thresholdValue[0].trim().toLowerCase()] = {
          operator: match[0],
          value: numberValue,
        };
      }
      return acc;
    }, {} as { [key: string]: { operator: string; value: string } });

    if (Object.values(conditions).some((condition) => condition === null)) {
      res.status(400).json({ message: 'Wrong format of condition' });
      return;
    }

    const alert = new AlertsModel({
      city,
      email,
      coordinates,
      parameters,
      conditions,
      alertState: AlertState.NotTriggered,
      name,
    });

    await alert.save();
    res.status(201).json(alert);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create alert' });
  }
};

export const getAllAlerts = async (req: Request, res: Response) => {
  try {
    const alerts = await AlertsModel.find().lean();
    res.status(200).json(alerts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};

export const deleteAlert = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await AlertsModel.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete alert' });
  }
};

export const updateAlert = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body: CreateAlertRequestBody = req.body;
    const { email, city, coordinates, parameters, threshold, name } = body;

    // basic validation
    if ((!coordinates && !city) || !parameters || !threshold) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const conditions = threshold.split(',').reduce((acc, thr) => {
      const match = thr.match(operatorRegex);
      if (!match) return acc;
      const thresholdValue = thr.split(match[0]);
      if (thresholdValue.length === 0) return acc;
      const numberValue = thresholdValue[1].trim();
      if (!isNaN(Number(numberValue))) {
        acc[thresholdValue[0].trim().toLowerCase()] = {
          operator: match[0],
          value: numberValue,
        };
      }
      return acc;
    }, {} as { [key: string]: { operator: string; value: string } });

    if (Object.values(conditions).some((condition) => condition === null)) {
      res.status(400).json({ message: 'Wrong format of condition' });
      return;
    }

    await AlertsModel.findByIdAndUpdate(id, {
      city,
      email,
      coordinates,
      parameters,
      conditions,
      name,
    });

    res.status(200).json({ message: 'Alert updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update alert' });
  }
};
