import { Tag } from 'antd';

export const alertsColumns = [
  {
    title: 'Alert Name',
    width: 200,
    dataIndex: 'name',
  },
  {
    title: 'Email',
    width: 200,
    dataIndex: 'email',
  },
  {
    title: 'Parameters',
    width: 200,
    dataIndex: 'parameters',
    render: (parameter: string) => <Tag key={parameter}>{parameter}</Tag>,
  },
];
