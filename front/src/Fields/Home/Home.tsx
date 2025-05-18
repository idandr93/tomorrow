import { useEffect, useState } from 'react';
import axios from 'axios';
import { Flex, Spin, Typography } from 'antd';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import AlertsTable from '../Table/AlertsTable';

const path = 'http://localhost:4003/api/weather';

export const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState('');
  const [searchTerm, setSearchTerm] = useState('New York');

  useEffect(() => {
    setIsLoading(true);
    setErrorData('');

    axios
      .get(`${path}?location=${searchTerm}`)
      .then((response) => {
        console.log('response', response.data);
        setData(response.data);
      })
      .catch((e) => {
        console.error('Error fetching data:', e);
        setErrorData('There was an error fetching the data');
        setData(undefined);
      })
      .finally(() => setIsLoading(false));
  }, [searchTerm]);

  console.log('errorData ', errorData);

  return (
    <Flex vertical>
      {errorData && <Typography.Text>{errorData}</Typography.Text>}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <WeatherCard city={searchTerm} weather={data} />
      )}

      <AlertsTable />
    </Flex>
  );
};
