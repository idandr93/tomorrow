import { getWeatherData } from '../controller/weather/weatherController';

import express from 'express';

const router = express.Router();
router.use(express.json());

router.get('/', getWeatherData);

export default router;
