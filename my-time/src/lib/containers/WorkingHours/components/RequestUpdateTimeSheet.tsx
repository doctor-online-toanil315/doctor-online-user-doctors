import { yupResolver } from '@hookform/resolvers/yup';
import { useFormat } from '@nexthcm/common';
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Modal,
  openNotification,
  OptionType,
  Select,
  TimeCircleIcon
} from '@nexthcm/components';
import { Row, Space } from 'antd';
import { debounce } from 'lodash';
import moment from 'moment';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useGetUserMutation, usePostTimeSheetUpdateMutation } from '../../../services';
import { formatTimeToSeconds } from '../../../utils/utils';
import { WorkingHoursType } from '../OnlyMe';
import './styles.scss';
interface RequestUpdateTimeSheetProps {
  isShowModal?: boolean;
  onCloseModal?: () => void;
  dataUpdate?: WorkingHoursType;
}

interface UserType {
  id: string;
  name: string;
  username: string;
}

const RequestUpdateTimeSheetModal = ({
  isShowModal,
  onCloseModal,
  dataUpdate
}: RequestUpdateTimeSheetProps) => {
  const { t, i18n } = useTranslation();
  const formatDate = useFormat();
  const [isShowModalEdit, setIsShowModalEdit] = useState(isShowModal);
  const lng = localStorage.getItem('i18nextLng');
  const lngEn = lng === 'en';
  const date = dataUpdate?.trackingDate?.split(', ')[1] || new Date();
  const [dataUser, setDataUser] = useState([]);
  const [dataUserSelect, { isLoading: loadingGetData }] = useGetUserMutation();
  const [updateTimeSheet, { isLoading }] = usePostTimeSheetUpdateMutation();
  const [selectedUsernames, setSelectedUsernames] = useState<string[]>([]);
  const [disable, setDisable] = useState(false);

  const handleCancle = () => {
    setIsShowModalEdit(false);
    onCloseModal && onCloseModal();
  };

  const form = useForm({
    defaultValues: {
      createdDate: date,
      newInTime: '',
      newOutTime: '',
      comment: ''
    },
    resolver: yupResolver(
      yup.object().shape(
        {
          createdDate: yup.string().required(t('common:form.required')),
          newInTime: yup
            .string()
            .required(t('common:form.required'))
            .when('newOutTime', {
              is: () => {
                return (
                  form.watch('newOutTime') <= form.watch('newInTime') &&
                  form.watch('newInTime') !== ''
                );
              },
              then: (schema) => {
                return schema.test({
                  name: 'newInTime',
                  test: (value: any) => false,
                  message: t('workingHours.errorBeforeTime')
                });
              }
            }),
          newOutTime: yup
            .string()
            .required(t('common:form.required'))
            .when('newInTime', {
              is: () => {
                return (
                  form.watch('newInTime') >= form.watch('newOutTime') &&
                  form.watch('newOutTime') !== ''
                );
              },
              then: (schema) => {
                return schema.test({
                  name: 'newOutTime',
                  test: (value: any) => false,
                  message: t('workingHours.errorAfterTime')
                });
              }
            }),
          comment: yup.string().required(t('common:form.required'))
        },
        [['newInTime', 'newOutTime']]
      )
    )
  });
  const debounceUser = useCallback(
    debounce((nextValue) => {
      dataUserSelect({ search: nextValue.trim(), size: 9999 })
        .unwrap()
        .then((data) => {
          setDataUser(data);
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
    }, 500),
    []
  );

  const onSubmit = (data: any) => {
    const body = {
      timeSheetId: dataUpdate?.key,
      comment: data?.comment,
      createdDate: dataUpdate?.createdDate,
      newInTime: formatTimeToSeconds(data?.newInTime),
      newOutTime: formatTimeToSeconds(data?.newOutTime)
    };
    if (selectedUsernames.length) {
      body['sendToIds'] = selectedUsernames;
    }
    setDisable(true);
    updateTimeSheet(body)
      .unwrap()
      .then(() => {
        onCloseModal && onCloseModal();
        openNotification({
          type: 'success',
          message: t('common:notification.updateSuccess', { name: 'request timesheet' })
        });
      })
      .catch((error) => {
        const errorMessage = i18n.exists(`common:ERRORS.${error.data.message}`)
          ? t(`common:ERRORS.${error.data.message}`)
          : t(`common:HTTP_RESPONSE_ERROR_MESSAGES.${error.status}`);
        openNotification({
          type: 'error',
          message: errorMessage
        });
      })
      .then(() => setDisable(false));
  };

  return (
    <FormProvider {...form}>
      <Modal
        title={t('workingHours.requestUpdate')}
        footer={null}
        className="modal__request-update-timesheet--only-me"
        visible={isShowModalEdit}
        onCancel={handleCancle}
      >
        <div className="modal__update-time-sheet mt-16">
          <div className="date">
            <label className="text">
              {t('workingHours.date')}
              <span className="required-mark">*</span>
            </label>
            <DatePicker name="createdDate" value={moment(date, formatDate)} format={formatDate} />
          </div>

          <div className="check flex justify-content-between mt-16">
            <div className="check-in">
              <Input
                name="newInTime"
                type="time"
                required
                subLabel={t('workingHours.enterNewCheckIn')}
                label={t('workingHours.newCheckInTime')}
                icons={<TimeCircleIcon />}
                maxLength={5}
              />
            </div>
            <div className="check-out">
              <Input
                name="newOutTime"
                type="time"
                required
                subLabel={t('workingHours.enterNewCheckOut')}
                label={t('workingHours.newCheckOutTime')}
                icons={<TimeCircleIcon />}
                maxLength={5}
              />
            </div>
          </div>
          <div className="comment mt-16">
            <Input name="comment" label={t('workingHours.comment')} type="textarea" required />
          </div>
          <div className="emaill-cc mt-16">
            <Select
              name="email"
              title={t('workingHours.emailCc')}
              mode="multiple"
              options={dataUser.map((user: UserType) => ({
                key: user.id,
                value: user.id,
                label: user.name,
                render: () => (
                  <div
                    className="select-users"
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  >
                    <div className="dnone">
                      <Checkbox
                        checked={selectedUsernames.includes(user.id)}
                        style={{ paddingTop: 4 }}
                      />
                    </div>
                    <div className="name-user">
                      <label style={{ cursor: 'pointer' }}>{user?.name}</label>
                      <span className="dnone">({user?.username})</span>
                    </div>
                  </div>
                )
              }))}
              placeholder={t('workingHours.searchForUser')}
              onSearch={(value) => {
                value !== '' && debounceUser(value);
              }}
              onChange={(value) => setSelectedUsernames(value)}
              loading={loadingGetData}
            />
          </div>

          <div className="update__btn">
            <Row className="update__confirm-btn">
              <Space>
                <Button
                  key="submit"
                  onClick={() => form.handleSubmit(onSubmit)()}
                  loading={isLoading}
                  disabled={isLoading || disable}
                >
                  {t('common:confirm.save')}
                </Button>

                <Button
                  key="back"
                  border="outline"
                  onClick={handleCancle}
                  className="btn-cancel-update"
                >
                  {t('common:confirm.cancel')}
                </Button>
              </Space>
            </Row>
          </div>
        </div>
      </Modal>
    </FormProvider>
  );
};

export default memo(RequestUpdateTimeSheetModal);
