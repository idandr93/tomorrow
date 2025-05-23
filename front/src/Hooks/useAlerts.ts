import { useQuery } from 'react-query';
import axios from 'axios';
import {
  IAlerts,
  ICreateAlert,
  IUpdateAlert,
} from '../Fields/Table/AlertsTable.types';

const endpoint = '/api/alerts';
const alertsEndpoint = `${
  process.env.REACT_APP_BASE_API || 'http://localhost:4003'
}${endpoint}`;

const fetchAlerts = async (): Promise<{ data: IAlerts[] }> => {
  const res = await axios.get(alertsEndpoint);
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
    await axios.post(alertsEndpoint, values);
    refetch();
  };

  const deleteAlert = async (id: string) => {
    await axios.delete(`${alertsEndpoint}/${id}`);
    refetch();
  };

  const updateAlert = async (values: IUpdateAlert) => {
    await axios.put(`${alertsEndpoint}/${values._id}`, values);
    refetch();
  };

  return {
    isLoading,
    data: response?.data,
    createAlert,
    deleteAlert,
    updateAlert,
  };
}
