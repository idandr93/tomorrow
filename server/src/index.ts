import express from 'express';
import cors from 'cors';
import router from './routes/weather';
import alertsRouter from './routes/alerts';
import job from './services/cron/alertsTrigger';
import mongoose from 'mongoose';

const app = express();
const PORT = 4003;

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
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/weather', router);
app.use('/api/alerts', alertsRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
