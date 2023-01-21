import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, openNotification } from '@nexthcm/components';
import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { GroupButtonComment, StyledFormComment } from './styles';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { usePostCommentMutation, usePutCommentMutation } from '../../../services/MyTimeApp';

interface IFormComment {
  type?: string;
  id?: string;
  idComment?: string;
  comment?: string;
  typeCommit?: string;
  state?: number;
  setIdComment?: () => void;
}

const FormComment: FC<IFormComment> = ({
  type,
  id,
  idComment,
  typeCommit,
  comment,
  state,
  setIdComment
}) => {
  const { t, i18n } = useTranslation();

  const [postComment, { isLoading }] = usePostCommentMutation();
  const [putComment, { isLoading: isUpdating }] = usePutCommentMutation();

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

  useEffect(() => {
    comment && form.setValue('comment', comment);
    state && form.setValue('state', state);
  }, [comment, state]);

  const onSubmit = (data: { comment: string; state: number }) => {
    if (typeCommit === 'POST') {
      const dataPost = {
        comment: data.comment,
        objectId: id,
        state: data.state,
        type
      };
      postComment(dataPost)
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
        id: idComment,
        state: data.state,
        type
      };
      putComment({ id: idComment, body: dataPUT })
        .unwrap()
        .then(() => {
          form.reset();
          setIdComment && setIdComment();
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
    <FormProvider {...form}>
      <StyledFormComment>
        <Input width={'100%'} name="comment" />
        <GroupButtonComment>
          {typeCommit === 'PUT' ? (
            <>
              <Button
                height={32}
                loading={isUpdating}
                className="btn-comment-submit"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit(onSubmit)();
                }}
              >
                {t('common:confirm.save')}
              </Button>
              <Button
                height={32}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIdComment && setIdComment();
                }}
              >
                {t('common:confirm.cancel')}
              </Button>
            </>
          ) : (
            <Button
              height={32}
              loading={isLoading}
              className="btn-comment-submit"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit(onSubmit)();
              }}
            >
              {t('modal.addComment')}
            </Button>
          )}
        </GroupButtonComment>
      </StyledFormComment>
    </FormProvider>
  );
};

export default FormComment;
