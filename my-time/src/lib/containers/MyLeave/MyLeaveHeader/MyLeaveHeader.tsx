import { RootState, useCommonSelector, useModal } from '@nexthcm/common';
import { Button, PlusIcon, Title, EyeWhite } from '@nexthcm/components';
import { Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { MyLeaveModalForm } from '../MyLeaveModalForm';
import { ViewRemainingDayModal } from '../ViewRemainingDayModal';
import { StyledHeader, StyledModal } from './styles';

const MyLeaveHeader = () => {
  const { t } = useTranslation();
  const { isOpen, handleOpen, handleClose } = useModal();
  const viewRemainingDayModal = useModal();

  return (
    <StyledHeader>
      <Row className="header">
        <Title>{t('myTime.myLeave.title')}</Title>
        <div className="user-control">
          <Button className="icon-only" height={44} onClick={viewRemainingDayModal.handleOpen}>
            <EyeWhite width="25px" height="25px" />
          </Button>
          <Button height={44} onClick={handleOpen}>
            <PlusIcon></PlusIcon>
            {t('myTime.myLeave.button.submitLeaveRequest')}
          </Button>
        </div>
      </Row>

      <StyledModal
        destroyOnClose
        visible={viewRemainingDayModal.isOpen}
        onCancel={viewRemainingDayModal.handleClose}
      >
        <ViewRemainingDayModal />
      </StyledModal>

      <StyledModal destroyOnClose visible={isOpen} onCancel={handleClose}>
        <MyLeaveModalForm handleCloseModal={handleClose} />
      </StyledModal>
    </StyledHeader>
  );
};

export default MyLeaveHeader;
