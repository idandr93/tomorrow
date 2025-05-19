import { Form, Input, Button, Select } from 'antd';
import { IAlerts } from '../AlertsTable.types';
import { FC } from 'react';
import { AlertsParameters } from './AlertsForm.utils';

interface AlertsFormProps {
  onSubmit: (values: IAlerts) => void;
  isLoading: boolean;
  initialValues: IAlerts | undefined;
}
export const AlertsForm: FC<AlertsFormProps> = ({
  onSubmit,
  isLoading,
  initialValues = {},
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onSubmit}
      initialValues={initialValues}
    >
      <Form.Item hidden name="_id">
        <Input />
      </Form.Item>
      <Form.Item name="email" label={'Email'}>
        <Input />
      </Form.Item>
      <Form.Item name="name" label={'Alert Name'}>
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="location"
        label={'Location'}
      >
        <Input placeholder="Enter city name or coordinates" />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="parameters"
        label={'Add Params to Watch'}
      >
        <Select
          mode="multiple"
          placeholder="Select parameters"
          options={[
            { label: 'Temperature', value: AlertsParameters.TEMPERATURE },
            { label: 'Windspeed', value: AlertsParameters.WIND_SPEED },
            { label: 'Humidity', value: AlertsParameters.HUMIDITY },
            { label: 'Wind Direction', value: AlertsParameters.WIND_DIRECTION },
            { label: 'Precipitation', value: AlertsParameters.PRECIPITATION },
            { label: 'Cloud Cover', value: AlertsParameters.CLOUD_COVER },
          ]}
        />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="threshold"
        label={'Add Thresholds- Seperated by ","'}
      >
        <Input placeholder="temperature>20, humidity<50" />
      </Form.Item>

      <Button
        block
        loading={isLoading}
        style={{ marginTop: 24 }}
        type="primary"
        htmlType="submit"
      >
        {'Save Alert'}
      </Button>
    </Form>
  );
};
