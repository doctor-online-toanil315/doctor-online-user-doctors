import { Space } from 'antd';
import { Dropdown } from '../../components';
import React, { useState } from 'react';
import { Button, Modal, MoreVertIcon } from '@nexthcm/components';
import { IDataTableNoCheck } from '../../types/LeaveList';
import { StyleMenu } from './styleListMenu';
import ModalContent from './ModalContent';
import { useTranslation } from 'react-i18next';

interface RecordDropdown {
  record: IDataTableNoCheck;
}

const ListDropdown = ({ record }: RecordDropdown) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [status, setStatus] = useState('');
  const [id, setId] = useState<string>('');
  const { t } = useTranslation();

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const handleModal = (id: string) => {
    setId(id);
  };
  const item: any = [];

  for (let index = 0; index < record.nextStates.length; index++) {
    const newItems = {
      label: (
        <Button
          onClick={() => {
            handleModal(record?.nextStates[index]?.state?.id);
            setStatus(record?.nextStates[index]?.state?.name);
            setIsShowModal(true);
          }}
        >
          <p>{record?.nextStates[index]?.transition?.name}</p>
        </Button>
      ),
      key: record?.nextStates[index]?.id
    };
    item.push(newItems);
  }

  const listMenu = <StyleMenu items={item} />;

  return (
    <>
      <Dropdown placement="bottomRight" overlay={listMenu} trigger={['click']}>
        <a
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <Space>
            <MoreVertIcon />
          </Space>
        </a>
      </Dropdown>
      <Modal
        type="confirm"
        visible={isShowModal}
        onCancel={handleCloseModal}
        confirmIcon="?"
        title={`${t('modal.waitingAction')} ${status}`}
      >
        <ModalContent id={id} record={record} handleCloseModal={handleCloseModal} />
      </Modal>
    </>
  );
};
export default ListDropdown;
