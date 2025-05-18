import { useState } from 'react';
import { Table, Modal, message, Flex, Button } from 'antd';
import { alertsColumns } from './Table.utils';
import { AlertsForm } from './components/AlertsForm';
import { useAlerts } from '../../Hooks/useAlerts';
import { IAlerts, ICreateAlert } from './AlertsTable.types';

export default function AlertsTable() {
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const { data, isLoading: isStadiumLoading, createAlert } = useAlerts();

  const onSubmit = async (values: IAlerts) => {
    try {
      setLoading(true);
      const { location, ...rest } = values;
      const data: ICreateAlert = {
        ...rest,
        city: location.includes(',') ? undefined : location,
        coords: location.includes(',') ? location : undefined,
      };

      await createAlert(data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Table
        dataSource={data ?? []}
        loading={isStadiumLoading}
        rowKey="_id"
        bordered
        pagination={false}
        scroll={{ y: 220 }}
        onRow={() => ({
          style: { height: 75 },
        })}
        columns={alertsColumns}
        title={() => (
          <Flex justify="space-between" align="middle">
            <Button type="primary" onClick={() => setModalOpen(true)}>
              {'Add Alert'}
            </Button>
            <Modal
              title={'Create New Alert'}
              open={isModalOpen}
              footer={null}
              onCancel={() => setModalOpen(false)}
            >
              <AlertsForm onSubmit={onSubmit} isLoading={isLoading} />
            </Modal>
          </Flex>
        )}
      />
    </div>
  );
}
