import { yupResolver } from '@hookform/resolvers/yup';
import { RootState, useCommonSelector, useFormat, useModal } from '@nexthcm/common';
import {
  Button,
  Checkbox,
  CheckIcon,
  CloseIcon,
  DateRangePicker,
  Input,
  openNotification,
  OptionType,
  Select,
  Text,
  TimeCircleIcon,
  Title
} from '@nexthcm/components';
import { Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { DefaultOptionType } from 'antd/lib/select';
import { debounce } from 'lodash';
import moment from 'moment';
import { RangeValue } from 'rc-picker/lib/interface';
import { useCallback, useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import Card from '../../../components/Form/Card';
import {
  useGetDirectReportQuery,
  useGetLeaveRemainingEntitlementMutation,
  useGetPartialDayQuery,
  useGetUserMutation,
  usePostLeaveMutation
} from '../../../services';
import { Leave, User } from '../../../types';
import {
  StyledLeaveTypeCardList,
  StyledModal,
  StyledModalForm,
  StyledSelectWrapper,
  ErrorMessageStyled
} from './styles';

interface MyLeaveModalFormProps {
  handleCloseModal: () => void;
}

const MyLeaveModalForm = (props: MyLeaveModalFormProps) => {
  const { handleCloseModal } = props;
  const formatDate = useFormat();

  const durationSameDateList = ['fullDay', 'halfDay', 'specifyTime'];
  const durationPartialDayList = ['halfDay', 'specifyTime'];
  const sessionDayList = ['morning', 'afternoon'];
  const { t, i18n } = useTranslation();
  const {
    isOpen: isOpenErrorModal,
    handleOpen: handleOpenErrorModal,
    handleClose: handleCloseErrorModal
  } = useModal();
  const [isSameDate, setIsSameDate] = useState(false);
  const [leaveTypeList, setLeaveTypeList] = useState<Leave[] | []>([]);
  const [isFetchingLeaveList, setIsFetchingLeaveList] = useState<boolean>(false);
  const [emailCC, setEmailCC] = useState<User[]>([]);
  const [selectedLeaveType, setSelectedLeaveType] = useState<string>('');
  const [selectedEmailCC, setSelectedEmailCC] = useState<Array<string | number>>([]);
  const [selectedPartialDayKey, setSelectedPartialDayKey] = useState<string>('');
  const [selectedPartialDayName, setSelectedPartialDayName] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>(durationSameDateList[1]);
  const [selectedDurationStartDay, setSelectedDurationStartDay] = useState<string>(
    durationPartialDayList[0]
  );
  const [selectedDurationEndDay, setSelectedDurationEndDay] = useState<string>(
    durationPartialDayList[0]
  );
  const [inOneYear, setInOneYear] = useState<boolean>(false);
  const [selectedSessionDay, setSelectedSessionDay] = useState<string>(sessionDayList[0]);
  const [selectedSessionStartDay, setSelectedSessionStartDay] = useState<string>(sessionDayList[0]);
  const [selectedSessionEndDay, setSelectedSessionEndDay] = useState<string>(sessionDayList[0]);
  const [errorModalTitle, setErrorModalTitle] = useState<string>('');
  const [leaveDuplicatedList, setLeaveDuplicatedList] = useState<[]>([]);
  const userId = useCommonSelector((state: RootState) => state.user.user.userId);
  const { data: directReporter } = useGetDirectReportQuery({ id: userId });
  const { data: partialDay } = useGetPartialDayQuery({});
  const [getEmailCC] = useGetUserMutation();
  const [getLeaveRemainingEntitlement] = useGetLeaveRemainingEntitlementMutation();
  const [createLeave, { isLoading: isCreatingLeave }] = usePostLeaveMutation();
  const form = useForm({
    defaultValues: {
      comment: '',
      dateRange: [],
      partialDays: '',
      duration: '',
      durationStartDay: '',
      durationEndDay: '',
      sessionDay: '',
      sessionStartDay: '',
      sessionEndDay: '',
      fromTime: '',
      fromTimeStartDay: '',
      fromTimeEndDay: '',
      toTime: '',
      toTimeStartDay: '',
      toTimeEndDay: ''
    },
    resolver: yupResolver(
      yup.object({
        comment: yup.string().trim().required(t('common:form.required')),
        dateRange: yup.array().min(2, t('common:form.required')),
        fromTime: yup.string().when('duration', {
          is: (duration) => duration === 'specifyTime',
          then: (schema) => schema.required(t('common:form.required'))
        }),
        toTime: yup
          .string()
          .when('duration', {
            is: (duration) => duration === 'specifyTime',
            then: (schema) => schema.required(t('common:form.required'))
          })
          .when('fromTime', {
            is: () => {
              return form.watch('fromTime') >= form.watch('toTime') && form.watch('toTime') !== '';
            },
            then: (schema) => {
              return schema.test({
                name: 'toTime',
                test: () => false,
                message: t('myTime.myLeave.warning.errorEarlierTime')
              });
            }
          }),
        fromTimeStartDay: yup.string().when('durationStartDay', {
          is: (durationStartDay) => durationStartDay === 'specifyTime',
          then: (schema) => schema.required(t('common:form.required'))
        }),
        toTimeStartDay: yup
          .string()
          .when('durationStartDay', {
            is: (durationStartDay) => durationStartDay === 'specifyTime',
            then: (schema) => schema.required(t('common:form.required'))
          })
          .when('fromTimeStartDay', {
            is: () => {
              return (
                form.watch('fromTimeStartDay') >= form.watch('toTimeStartDay') &&
                form.watch('toTimeStartDay') !== ''
              );
            },
            then: (schema) => {
              return schema.test({
                name: 'toTimeStartDay',
                test: () => false,
                message: t('myTime.myLeave.warning.errorEarlierTime')
              });
            }
          }),
        fromTimeEndDay: yup.string().when('durationEndDay', {
          is: (durationEndDay) => durationEndDay === 'specifyTime',
          then: (schema) => schema.required(t('common:form.required'))
        }),
        toTimeEndDay: yup
          .string()
          .when('durationEndDay', {
            is: (durationEndDay) => durationEndDay === 'specifyTime',
            then: (schema) => schema.required(t('common:form.required'))
          })
          .when('fromTimeEndDay', {
            is: () => {
              return (
                form.watch('fromTimeEndDay') >= form.watch('toTimeEndDay') &&
                form.watch('toTimeEndDay') !== ''
              );
            },
            then: (schema) => {
              return schema.test({
                name: 'toTimeEndDay',
                test: () => false,
                message: t('myTime.myLeave.warning.errorEarlierTime')
              });
            }
          })
      })
    )
  });
  const formatFromDate = useFormat('MM/DD/YYYY 00:00:00:000', 'DD/MM/YYYY 00:00:00:000');
  const formatToDate = useFormat('MM/DD/YYYY 23:59:59:999', 'DD/MM/YYYY 23:59:59:999');

  const formatTimestampToDateTime = (date: string) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US');
    return formattedDate;
  };

  const formatDateTimestampToFromDate = (date: any) => {
    const dateTimestamp = new Date(moment(date).format(formatFromDate)).getTime();
    return dateTimestamp;
  };

  const formatDateTimestampToToDate = (date: any) => {
    const dateTimestamp = new Date(moment(date).format(formatToDate)).getTime();
    return dateTimestamp;
  };

  const formatHourMinuteToTimestamp = (time: string) => {
    const splittedTime = time.split(':');
    const result = Number(splittedTime[0]) * 3600 + Number(splittedTime[1]) * 60;
    return result;
  };

  const formatTimeZoneToDateTime = (date: number) => {
    const formattedDate = new Date(date).toLocaleDateString('en-GB');
    return formattedDate;
  };

  const debounceOnSearchEmailCC = useCallback(
    debounce((nextValue) => {
      getEmailCC({ search: nextValue })
        .unwrap()
        .then((data: User[]) => {
          setEmailCC(data);
        });
    }, 500),
    []
  );

  const formattedPartialDay: OptionType[] = partialDay?.data.map((partialDayItem) => ({
    key: partialDayItem.id,
    label: partialDayItem.name,
    value: partialDayItem.id,
    render: () => {
      switch (partialDayItem.name) {
        case 'None':
          return t('myTime.myLeave.option.none');
        case 'All Day':
          return t('myTime.myLeave.option.allDays');
        case 'Start Day Only':
          return t('myTime.myLeave.option.startDayOnly');
        case 'End Day Only':
          return t('myTime.myLeave.option.endDayOnly');
        case 'Start And End Day':
          return t('myTime.myLeave.option.startAndEndDay');
        default:
      }

      return (
        <div className="option-check-icon">
          {partialDayItem.name}
          <span>{selectedPartialDayKey === partialDayItem.id ? <CheckIcon /> : <div></div>}</span>
        </div>
      );
    }
  }));

  const formattedEmailCC: OptionType[] = emailCC?.map((item) => ({
    key: item.id,
    label: item.name,
    value: item.id,
    type: 'default',
    render: () => (
      <div className="option-check-box">
        <Checkbox checked={selectedEmailCC.includes(item.id)} />
        <Text>{item.name}</Text>
        <Text>({item.username})</Text>
      </div>
    )
  }));

  const formatNotAPIOption = (dataList: string[], selectedOption: string) => {
    const formattedOption: OptionType[] = dataList.map((dataItem, index: number) => ({
      key: index,
      label: t(`myTime.myLeave.option.${dataItem}`),
      value: dataItem,
      render: () => {
        return (
          <div className="option-check-icon">
            {t(`myTime.myLeave.option.${dataItem}`)}
            <span>{selectedOption === dataItem ? <CheckIcon /> : <div></div>}</span>
          </div>
        );
      }
    }));

    return formattedOption;
  };

  const handleOnChangeDateRange = (value: RangeValue<moment.Moment>) => {
    if (value && userId) {
      const fromTimestamp = formatDateTimestampToFromDate(value[0]);
      const toTimestamp = formatDateTimestampToToDate(value[1]);
      const fromDateTime = formatTimeZoneToDateTime(fromTimestamp);
      const toDateTime = formatTimeZoneToDateTime(toTimestamp);

      fromDateTime === toDateTime ? setIsSameDate(true) : setIsSameDate(false);
      form.setValue('dateRange', [fromTimestamp, toTimestamp] as any);

      setSelectedPartialDayKey(partialDay?.data[0].id);
      setSelectedPartialDayName(partialDay?.data[0].name.trim());
      setIsFetchingLeaveList(true);
      getLeaveRemainingEntitlement({
        id: userId,
        fromDate: fromTimestamp,
        toDate: toTimestamp
      })
        .unwrap()
        .then((data) => {
          setLeaveTypeList(data.data);
          setIsFetchingLeaveList(false);
        });
    } else {
      form.setValue('dateRange', []);
      setLeaveTypeList([]);
    }
  };

  const handleOnSelectPartialDay = (value, option: DefaultOptionType) => {
    setSelectedPartialDayName(String(option.label).trim());
    setSelectedPartialDayKey(value);

    form.setValue('partialDays', String(option.label).trim());
  };

  const handleOnSelectSessionDay = (value: string) => {
    setSelectedSessionDay(value);
  };

  const handleOnSelectSessionStartDay = (value: string) => {
    setSelectedSessionStartDay(value);
  };

  const handleOnSelectSessionEndDay = (value: string) => {
    setSelectedSessionEndDay(value);
  };

  const handleOnSelectDuration = (value: string) => {
    setSelectedDuration(value);
  };

  const handleOnSelectDurationStartDay = (value: string) => {
    setSelectedDurationStartDay(value);
  };

  const handleOnSelectDurationEndDay = (value: string) => {
    setSelectedDurationEndDay(value);
  };

  const handleOnSearchEmailCC = (value: string) => {
    debounceOnSearchEmailCC(value);
  };

  const handleOnChangeEmailCC = (value: Array<string | number>) => {
    setSelectedEmailCC(value);
  };

  const handleOnSubmit = (value) => {
    const payload: any = {
      comment: value.comment,
      fromDate: value.dateRange[0],
      toDate: value.dateRange[1],
      items: [],
      leaveTypeId: selectedLeaveType,
      partialDayTypeId: '',
      sendToIds: selectedEmailCC
    };

    if (!isSameDate) {
      payload.partialDayTypeId = value.partialDays;
    } else {
      if (value.duration === 'fullDay') payload.items.push({ fullDay: true });
      if (value.duration === 'halfDay') {
        if (value.sessionDay === 'morning') payload.items.push({ morning: true });
        if (value.sessionDay === 'afternoon') payload.items.push({ afternoon: true });
      }
      if (value.duration === 'specifyTime') {
        payload.items.push({
          fromTime: formatHourMinuteToTimestamp(value.fromTime),
          toTime: formatHourMinuteToTimestamp(value.toTime)
        });
      }
    }

    if (selectedPartialDayName !== 'Start And End Day') {
      if (selectedPartialDayName !== 'None') {
        if (value.fromTime === '' && value.toTime === '') {
          value.duration === 'fullDay'
            ? payload.items.push({ fullDay: true })
            : value.sessionDay === 'morning'
            ? payload.items.push({ morning: true })
            : payload.items.push({ afternoon: true });
        } else {
          payload.items.push({
            fromTime: formatHourMinuteToTimestamp(value.fromTime),
            toTime: formatHourMinuteToTimestamp(value.toTime)
          });
        }
      }
    } else {
      if (value.fromTimeStartDay === '' && value.toTimeStartDay === '') {
        value.sessionStartDay === 'morning'
          ? payload.items.push({ morning: true })
          : payload.items.push({ afternoon: true });
      } else {
        payload.items.push({
          fromTime: formatHourMinuteToTimestamp(value.fromTimeStartDay),
          toTime: formatHourMinuteToTimestamp(value.toTimeStartDay)
        });
      }

      if (value.fromTimeEndDay === '' && value.toTimeEndDay === '') {
        value.sessionEndDay === 'morning'
          ? payload.items.push({ morning: true })
          : payload.items.push({ afternoon: true });
      } else {
        payload.items.push({
          fromTime: formatHourMinuteToTimestamp(value.fromTimeEndDay),
          toTime: formatHourMinuteToTimestamp(value.toTimeEndDay)
        });
      }
    }

    selectedEmailCC.length === 0 && delete payload.sendToIds;
    payload.partialDayTypeId === '' && delete payload.partialDayTypeId;

    if (selectedLeaveType !== '' && !inOneYear) {
      createLeave(payload)
        .unwrap()
        .then(() => {
          openNotification({
            type: 'success',
            message: t('submitSuccessfully')
          });
          handleCloseModal();
        })
        .catch((error) => {
          const errorMessage = i18n.exists(`common:ERRORS.${error?.data?.message}`)
            ? t(`common:ERRORS.${error?.data?.message}`)
            : t(`common:HTTP_RESPONSE_ERROR_MESSAGES.${error?.status}`);

          setErrorModalTitle(errorMessage);
          setLeaveDuplicatedList(error?.data?.errorMetadata?.leaveDuplicatedList);
          handleOpenErrorModal();
        });
    }
  };

  useEffect(() => {
    if (
      form.watch('dateRange').length === 2 &&
      Math.ceil((form.watch('dateRange')[1] - form.watch('dateRange')[0]) / 1000 / 3600 / 24) > 365
    ) {
      setInOneYear(true);
    } else {
      setInOneYear(false);
    }
  }, [form.watch('dateRange')]);

  useEffect(() => {
    form.setValue('duration', durationSameDateList[1]);
    form.setValue('durationStartDay', durationPartialDayList[0]);
    form.setValue('durationEndDay', durationPartialDayList[0]);
    form.setValue('sessionDay', sessionDayList[0]);
    form.setValue('sessionStartDay', sessionDayList[0]);
    form.setValue('sessionEndDay', sessionDayList[0]);

    setSelectedSessionDay(sessionDayList[0]);
    setSelectedSessionStartDay(sessionDayList[0]);
    setSelectedSessionEndDay(sessionDayList[0]);
    setSelectedDuration(durationSameDateList[1]);
    setSelectedDurationStartDay(durationPartialDayList[0]);
    setSelectedDurationEndDay(durationPartialDayList[0]);
  }, [partialDay, selectedPartialDayName]);

  useEffect(() => {
    form.setValue('fromTime', '');
    form.setValue('toTime', '');
  }, [selectedDuration, partialDay]);

  useEffect(() => {
    form.setValue('fromTimeStartDay', '');
    form.setValue('toTimeStartDay', '');
  }, [selectedDurationStartDay, partialDay]);

  useEffect(() => {
    form.setValue('fromTimeEndDay', '');
    form.setValue('toTimeEndDay', '');
  }, [selectedDurationEndDay, partialDay]);

  useEffect(() => {
    form.clearErrors(['fromTime', 'toTime']);
  }, [form.watch('duration')]);

  return (
    <StyledModalForm>
      <Title className="title">{t('myTime.myLeave.button.submitLeaveRequest')}</Title>
      <FormProvider {...form}>
        <div className="group-control">
          <Text strong>
            {t('myTime.myLeave.groupControl.title.dateRange')}
            <span className="required-mark">*</span>
          </Text>
          <Row className="date-range">
            <div className="date-range__picker">
              <DateRangePicker
                format={formatDate}
                label={t('myTime.myLeave.groupControl.placeholder.dateRange')}
                name="dateRange"
                onChange={(value) => {
                  handleOnChangeDateRange(value);
                }}
                errors={form?.formState?.errors?.dateRange?.message}
              />
            </div>
          </Row>
        </div>
        {form.formState.isSubmitted && inOneYear && (
          <ErrorMessageStyled>{t('common:form.oneYear')}</ErrorMessageStyled>
        )}

        {form.getValues('dateRange').length > 0 && (
          <>
            <div className="group-control">
              <Text strong>
                {t('myTime.myLeave.groupControl.title.leaveType')}
                <span className="required-mark">*</span>
              </Text>
              <Spin
                className="loading"
                spinning={isFetchingLeaveList}
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              >
                <StyledLeaveTypeCardList>
                  {leaveTypeList.map((leaveTypeItem: Leave) => (
                    <Card
                      setSelectedLeave={setSelectedLeaveType}
                      id={leaveTypeItem.leaveTypeId}
                      key={leaveTypeItem.leaveTypeId}
                      leaveName={leaveTypeItem.leaveTypeName}
                      active={selectedLeaveType === leaveTypeItem.leaveTypeId ? true : false}
                      remainingDays={leaveTypeItem.remainingEntitlement}
                      availableDays={
                        leaveTypeItem.hasAvailableLeave ? leaveTypeItem.availableLeave : undefined
                      }
                      disabled={
                        (leaveTypeItem.availableLeave === 0 && leaveTypeItem.hasAvailableLeave) ||
                        leaveTypeItem.remainingEntitlement <= 0
                      }
                    />
                  ))}
                </StyledLeaveTypeCardList>
              </Spin>

              {leaveTypeList.length !== 0 &&
                selectedLeaveType === '' &&
                form.formState.isSubmitted && (
                  <Text>{t('myTime.myLeave.warning.selectLeaveTypeWarning')}</Text>
                )}
            </div>

            {isSameDate ? (
              <div className="group-control">
                <StyledSelectWrapper>
                  <Select
                    className="select-partial-days"
                    name="duration"
                    title={t('myTime.myLeave.groupControl.title.duration')}
                    allowClear={false}
                    value={selectedDuration}
                    options={formatNotAPIOption(durationSameDateList, selectedDuration)}
                    onSelect={handleOnSelectDuration}
                    required
                  />

                  {form.watch('duration') === 'halfDay' && (
                    <Select
                      style={{ marginTop: '24px' }}
                      className="select-session-day"
                      name="sessionDay"
                      allowClear={false}
                      options={formatNotAPIOption(sessionDayList, selectedSessionDay)}
                      onSelect={handleOnSelectSessionDay}
                    />
                  )}

                  {form.watch('duration') === 'specifyTime' && (
                    <div className="specify-time">
                      <Input
                        type="time"
                        name="fromTime"
                        subLabel={t('myTime.myLeave.groupControl.title.from')}
                        icons={<TimeCircleIcon />}
                      />
                      <Input
                        type="time"
                        name="toTime"
                        subLabel={t('myTime.myLeave.groupControl.title.to')}
                        icons={<TimeCircleIcon />}
                      />
                    </div>
                  )}
                </StyledSelectWrapper>
              </div>
            ) : (
              <>
                <div className="group-control">
                  <Select
                    className="select-partial-days"
                    name="partialDays"
                    title={t('myTime.myLeave.groupControl.title.partialsDays')}
                    allowClear={false}
                    value={selectedPartialDayKey}
                    options={formattedPartialDay}
                    onSelect={handleOnSelectPartialDay}
                    required
                  />
                </div>

                {selectedPartialDayName !== 'None' &&
                  selectedPartialDayName !== 'Start And End Day' && (
                    <div className="group-control">
                      <StyledSelectWrapper>
                        <Select
                          className="select-duration"
                          name="duration"
                          title={
                            selectedPartialDayName === 'Start Day Only'
                              ? t('myTime.myLeave.groupControl.title.startDay')
                              : selectedPartialDayName === 'End Day Only'
                              ? t('myTime.myLeave.groupControl.title.endDay')
                              : t('myTime.myLeave.groupControl.title.duration')
                          }
                          allowClear={false}
                          value={selectedDuration}
                          options={formatNotAPIOption(durationPartialDayList, selectedDuration)}
                          onSelect={handleOnSelectDuration}
                          required
                        />

                        {form.watch('duration') === 'halfDay' && (
                          <Select
                            style={{ marginTop: '24px' }}
                            className="select-session-day"
                            name="sessionDay"
                            allowClear={false}
                            options={formatNotAPIOption(sessionDayList, selectedSessionDay)}
                            onSelect={handleOnSelectSessionDay}
                          />
                        )}

                        {form.watch('duration') === 'specifyTime' && (
                          <div className="specify-time">
                            <Input
                              type="time"
                              name="fromTime"
                              subLabel={t('myTime.myLeave.groupControl.title.from')}
                              icons={<TimeCircleIcon />}
                            />
                            <Input
                              type="time"
                              name="toTime"
                              subLabel={t('myTime.myLeave.groupControl.title.to')}
                              icons={<TimeCircleIcon />}
                            />
                          </div>
                        )}
                      </StyledSelectWrapper>
                    </div>
                  )}

                {selectedPartialDayName === 'Start And End Day' && (
                  <>
                    <div className="group-control">
                      <StyledSelectWrapper>
                        <Select
                          className="select-duration"
                          name="durationStartDay"
                          title={t('myTime.myLeave.groupControl.title.startDay')}
                          allowClear={false}
                          value={selectedDuration}
                          options={formatNotAPIOption(
                            durationPartialDayList,
                            selectedDurationStartDay
                          )}
                          onSelect={handleOnSelectDurationStartDay}
                          required
                        />

                        {form.watch('durationStartDay') === 'halfDay' && (
                          <Select
                            style={{ marginTop: '24px' }}
                            className="select-session-day"
                            name="sessionStartDay"
                            allowClear={false}
                            options={formatNotAPIOption(sessionDayList, selectedSessionStartDay)}
                            onSelect={handleOnSelectSessionStartDay}
                          />
                        )}

                        {form.watch('durationStartDay') === 'specifyTime' && (
                          <div className="specify-time">
                            <Input
                              type="time"
                              name="fromTimeStartDay"
                              subLabel={t('myTime.myLeave.groupControl.title.from')}
                              icons={<TimeCircleIcon />}
                            />
                            <Input
                              type="time"
                              name="toTimeStartDay"
                              subLabel={t('myTime.myLeave.groupControl.title.to')}
                              icons={<TimeCircleIcon />}
                            />
                          </div>
                        )}
                      </StyledSelectWrapper>
                    </div>

                    <div className="group-control">
                      <StyledSelectWrapper>
                        <Select
                          className="select-duration"
                          name="durationEndDay"
                          title={t('myTime.myLeave.groupControl.title.endDay')}
                          allowClear={false}
                          value={selectedDuration}
                          options={formatNotAPIOption(
                            durationPartialDayList,
                            selectedDurationEndDay
                          )}
                          onSelect={handleOnSelectDurationEndDay}
                          required
                        />

                        {form.watch('durationEndDay') === 'halfDay' && (
                          <Select
                            style={{ marginTop: '24px' }}
                            className="select-session-day"
                            name="sessionEndDay"
                            allowClear={false}
                            options={formatNotAPIOption(sessionDayList, selectedSessionEndDay)}
                            onSelect={handleOnSelectSessionEndDay}
                          />
                        )}

                        {form.watch('durationEndDay') === 'specifyTime' && (
                          <div className="specify-time">
                            <Input
                              type="time"
                              name="fromTimeEndDay"
                              subLabel={t('myTime.myLeave.groupControl.title.from')}
                              icons={<TimeCircleIcon />}
                            />
                            <Input
                              type="time"
                              name="toTimeEndDay"
                              subLabel={t('myTime.myLeave.groupControl.title.to')}
                              icons={<TimeCircleIcon />}
                            />
                          </div>
                        )}
                      </StyledSelectWrapper>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}

        <div className="group-control">
          <Text strong>{t('myTime.myLeave.groupControl.title.assignee')}</Text>
          {directReporter && (
            <Row className="assignee">
              <Avatar
                fgColor="#1b1f3b"
                size="32"
                color="#d8ddf2"
                maxInitials={1}
                name={directReporter?.data.name}
                round={true}
                alt={directReporter?.data.name}
              />
              <Text>{directReporter?.data.name}</Text>
            </Row>
          )}
        </div>

        <div className="group-control">
          <Select
            showSearch
            className="select-email"
            name="emailCC"
            mode="multiple"
            optionLabelProp="label"
            title={t('myTime.myLeave.groupControl.title.emailCC')}
            placeholder={t('myTime.myLeave.groupControl.placeholder.emailCC')}
            allowClear={false}
            listHeight={398}
            menuItemSelectedIcon={null}
            options={formattedEmailCC}
            onSearch={handleOnSearchEmailCC}
            onChange={handleOnChangeEmailCC}
          />
        </div>

        <div className="group-control">
          <Input
            type="textarea"
            name="comment"
            label={t('myTime.myLeave.groupControl.title.comment')}
            required
          />
        </div>

        <Row className="group-button">
          <Button
            key="submit"
            loading={isCreatingLeave}
            onClick={() => {
              form.handleSubmit(handleOnSubmit)();
            }}
          >
            {t('common:confirm.save')}
          </Button>
          <Button key="back" border="outline" onClick={handleCloseModal}>
            {t('common:confirm.cancel')}
          </Button>
        </Row>
      </FormProvider>
      <StyledModal
        type="confirm"
        visible={isOpenErrorModal}
        onCancel={handleCloseErrorModal}
        confirmIcon={<CloseIcon />}
        title={errorModalTitle}
      >
        {leaveDuplicatedList?.map((leaveDuplicatedItem: any, index) => {
          return (
            <div key={index} className="leave-duplicated">
              {/* <span className="dot"></span> */}
              {`${formatTimestampToDateTime(
                leaveDuplicatedItem?.fromDate
              )} - ${formatTimestampToDateTime(leaveDuplicatedItem?.toDate)}: `}
              <strong>{leaveDuplicatedItem?.leaveTypeName}</strong>
            </div>
          );
        })}
        <Row className="group-button">
          <Button key="back" height={44} onClick={handleCloseErrorModal}>
            {t('common:confirm.ok')}
          </Button>
        </Row>
      </StyledModal>
    </StyledModalForm>
  );
};

export default MyLeaveModalForm;
