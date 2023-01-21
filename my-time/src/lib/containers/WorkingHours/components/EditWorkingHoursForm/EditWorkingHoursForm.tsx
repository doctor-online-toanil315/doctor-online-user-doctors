import { yupResolver } from '@hookform/resolvers/yup';
import { useFormat } from '@nexthcm/common';
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  openNotification,
  OptionType,
  Select,
  Text,
  TimeCircleIcon,
  Title
} from '@nexthcm/components';
import { Space } from 'antd';
import { debounce } from 'lodash';
import moment from 'moment/moment';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import {
  useGetStateQuery,
  useGetUserMutation,
  usePostTimeSheetUpdateMutation
} from '../../../../services';
import { BtnWrapper, Container, InputWrapper, StyledOptionCheckbox } from './style';

interface Props {
  handleCloseModal: () => void;
  dataEdit: any;
}

const EditWorkingHoursForm = ({ handleCloseModal, dataEdit }: Props) => {
  const { t, i18n } = useTranslation();
  const formatDate = useFormat();
  const [listStatus, setListStatus] = useState<any>([]);
  const [emailCC, setEmailCC] = useState<any>([]);
  const [selectedEmailCC, setSelectedEmailCC] = useState<Array<string | number>>([]);
  const [getEmployee] = useGetUserMutation();
  const [postTimeSheet, { isLoading }] = usePostTimeSheetUpdateMutation();

  const form = useForm({
    defaultValues: { newInTime: '', newOutTime: '', comment: '' },
    resolver: yupResolver(
      yup.object().shape(
        {
          newInTime: yup.string().required(t('common:form.required')),
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
                  message: t('requestManagement.errorEarlierTime')
                });
              }
            }),
          comment: yup.string().required(t('common:form.required'))
        },
        [['newInTime', 'newOutTime']]
      )
    )
  });

  const { data: statusData } = useGetStateQuery({
    type: 2
  });

  useEffect(() => {
    if (statusData) {
      setListStatus(statusData.data);
    }
  }, [statusData]);

  const formattedListStatus = listStatus.map((item: any) => ({
    key: item.id,
    value: item.id,
    label: item.id,
    render: () => (
      <div className="select-status" style={{ backgroundColor: item.stateType.color }}>
        <div className="name-status">{item.name}</div>
      </div>
    )
  }));

  const debounceEmailOnChange = useCallback(
    debounce((nextValue) => {
      getEmployee({ search: nextValue })
        .unwrap()
        .then((data: any) => {
          setEmailCC(data);
        });
    }, 500),
    []
  );

  const handleChangeValueSelect = (value: Array<string | number>) => {
    setSelectedEmailCC(value);
  };

  const handleOnSearchEmailCC = (value: string) => {
    debounceEmailOnChange(value);
  };

  const formattedEmailCC: OptionType[] = emailCC?.map((item) => ({
    key: item.id,
    label: item.name,
    value: item.id,
    type: 'default',
    render: () => (
      <StyledOptionCheckbox>
        <Checkbox checked={selectedEmailCC.includes(item.id)} />
        <span className="emailCC-select">
          <span className="name-container">{item.name}</span> ({item.username})
        </span>
      </StyledOptionCheckbox>
    )
  }));

  const handleRequest = (data: any) => {
    const inTime = data.newInTime.split(':').map((x) => +x);
    const outTime = data.newOutTime.split(':').map((x) => +x);
    const payload: any = {
      comment: data.comment,
      sendToIds: selectedEmailCC,
      stateId: data.stateId,
      userId: dataEdit.userId,
      newInTime: inTime[0] * 3600 + inTime[1] * 60,
      newOutTime: outTime[0] * 3600 + outTime[1] * 60,
      createdDate: dataEdit.trackingDate,
      timeSheetId: dataEdit.key
    };
    selectedEmailCC.length === 0 && delete payload.sendToIds;
    data.stateId === undefined && delete payload.stateId;
    postTimeSheet(payload)
      .unwrap()
      .then(() => {
        openNotification({
          type: 'success',
          message: t('submitSuccessfully')
        });
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
        openNotification({
          type: 'error',
          message: err.data.message
        });
      });
  };

  return (
    <Container>
      <Title className="title">{t(`workingHours.requestUpdateTimeSheet`)}</Title>
      <FormProvider {...form}>
        <Input label={t(`workingHours.employee`)} required value={dataEdit.fullName} readOnly />
        <div style={{ margin: '22px 0' }}>
          <Text className="text-label" strong>
            {t(`workingHours.date`)}
            <span className="required-mark">*</span>
          </Text>
          <DatePicker disabled value={moment(dataEdit.date, formatDate)} format={formatDate} />
        </div>
        <InputWrapper>
          <Input
            name="newInTime"
            type="time"
            required
            subLabel={t('workingHours.enterNewInTime')}
            label={t('workingHours.newTimeCheckin')}
            icons={<TimeCircleIcon />}
            maxLength={5}
          />
          <Input
            name="newOutTime"
            type="time"
            required
            subLabel={t('workingHours.enterNewOutTime')}
            label={t('workingHours.newTimeCheckout')}
            icons={<TimeCircleIcon />}
            maxLength={5}
          />
        </InputWrapper>
        <Select
          name="stateId"
          title={t(`workingHours.transitionToStatus`)}
          placeholder={t(`workingHours.chooseStatus`)}
          options={formattedListStatus}
        />
        <div style={{ margin: '22px 0' }}>
          <Input type="textarea" label={t(`workingHours.comment`)} name="comment" required />
        </div>
        <Select
          showSearch
          name="emailCC"
          title="Email CC"
          placeholder={t(`workingHours.searchUser`)}
          mode="multiple"
          allowClear={false}
          listHeight={398}
          options={formattedEmailCC}
          onSearch={handleOnSearchEmailCC}
          onChange={handleChangeValueSelect}
          menuItemSelectedIcon={null}
          optionLabelProp="label"
        />
        <BtnWrapper>
          <Space size="small">
            <Button
              disabled={isLoading}
              loading={isLoading}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit(handleRequest)();
              }}
              size="small"
            >
              {t('save')}
            </Button>
            <Button onClick={handleCloseModal} className="btn-cancel" border="outline" size="small">
              {t('cancel')}
            </Button>
          </Space>
        </BtnWrapper>
      </FormProvider>
    </Container>
  );
};

export default EditWorkingHoursForm;
