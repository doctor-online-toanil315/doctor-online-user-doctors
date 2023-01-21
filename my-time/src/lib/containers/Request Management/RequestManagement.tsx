import { useModal } from '@nexthcm/common';
import { Button, Modal, Title, DownArrowSvgComponent } from '@nexthcm/components';
import { Dropdown, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LeaveForm, OverTimeForm, WFHForm, OnSiteForm } from '../../components';
import { useGetPartialDayQuery } from '../../services';
import { PartialDay } from '../../types';
import './style.scss';
import { Container, Header } from './styles';

const RequestManagement = () => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState<boolean>(false);
  const [typeRequest, setTypeRequest] = useState('');
  const [listPartialDay, setListPartialDay] = useState<PartialDay[]>([]);

  const { isOpen, handleOpen, handleClose } = useModal();

  const { data: partialDayData } = useGetPartialDayQuery({
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    if (partialDayData) {
      setListPartialDay(partialDayData.data);
    }
  }, [partialDayData]);

  const menu = (
    <Menu
      items={[
        {
          label: (
            <div
              key="1"
              onClick={() => {
                setVisible(false);
                setTypeRequest('leaveRequest');
                handleOpen();
              }}
            >
              {t('requestManagement.leave')}
            </div>
          ),
          key: '0'
        },
        {
          label: (
            <div
              key="2"
              onClick={() => {
                setVisible(false);
                setTypeRequest('otRequest');
                handleOpen();
              }}
            >
              {t('requestManagement.OT')}
            </div>
          ),
          key: '1'
        },
        {
          label: (
            <div
              key="3"
              onClick={() => {
                setVisible(false);
                setTypeRequest('onSiteRequest');
                handleOpen();
              }}
            >
              {t('requestManagement.onSite')}
            </div>
          ),
          key: '2'
        },
        {
          label: (
            <div
              key="4"
              onClick={() => {
                setVisible(false);
                setTypeRequest('wfhRequest');
                handleOpen();
              }}
            >
              {t('requestManagement.WFH')}
            </div>
          ),
          key: '3'
        }
      ]}
    />
  );

  return (
    <Container className="request-management-container">
      <Header>
        <Title>{t('requestManagement.title')}</Title>
        <Dropdown
          overlayClassName="dropdown-menu"
          overlay={menu}
          trigger={['click']}
          onVisibleChange={(visible) => setVisible(visible)}
        >
          <Button
            className={visible ? 'button-dropdown visible' : 'button-dropdown'}
            type="default"
            height={44}
            // onClick={() => setVisible(false)}
          >
            {t('requestManagement.addRequest')} <DownArrowSvgComponent />
          </Button>
        </Dropdown>
      </Header>
      <Modal destroyOnClose visible={isOpen} onCancel={handleClose}>
        {typeRequest === 'leaveRequest' && (
          <LeaveForm listPartialDay={listPartialDay} handleCloseModal={handleClose} />
        )}
        {typeRequest === 'otRequest' && <OverTimeForm handleCloseModal={handleClose} />}
        {typeRequest === 'onSiteRequest' && <OnSiteForm handleCloseModal={handleClose} />}
        {typeRequest === 'wfhRequest' && <WFHForm handleCloseModal={handleClose} />}
      </Modal>
    </Container>
  );
};

export default RequestManagement;
