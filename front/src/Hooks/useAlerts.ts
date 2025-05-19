import { useQuery } from 'react-query';
import axios from 'axios';
import { IAlerts, ICreateAlert } from '../Fields/Table/AlertsTable.types';

const endpoint = '/api/alerts';

const fetchAlerts = async (): Promise<{ data: IAlerts[] }> => {
  const res = await axios.get(`${process.env.REACT_APP_BASE_API}${endpoint}`);
  if (res.status !== 200) throw new Error('Failed to fetch alerts');
  return res;
};

export function useAlerts() {
  const {
    isLoading,
    data: response,
    refetch,
  } = useQuery<{ data: IAlerts[] }>({
    queryKey: [endpoint],
    queryFn: fetchAlerts,
  });

  const createAlert = async (values: ICreateAlert) => {
    await axios.post(endpoint, values);
    refetch();
  };

  return {
    isLoading,
    data: response?.data,
    createAlert,
  };
}
