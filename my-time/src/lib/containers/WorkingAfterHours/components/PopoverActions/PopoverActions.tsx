import React, { ReactNode, useState } from 'react';
import { Popover } from 'antd';
import { Button, Modal, openNotification, Text } from '@nexthcm/components';
import { NextState } from '../../../../types';
import { usePutRequestManagementMutation } from '../../../../services/MyTimeApp';
import { useTranslation } from 'react-i18next';
import './styles.scss';

interface PopoverActionsProps {
  id: string;
  dataStates: NextState[];
  children?: ReactNode;
}

const PopoverActions = ({ id, dataStates, children }: PopoverActionsProps) => {
  const [open, setOpen] = useState(false);
  const [updateWorkingAfterHours, { isLoading }] = usePutRequestManagementMutation();
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [item, setItem] = useState<NextState>();
  const { t } = useTranslation();
  const onStateClick = () => {
    updateWorkingAfterHours({
      type: 'ot-requests',
      body: {
        id: id,
        request: {
          nextState: item?.state.id
        }
      }
    })
      .unwrap()
      .then(() => {
        openNotification({
          type: 'success',
          message: t('common:notification.updateSuccess', { name: '' })
        });
        setIsModalConfirm(false);
        setOpen(false);
      })
      .catch(() => {
        openNotification({
          type: 'error',
          message: t('common:ERRORS.INTERNAL_SERVER_ERROR')
        });
        setIsModalConfirm(false);
        setOpen(false);
      });
  };
  return (
    <Popover
      getPopupContainer={(trigger) => trigger.parentElement!}
      overlayClassName="styled-view-detail-popover"
      trigger="click"
      visible={open}
      placement="bottom"
      onVisibleChange={(e) => {
        !isModalConfirm && setOpen(e);
      }}
      content={
        <div className="dropdown-group-btn">
          {dataStates.map((item) => (
            <button
              key={item.id}
              className="button-content"
              onClick={() => {
                setItem(item);
                setIsModalConfirm(true);
              }}
            >
              <Text>{item.transition.name}</Text>
            </button>
          ))}
        </div>
      }
    >
      {children}
      <Modal
        type="confirm"
        visible={isModalConfirm}
        className="modal-confirm-employees"
        confirmIcon="?"
        title={
          <span>
            {t('performOperation')}
            <br />
            {item?.state.name}
          </span>
        }
      >
        <div className="button" style={{ justifyContent: 'center' }}>
          <Button
            className="button-cancel"
            height={44}
            key="back"
            border="outline"
            onClick={() => {
              setIsModalConfirm(false);
              setOpen(false);
            }}
          >
            {t('common:confirm.cancel')}
          </Button>
          <Button
            className="button-ok"
            height={44}
            key="submit"
            loading={isLoading}
            disabled={isLoading}
            onClick={onStateClick}
          >
            {t('common:confirm.ok')}
          </Button>
        </div>
      </Modal>
    </Popover>
  );
};

export default React.memo(PopoverActions);
