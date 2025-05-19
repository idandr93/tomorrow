import express from 'express';
import cors from 'cors';
import router from './routes/weather';
import alertsRouter from './routes/alerts';
import job from './services/cron/alertsTrigger';
import mongoose from 'mongoose';

const app = express();

mongoose
  .connect(process.env.MONGODB_URI || '')
  .then(() => {
    job.start();
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/weather', router);
app.use('/api/alerts', alertsRouter);

app.listen(process.env.PORT || 4003, () => {
  console.log(`Server is running at ${process.env.PORT || 4003}`);
});
