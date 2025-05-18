import {
  AlertState,
  ConditionTypes,
  IAlert,
} from '../../controller/alerts/alertsController.types';
import AlertsModel from '../../models/AlertsModel';
import sendMail from '../../utils/sendEmail';

const evaluateCondition = (
  value: number,
  operator: ConditionTypes,
  threshold: number
): boolean => {
  switch (operator) {
    case ConditionTypes.GreaterThan:
      return value > threshold;
    case ConditionTypes.LessThan:
      return value < threshold;
    case ConditionTypes.GreaterThanOrEqual:
      return value >= threshold;
    case ConditionTypes.LessThanOrEqual:
      return value <= threshold;
    case ConditionTypes.Equal:
      return value === threshold;
    case ConditionTypes.NotEqual:
      return value !== threshold;
    default:
      return false;
  }
};

export const alertsEvaluator = async (allAlerts: IAlert[]) => {
  for (const alert of allAlerts) {
    const { email, city, coordinates, parameters, conditions } = alert;

    const location = city ?? coordinates;

    if (!location) continue;

    const response = await fetch(
      `https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${process.env.TOMORROW_API_KEY}`,
      {
        headers: {
          accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch for alert ${alert._id} for location ${location}`
      );
      continue;
    }

    const data = await response.json();
    const locationData = data?.data?.values;
    if (!locationData) {
      console.error(
        `No location data found for alert ${alert._id} for location ${location}`
      );
      continue;
    }
    const triggeredParams = [];
    const params = parameters.split(',');
    for (const parameter of params) {
      const param = parameter.trim();
      const value = locationData[param];
      const condition = conditions[param.toLowerCase()];

      if (value === undefined || condition === undefined) {
        console.warn(
          `Parameter ${parameter} missing in response for alert ${alert._id}`
        );
        continue;
      }
      const { operator, value: threshold } = condition;
      const triggered = evaluateCondition(value, operator, threshold);
      if (triggered) {
        triggeredParams.push(parameter);
        await AlertsModel.findByIdAndUpdate(alert._id, {
          alertState: AlertState.Triggered,
        });
      }
    }
    if (triggeredParams.length > 0 && email && city) {
      await sendMail(email, 'trigger alert', city);
    }
  }
};
