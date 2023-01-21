import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, openNotification } from '@nexthcm/components';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { usePostCommentMutation, usePutCommentMutation } from '../../../../../services';
import { StyledGroupButton, StyledMyLeaveCommentForm } from './styles';

interface MyLeaveCommentFormProps {
  type?: string;
  id?: string;
  commentId?: string;
  comment?: string;
  typeCommit?: string;
  state?: number;
  setCommentId?: () => void;
}

const MyLeaveCommentForm = (props: MyLeaveCommentFormProps) => {
  const { type, id, commentId, typeCommit, comment, state, setCommentId } = props;

  const { t, i18n } = useTranslation();
  const [postComment, { isLoading: isCreatingComment }] = usePostCommentMutation();
  const [putComment, { isLoading: isUpdatingComment }] = usePutCommentMutation();
  const form = useForm({
    defaultValues: {
      comment: '',
      state: 1
    },
    resolver: yupResolver(
      yup.object({
        comment: yup.string().required(t('common:form.required'))
      })
    )
  });

  const handleOnSubmit = (data: { comment: string; state: number }) => {
    if (typeCommit === 'POST') {
      const payloadPost = {
        comment: data.comment,
        objectId: id,
        state: data.state,
        type
      };
      postComment(payloadPost)
        .unwrap()
        .then(() => {
          form.reset();
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
    } else {
      const dataPUT = {
        comment: data.comment,
        objectId: id,
        id: commentId,
        state: data.state,
        type
      };
      putComment({ id: commentId, body: dataPUT })
        .unwrap()
        .then(() => {
          form.reset();
          setCommentId && setCommentId();
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

  useEffect(() => {
    comment && form.setValue('comment', comment);
    state && form.setValue('state', state);
  }, [comment, state]);

  return (
    <StyledMyLeaveCommentForm>
      <FormProvider {...form}>
        <Input name="comment" width={'100%'} />
        <StyledGroupButton>
          {typeCommit === 'PUT' ? (
            <>
              <Button
                className="btn-comment-submit"
                height={32}
                loading={isUpdatingComment}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit(handleOnSubmit)();
                }}
              >
                {t('common:confirm.save')}
              </Button>
              <Button
                height={32}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCommentId && setCommentId();
                }}
              >
                {t('common:confirm.cancel')}
              </Button>
            </>
          ) : (
            <Button
              height={32}
              loading={isCreatingComment}
              className="btn-comment-submit"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit(handleOnSubmit)();
              }}
            >
              {t('myTime.myLeave.button.addAComment')}
            </Button>
          )}
        </StyledGroupButton>
      </FormProvider>
    </StyledMyLeaveCommentForm>
  );
};

export default MyLeaveCommentForm;
