import { model, Schema } from 'mongoose';
import { IAlert } from '../controller/alerts/alertsController.types';

const AlertSchema = new Schema<IAlert>({
  email: String,
  name: String,
  city: String,
  coordinates: {
    type: {
      lat: { type: Number },
      lon: { type: Number },
    },
    default: undefined,
  },
  parameters: { type: [String], required: true },
  conditions: {
    type: Object,
    required: true,
  },
  alertState: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IAlert>('Alert', AlertSchema);
