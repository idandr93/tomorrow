import { Card } from 'antd';
import { FC } from 'react';

interface WeatherCardProps {
  city: string;
  weather?: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    precipitationProbability: string;
  };
}
const WeatherCard: FC<WeatherCardProps> = ({ city, weather }) => {
  return (
    <Card
      title={`Weather in ${city}`}
      style={{ width: 300, textAlign: 'center' }}
    >
      <p>🌡️ Temperature: {weather?.temperature}°C</p>
      <p>💧 Humidity: {weather?.humidity}%</p>
      <p>🌬️ Wind Speed: {weather?.windSpeed} km/h</p>
      <p>⛅ Precipitation: {weather?.precipitationProbability}</p>
    </Card>
  );
};

export default WeatherCard;
