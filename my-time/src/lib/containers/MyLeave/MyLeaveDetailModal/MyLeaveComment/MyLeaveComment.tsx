import { RootState, useCommonSelector, useModal } from '@nexthcm/common';
import { Button, DeleteIcon, EditIcon, Modal, openNotification } from '@nexthcm/components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetCommentQuery, usePutCommentMutation } from '../../../../services';
import { MyLeaveCommentContent } from './MyLeaveCommentContent';
import { MyLeaveCommentForm } from './MyLeaveCommentForm';
import {
  StyledButtonFunction,
  StyledCommentItem,
  StyledConfirm,
  StyledGroupButton
} from './styles';

interface MyLeaveCommentProps {
  type?: string;
  id?: string;
}

const MyLeaveComment = (props: MyLeaveCommentProps) => {
  const { id, type } = props;

  const [commentId, setCommentId] = useState<string>('');
  const [commentDelete, setCommentDelete] = useState<any>({});
  const { t, i18n } = useTranslation();
  const { isOpen, handleClose, handleOpen } = useModal();
  const { userId } = useCommonSelector((state: RootState) => state.user.user);
  const { data: commentData } = useGetCommentQuery({ type, objectId: id });
  const [updateComment, { isLoading: isUpdatingComment }] = usePutCommentMutation();

  const handleUpdateComment = () => {
    if (commentDelete) {
      updateComment({ id: commentDelete?.id, body: { ...commentDelete, state: 2 } })
        .unwrap()
        .then(() => {
          handleClose();
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
    <div>
      {commentData?.data?.items?.map((item) =>
        commentId === item?.id ? (
          <MyLeaveCommentForm
            typeCommit="PUT"
            type={type}
            id={id}
            commentId={item?.id}
            comment={item?.comment}
            state={item?.state}
            setCommentId={() => setCommentId('')}
          />
        ) : (
          <StyledCommentItem key={item?.id}>
            <MyLeaveCommentContent
              fullName={item?.userInfo?.fullName}
              image={item?.userInfo?.image}
              time={item?.createdDate}
              comment={item?.comment}
            />

            {item?.userInfo?.id === userId && (
              <StyledGroupButton>
                <StyledButtonFunction
                  onClick={() => {
                    setCommentId(item?.id);
                  }}
                >
                  <EditIcon width={18} height={18} />
                </StyledButtonFunction>
                <StyledButtonFunction
                  onClick={() => {
                    setCommentDelete(item);
                    handleOpen();
                  }}
                >
                  <DeleteIcon width={18} height={18} />
                </StyledButtonFunction>
              </StyledGroupButton>
            )}
          </StyledCommentItem>
        )
      )}

      <MyLeaveCommentForm typeCommit="POST" type={type} id={id} />
      <Modal
        type="confirm"
        confirmIcon="?"
        visible={isOpen}
        onCancel={handleClose}
        title={t('myTime.myLeave.warning.deleteCommentWarining')}
      >
        <StyledConfirm>
          <Button key="back" border="cancel" height={44} onClick={handleClose}>
            {t('common:confirm.cancel')}
          </Button>
          <Button
            key="submit"
            height={44}
            loading={isUpdatingComment}
            onClick={handleUpdateComment}
          >
            {t('common:confirm.ok')}
          </Button>
        </StyledConfirm>
      </Modal>
    </div>
  );
};

export default MyLeaveComment;
