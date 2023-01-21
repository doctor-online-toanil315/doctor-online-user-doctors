import React from 'react';
import { useTranslation } from 'react-i18next';
import { FooterStyled } from './styles';
import { RootState, useCommonSelector, usePermission } from '@nexthcm/common';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nexthcm/components';

interface FooterProps {
  tabsContent: string;
  onMarkAllRead: () => void;
  setVisible: any;
}

const Footer = ({ setVisible, tabsContent, onMarkAllRead }: FooterProps) => {
  const { t } = useTranslation();
  const [isViewRequest] = usePermission(['VIEW_REQUEST_MANAGEMENT']);
  const navigate = useNavigate();
  const onRequestClick = () => {
    setVisible(false);
    if (isViewRequest) {
      navigate('/my-time/requests');
    } else {
      navigate('/my-time/my-leave');
    }
  };
  return (
    <FooterStyled>
      <Button height={44} border="borderless" onClick={onMarkAllRead}>
        <span>{t('notification.markAllAsRead')} </span>
      </Button>
      {tabsContent !== '1' && (
        <Button height={44} border="borderless" onClick={onRequestClick}>
          <span>{t('notification.requestManagement')} </span>
        </Button>
      )}
    </FooterStyled>
  );
};

export default Footer;
