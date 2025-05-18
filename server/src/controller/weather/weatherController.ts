import { Request, Response } from 'express';
import { WeatherQuery } from './weatherController.types';

const weatherCache: Record<string, { data: any; timestamp: number }> = {};
const cacheDuration = 10 * 60 * 1000; // 10 min

export const getWeatherData = async (req: Request, res: Response) => {
  const { location, coords, units } = req.query as WeatherQuery;

  if ((!location || location === undefined) && !coords) {
    res.status(400).json({ error: 'Location is required' });
    return;
  }

  let cacheKey: string;

  if (coords) {
    cacheKey = `coords:${coords}`;
  } else if (location) {
    cacheKey = `city:${location.toLowerCase()}`;
  } else {
    res.status(400).json({ message: 'Missing city or coordinates' });
    return;
  }

  const cached = weatherCache[cacheKey];
  // Check if the data is cached and not expired
  if (cached && Date.now() - cached.timestamp < cacheDuration) {
    res.json(cached.data);
    return;
  }

  const query = location ?? coords;
  const url = `https://api.tomorrow.io/v4/weather/forecast?location=${query}&apikey=${process.env.TOMORROW_API_KEY}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'accept-encoding': 'deflate, gzip, br',
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    const { timelines } = json;
    if (!timelines || timelines.length === 0) {
      res.status(404).json({ message: 'No weather data found' });
      return;
    }

    const { values } = timelines.hourly[0];

    const { temperature, precipitationProbability, windSpeed, humidity } =
      values;
    const weatherData = {
      temperature,
      precipitationProbability,
      windSpeed,
      humidity,
    };
    weatherCache[cacheKey] = {
      data: weatherData,
      timestamp: Date.now(),
    };
    res.status(201).json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};
