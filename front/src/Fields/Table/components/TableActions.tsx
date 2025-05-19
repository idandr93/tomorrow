import { Space, Button, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import isFunction from 'lodash/isFunction';
import { FC } from 'react';

export const TableActions: FC<{
  onUpdateClick?: () => void;
  onDeleteClick?: () => void;
}> = ({ onUpdateClick, onDeleteClick }) => {
  if (!isFunction(onUpdateClick) && !isFunction(onDeleteClick)) {
    return null;
  }

  return (
    <Space>
      {isFunction(onUpdateClick) && (
        <Tooltip placement="top" title={'Update'}>
          <Button
            size="small"
            onClick={onUpdateClick}
            icon={<EditOutlined />}
          />
        </Tooltip>
      )}

      {isFunction(onDeleteClick) && (
        <Tooltip placement="top" title={'Delete'}>
          <Button
            size="small"
            onClick={onDeleteClick}
            icon={<DeleteOutlined />}
          />
        </Tooltip>
      )}
    </Space>
  );
};
