import {
  BellIcon,
  BellOffIcon,
  Button,
  Modal,
  SettingIcon,
  Title,
} from '@nexthcm/components';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HeaderStyled } from './styles';
import { useNavigate } from 'react-router-dom';
import { Radio, RadioChangeEvent, Space } from 'antd';
import { usePostNotificationMutation } from '@nexthcm/common';

interface HeaderProps {
  turnOff?: boolean;
  setOpen: any;
}

const options = [
  {
    value: 'MINUTES_15',
    label: 'notification.TIME_DURATION.' + 'for15Minutes',
  },
  {
    value: 'MINUTES_30',
    label: 'notification.TIME_DURATION.' + 'for30Minutes',
  },
  { value: 'HOURS_1', label: 'notification.TIME_DURATION.' + 'for1Hour' },
  { value: 'HOURS_4', label: 'notification.TIME_DURATION.' + 'for4Hours' },
];
const Header = ({ setOpen, turnOff }: HeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [postNotification] = usePostNotificationMutation();
  const [visible, setVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState(options[0].value);
  const [isTurnOff, setIsTurnOff] = useState(turnOff);
  const onSettingClick = () => {
    setOpen(false);
    navigate('/notifications/settings');
  };
  const onTurnNotificationsClick = () => {
    setVisible(true);
    setOpen(false);
  };
  const onChange = (e: RadioChangeEvent) => {
    setChecked(e.target.value);
  };
  const onTurnOff = () => {
    postNotification({
      params: {
        turnOffTypeDTO: checked,
      },
      url: '/notification-mobile/turn-off',
    })
      .unwrap()
      .then(() => {
        setVisible(false);
        setIsTurnOff(true);
      });
  };
  const onTurnOn = () => {
    postNotification({
      params: {},
      url: '/notification-mobile/turn-on',
    })
      .unwrap()
      .then(() => {
        setIsTurnOff(false);
      });
  };
  return (
    <HeaderStyled>
      <Title level={2}>{t('notification.title')}</Title>
      <div className="right">
        <Button
          border="borderless"
          icon={
            isTurnOff ? (
              <BellOffIcon width={28} height={28} />
            ) : (
              <BellIcon
                onClick={onTurnNotificationsClick}
                width={28}
                height={28}
              />
            )
          }
          onClick={isTurnOff ? onTurnOn : onTurnNotificationsClick}
        ></Button>
        <Button
          border="borderless"
          icon={<SettingIcon width={28} height={28} />}
          onClick={onSettingClick}
        ></Button>
      </div>
      <Modal
        className="modal-turnoff-notifications"
        destroyOnClose={true}
        visible={visible}
        onCancel={() => setVisible(false)}
        width={'480px'}
      >
        <Title level={2}>{t('notification.turnOffNotifications')}</Title>
        <Radio.Group onChange={onChange} value={checked}>
          <Space direction="vertical">
            {options.map((item) => (
              <Radio key={item.value} value={item.value}>
                {t(item.label)}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
        <div className="btn-group">
          <Button key="submit" onClick={onTurnOff}>
            {t('confirm.save')}
          </Button>
          <Button
            className="cancle-btn"
            key="back"
            border="outline"
            onClick={() => setVisible(false)}
          >
            {t('confirm.cancel')}
          </Button>
        </div>
      </Modal>
    </HeaderStyled>
  );
};

export default Header;
