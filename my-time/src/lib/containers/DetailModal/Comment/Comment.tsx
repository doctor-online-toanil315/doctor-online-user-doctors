import { RootState, useCommonSelector, useModal } from '@nexthcm/common';
import { Button, DeleteIcon, EditIcon, Modal, openNotification } from '@nexthcm/components';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetCommentQuery, usePutCommentMutation } from '../../../services/MyTimeApp';
import { ButtonFunction, StyledConfirm } from '../styles';
import ContentComment from './ContentComment';
import FormComment from './FormComment';
import { EventComment, StyledComment, StyledItemComment } from './styles';

interface IComment {
  type?: string;
  id?: string;
}

const Comment: FC<IComment> = ({ type, id }) => {
  const { t, i18n } = useTranslation();
  const [idComment, setIdComment] = useState<string>('');
  const [commentDelete, setCommentDelete] = useState<any>({});

  const {
    isOpen: visibleConfirm,
    handleClose: handleCancelConfirm,
    handleOpen: handleOpenConfirm
  } = useModal();

  const { user } = useCommonSelector((state: RootState) => state.user);
  const { data } = useGetCommentQuery({ type, objectId: id });
  const [putComment, { isLoading: isUpdating }] = usePutCommentMutation();

  const handlePutComment = () => {
    if (commentDelete) {
      putComment({ id: commentDelete?.id, body: { ...commentDelete, state: 2 } })
        .unwrap()
        .then(() => {
          handleCancelConfirm();
        })
        .catch((error) => {
          const errorMessage = i18n.exists(`common:ERRORS.${error.data.message}`)
            ? t(`common:ERRORS.${error.data.message}`)
            : t(`common:HTTP_RESPONSE_ERROR_MESSAGES.${error.status}`);
          openNotification({
            type: 'error',
            message: errorMessage
          });
        });
    }
  };

  return (
    <>
      <StyledComment>
        {data?.data?.items?.map((item) =>
          idComment === item?.id ? (
            <FormComment
              typeCommit="PUT"
              type={type}
              id={id}
              idComment={item?.id}
              comment={item?.comment}
              state={item?.state}
              setIdComment={() => setIdComment('')}
            />
          ) : (
            <StyledItemComment key={item?.id}>
              <ContentComment
                fullName={item?.userInfo?.fullName}
                image={item?.userInfo?.image}
                time={item?.createdDate}
                comment={item?.comment}
              />
              {item?.userInfo?.id === user.userId && (
                <EventComment>
                  <ButtonFunction
                    onClick={() => {
                      setIdComment(item?.id);
                    }}
                  >
                    <EditIcon width={18} height={18} />
                  </ButtonFunction>

                  <ButtonFunction
                    onClick={() => {
                      setCommentDelete(item);
                      handleOpenConfirm();
                    }}
                  >
                    <DeleteIcon width={18} height={18} />
                  </ButtonFunction>
                </EventComment>
              )}
            </StyledItemComment>
          )
        )}

        <FormComment typeCommit="POST" type={type} id={id} />
      </StyledComment>

      <Modal
        type="confirm"
        visible={visibleConfirm}
        onCancel={handleCancelConfirm}
        confirmIcon="?"
        title={t('modal.waitingDeleteComment')}
      >
        <StyledConfirm>
          <Button height={44} key="back" border="cancel" onClick={handleCancelConfirm}>
            {t('common:confirm.cancel')}
          </Button>
          <Button height={44} key="submit" loading={isUpdating} onClick={handlePutComment}>
            {t('common:confirm.ok')}
          </Button>
        </StyledConfirm>
      </Modal>
    </>
  );
};

export default Comment;
