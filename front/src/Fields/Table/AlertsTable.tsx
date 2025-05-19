import { useState } from 'react';
import { Table, Modal, message, Flex, Button } from 'antd';
import { alertsColumns } from './Table.utils';
import { AlertsForm } from './components/AlertsForm';
import { useAlerts } from '../../Hooks/useAlerts';
import { IAlerts, IAlertsResponse, IUpdateAlert } from './AlertsTable.types';
import { TableActions } from './components/TableActions';

export default function AlertsTable() {
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<IAlerts | undefined>(
    undefined
  );

  const {
    data,
    isLoading: isStadiumLoading,
    createAlert,
    deleteAlert,
    updateAlert,
  } = useAlerts();

  const onSubmit = async (values: IAlerts) => {
    try {
      setLoading(true);
      const { location, ...rest } = values;
      const data: IUpdateAlert = {
        ...rest,
        city: location.includes(',') ? undefined : location,
        coords: location.includes(',') ? location : undefined,
      };

      const action = values?._id ? updateAlert : createAlert;

      await action(data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onUpdateClick = (record: IAlertsResponse) => {
    setModalOpen(true);
    const conditionString = Object.entries(record.conditions)
      .map(([key, { operator, value }]) => `${key} ${operator} ${value}`)
      .join(', ');
    setInitialValues({
      ...record,
      name: record.name ?? '',
      email: record.email ?? '',
      location: (record.city || record.coordinates) ?? '',
      threshold: conditionString,
    });
  };

  const onDeleteClick = async ({
    _id,
    name,
  }: {
    _id: string;
    name: string;
  }) => {
    try {
      setLoading(true);
      Modal.confirm({
        title: 'Delete Alert',
        content: `Are you sure you want to delete the alert "${name}"?`,
        okText: 'Yes',
        async onOk() {
          await deleteAlert(_id);
        },
      });
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
        columns={[
          ...alertsColumns,
          {
            width: 60,
            render: (record) => {
              return (
                <TableActions
                  onDeleteClick={() => onDeleteClick(record)}
                  onUpdateClick={() => onUpdateClick(record)}
                />
              );
            },
          },
        ]}
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
              <AlertsForm
                onSubmit={onSubmit}
                isLoading={isLoading}
                initialValues={initialValues}
              />
            </Modal>
          </Flex>
        )}
      />
    </div>
  );
}
