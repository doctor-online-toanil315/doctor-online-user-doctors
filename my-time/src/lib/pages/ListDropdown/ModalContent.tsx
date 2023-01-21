import { Button, openNotification } from '@nexthcm/components';
import { StyledConfirm } from './styleListMenu';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { usePutLeaveMutation } from '../../services/MyTimeApp';

interface ModalContent {
  handleCloseModal: () => void;
  record: any;
  id: string;
}

const ModalContent: FC<ModalContent> = ({ handleCloseModal, record, id }) => {
  const { t, i18n } = useTranslation();
  const [putLeave, { isLoading }] = usePutLeaveMutation();

  const handleSubmit = () => {
    putLeave({ body: id, id: record.key })
      .unwrap()
      .then(() => {
        openNotification({ type: 'success', message: t('modal.requestSuccess') });
        handleCloseModal();
      })
      .catch((error) => {
        const errorMessage = i18n.exists(`common:ERRORS.${error.data.message}`)
          ? t(`common:ERRORS.${error.data.message}`)
          : t(`common:HTTP_RESPONSE_ERROR_MESSAGES.${error.status}`);
        openNotification({
          type: 'error',
          message: errorMessage
        });
        handleCloseModal();
      });
  };

  return (
    <StyledConfirm>
      <Button height={44} key="back" border="outline" onClick={handleCloseModal}>
        {t('common:confirm.cancel')}
      </Button>
      <Button
        disabled={isLoading}
        loading={isLoading}
        height={44}
        key="submit"
        onClick={handleSubmit}
      >
        {t('common:confirm.ok')}
      </Button>
    </StyledConfirm>
  );
};

export default ModalContent;
