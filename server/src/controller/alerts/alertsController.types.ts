import { Document } from 'mongoose';

export enum AlertState {
  Triggered = 'triggered',
  NotTriggered = 'notTriggered',
}

export enum ConditionTypes {
  GreaterThan = '>',
  LessThan = '<',
  GreaterThanOrEqual = '>=',
  LessThanOrEqual = '<=',
  Equal = '===',
  NotEqual = '!==',
}

export interface IAlert extends Document {
  email?: string;
  city?: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
  parameters: string;
  conditions: {
    [key: string]: {
      operator: ConditionTypes;
      value: number;
    };
  };
  alertState: AlertState;
  name?: string;
  createdAt: Date;
}

export interface CreateAlertRequestBody {
  threshold: string;
  parameters: string;
  name?: string;
  city?: string;
  email?: string;
  coordinates?: string;
}
