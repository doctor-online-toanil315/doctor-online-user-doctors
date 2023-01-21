import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Checkbox,
  DateRangePicker,
  Input,
  Modal,
  openNotification,
  Select,
  Text,
  TimeCircleIcon,
  Title
} from '@nexthcm/components';
import { Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { OptionType } from '@nexthcm/components';
import { debounce } from 'lodash';
import moment from 'moment/moment';
import { FocusEvent, useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DefaultOptionType } from 'antd/lib/select';
import * as yup from 'yup';
import {
  useGetDirectReportQuery,
  useGetFileStoreQuery,
  useGetLeaveRemainingQuery,
  useGetStateQuery,
  useGetUserMutation,
  usePostLeaveMutation
} from '../../services';
import { IDirectReport, Leave, Partial, PartialDay, Status, User, UserResponse } from '../../types';
import Card from './Card';
import Option from './Option';
import './style.scss';
import {
  BtnWrapper,
  ErrorMessageStyled,
  ListCardContainer,
  SelectWrapper,
  StyledOptionCheckbox,
  LeaveErrorMessageStyled
} from './styles';
import { useFormat, useModal } from '@nexthcm/common';
import { parsedTimeStampToDate } from '../../constants/LeaveRequestManagenebt';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
interface Props {
  listPartialDay: PartialDay[];
  handleCloseModal: () => void;
}

export interface LeaveDuplicatedType {
  fromDate: number;
  toDate: number;
  leaveTypeName: string;
}

const LeaveForm: React.FC<Props> = ({ handleCloseModal, listPartialDay }) => {
  const { t, i18n } = useTranslation();
  const formatDate = useFormat();
  const [dateValues, setDateValues] = useState<number[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [employees, setEmployees] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [leaveList, setLeaveList] = useState<Leave[]>([]);
  const [statusList, setStatusList] = useState<Status[]>([]);
  const [idEmployee, setIdEmployee] = useState<string>('');
  const [isSameDate, setIsSameDate] = useState<boolean>(false);
  const [directReportData, setDirectReportData] = useState<IDirectReport>();
  const [avatarDirectReport, setAvatarDirectReport] = useState<''>();
  const [selectedLeave, setSelectedLeave] = useState<string>('');
  const [selectedEmailCC, setSelectedEmailCC] = useState<Array<string | number>>([]);
  const [emailCC, setEmailCC] = useState<User[]>([]);
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const { pathname } = useLocation();
  const { isOpen, handleClose, handleOpen } = useModal();
  const [getEmployee] = useGetUserMutation();
  const [postLeave, { isLoading: isSaving }] = usePostLeaveMutation();
  const [errorMessageLeaveDuplicated, setIsErrorMessageLeaveDuplicated] = useState('');
  const [leaveDuplicatedList, setLeaveDuplicatedList] = useState([]);
  const formatFromDate = useFormat('MM/DD/YYYY 00:00:00:000', 'DD/MM/YYYY 00:00:00:000');
  const formatToDate = useFormat('MM/DD/YYYY 23:59:59:999', 'DD/MM/YYYY 23:59:59:999');
  const listDurations = ['fullDay', 'halfDay', 'specifyTime'];
  const listDurationsOfPartialDay = ['halfDay', 'specifyTime'];
  const listSessionDay = ['morning', 'afternoon'];
  const form = useForm({
    defaultValues: {
      employee: undefined, // value of employee Select field
      dateRange: [] as number[],
      duration: '',
      timeFrom: '',
      timeTo: '',
      partial: '',
      sessionOfDay: '',
      sessionOfEndDay: '',
      durationOfPartial: '',
      durationOfPartialEndDay: '',
      fromOfEndDay: '',
      toOfEndDay: '',
      fromOfStartDay: '',
      toOfStartDay: ''
    },
    resolver: yupResolver(
      yup.object().shape(
        {
          employee: yup.string().required(t('common:form.required')),
          dateRange: yup.array().min(2, t('common:form.required')),
          timeFrom: yup.string().when('duration', {
            is: (duration) => duration === 'specifyTime',
            then: (schema) => schema.required(t('common:form.required'))
          }),
          timeTo: yup
            .string()
            .when('duration', {
              is: (duration) => duration === 'specifyTime',
              then: (schema) => schema.required(t('common:form.required'))
            })
            .when('timeFrom', {
              is: () => {
                return (
                  form.watch('timeFrom') >= form.watch('timeTo') && form.watch('timeTo') !== ''
                );
              },
              then: (schema) => {
                return schema.test({
                  name: 'timeTo',
                  test: () => false,
                  message: t('requestManagement.errorEarlierTime')
                });
              }
            }),
          fromOfStartDay: yup.string().when('durationOfPartial', {
            is: (durationOfPartial) => durationOfPartial === 'specifyTime',
            then: (schema) => schema.required(t('common:form.required'))
          }),
          toOfStartDay: yup
            .string()
            .when('durationOfPartial', {
              is: (durationOfPartial) => durationOfPartial === 'specifyTime',
              then: (schema) => schema.required(t('common:form.required'))
            })
            .when('fromOfStartDay', {
              is: () => {
                return (
                  form.watch('fromOfStartDay') >= form.watch('toOfStartDay') &&
                  form.watch('toOfStartDay') !== ''
                );
              },
              then: (schema) => {
                return schema.test({
                  name: 'toOfStartDay',
                  test: () => false,
                  message: t('requestManagement.errorEarlierTime')
                });
              }
            }),
          fromOfEndDay: yup.string().when('durationOfPartialEndDay', {
            is: (durationOfPartialEndDay) => durationOfPartialEndDay === 'specifyTime',
            then: (schema) => schema.required(t('common:form.required'))
          }),
          toOfEndDay: yup
            .string()
            .when('durationOfPartialEndDay', {
              is: (durationOfPartialEndDay) => durationOfPartialEndDay === 'specifyTime',
              then: (schema) => schema.required(t('common:form.required'))
            })
            .when('fromOfEndDay', {
              is: () => {
                return (
                  form.watch('fromOfEndDay') >= form.watch('toOfEndDay') &&
                  form.watch('toOfEndDay') !== ''
                );
              },
              then: (schema) => {
                return schema.test({
                  name: 'toOfEndDay',
                  test: (value: any) => false,
                  message: t('requestManagement.errorEarlierTime')
                });
              }
            }),
          comment: yup.string().trim().required(t('common:form.required'))
        },
        [['timeTo', 'timeTo']]
      )
    )
  });

  const { data: leaveListData, isFetching: isFetchingLeaveRemaining } = useGetLeaveRemainingQuery(
    {
      id: idEmployee,
      fromDate: dateValues[0],
      toDate: dateValues[1]
    },
    {
      skip: !idEmployee || dateValues.length === 0
    }
  );

  useEffect(() => {
    if (leaveListData) {
      setLeaveList(leaveListData.data);
    }
  }, [leaveListData]);

  const { data: stateData } = useGetStateQuery(
    {
      type: 5,
      leaveTypeId: selectedLeave
    },
    {
      skip: !selectedLeave
    }
  );

  useEffect(() => {
    if (stateData) {
      setStatusList(stateData.data);
    }
  }, [stateData]);

  const { data: directReport } = useGetDirectReportQuery(
    {
      id: idEmployee
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !idEmployee
    }
  );

  useEffect(() => {
    if (directReport) {
      setDirectReportData(directReport.data);
    }
  }, [directReport]);

  const { data: avatarImg, isLoading } = useGetFileStoreQuery(
    {
      subPath: directReportData?.avatar
    },
    {
      skip: !directReportData?.avatar
    }
  );

  useEffect(() => {
    if (avatarImg) setAvatarDirectReport(avatarImg);
  }, [avatarImg]);

  useEffect(() => {
    if (dateValues.length === 0) {
      setLeaveList([]);
    }
  }, [dateValues]);

  useEffect(() => {
    form.setValue('partial', listPartialDay[0]?.id);
    form.setValue('sessionOfDay', 'morning');
    form.setValue('sessionOfEndDay', 'morning');
    form.setValue('duration', 'halfDay');
    form.setValue('durationOfPartial', 'halfDay');
    form.setValue('durationOfPartialEndDay', 'halfDay');
  }, [listPartialDay]);

  const formattedUsersData: OptionType[] = employees?.map((item) => {
    item = { ...item, image: item.avatar } as any; // Option component does not accept avatar property
    return {
      key: item.id,
      label: item.name,
      value: item.name,
      render: () => <Option employee={item} selectedEmployee={idEmployee}></Option>
    };
  });

  const findEmployee = (id: string, name: string) => {
    setSearchValue(name);
    setIdEmployee(id);
  };

  const debounceInputOnChange = useCallback(
    debounce((nextValue) => {
      getEmployee({ search: nextValue })
        .unwrap()
        .then((data: User[]) => {
          setEmployees(data);

          if (data[0].name.toLowerCase() === nextValue) {
            findEmployee(data[0].id, data[0].name);
          }
        })
        .catch((error) => {
          const errorMessage = i18n.exists(`common:ERRORS.${error?.data?.message}`)
            ? t(`common:ERRORS.${error?.data?.message}`)
            : t(`common:HTTP_RESPONSE_ERROR_MESSAGES.${error?.status}`);

          openNotification({
            type: 'error',
            message: errorMessage
          });
        });
    }, 500),
    []
  );

  const handleOnSearch = (value: string) => {
    setSearchValue(value);
    if (selectedEmployee) {
      setSelectedEmployee(searchValue);
    }
    if (value !== '') {
      debounceInputOnChange(value);
    }
    if (employees) {
      if (value === employees[0]?.name.toLowerCase()) {
        setSearchValue(employees[0]?.name);
        setIdEmployee(employees[0]?.id);
      }
    }
  };
  const handleOnSelect = (value: string, option: DefaultOptionType) => {
    setSelectedEmployee(value);
    setSearchValue(value);
    setIdEmployee(option['key']);
  };
  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleChangeValueSelect = (value: Array<string | number>) => {
    setSelectedEmailCC(value);
  };

  const debounceEmailOnChange = useCallback(
    debounce((nextValue) => {
      getEmployee({ search: nextValue })
        .unwrap()
        .then((data: User[]) => {
          setEmailCC(data);
        });
    }, 500),
    []
  );

  const handleOnSearchEmailCC = (value: string) => {
    if (value !== '') {
      debounceEmailOnChange(value);
    }
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

  const formattedStatus: OptionType[] = statusList.map((item) => ({
    key: item.id,
    label: item.id,
    value: item.id,
    type: 'default',
    render: () => (
      <div className="select-status" style={{ backgroundColor: item.stateType.color }}>
        <div className="name-status">{item.name}</div>
      </div>
    )
  }));

  const submitLeaveRequest = (data: any) => {
    if (dateValues && selectedLeave) {
      const payload: any = {
        comment: data.comment,
        fromDate: dateValues[0],
        toDate: dateValues[1],
        employeeId: idEmployee,
        sendToIds: selectedEmailCC,
        stateId: data.stateId ? data.stateId : null,
        leaveTypeId: selectedLeave
      };
      selectedEmailCC.length === 0 && delete payload.sendToIds;
      if (isSameDate) {
        if (form.watch('duration') === 'fullDay') {
          payload.items = [{ fullDay: true }];
        } else if (form.watch('duration') === 'specifyTime') {
          const timeFrom = form
            .watch('timeFrom')
            .split(':')
            .map((x) => +x);
          const timeTo = form
            .watch('timeTo')
            .split(':')
            .map((x) => +x);
          payload.items = [
            {
              fromTime: timeFrom[0] * 3600 + timeFrom[1] * 60,
              toTime: timeTo[0] * 3600 + timeTo[1] * 60
            }
          ];
        } else {
          form.watch('sessionOfDay') === 'morning'
            ? (payload.items = [{ morning: true }])
            : (payload.items = [{ afternoon: true }]);
        }
      } else {
        payload.partialDayTypeId = data.partial;

        if (form.watch('durationOfPartial') === 'specifyTime') {
          const timeFrom = form
            .watch('fromOfStartDay')
            .split(':')
            .map((x) => +x);
          const timeTo = form
            .watch('toOfStartDay')
            .split(':')
            .map((x) => +x);
          payload.items = [
            {
              fromTime: timeFrom[0] * 3600 + timeFrom[1] * 60,
              toTime: timeTo[0] * 3600 + timeTo[1] * 60
            }
          ];
        } else {
          form.watch('sessionOfDay') === 'morning'
            ? (payload.items = [{ morning: true }])
            : (payload.items = [{ afternoon: true }]);
        }

        if (form.watch('partial') === listPartialDay[4].id) {
          if (form.watch('durationOfPartialEndDay') === 'specifyTime') {
            const timeFrom = form
              .watch('fromOfEndDay')
              .split(':')
              .map((x) => +x);
            const timeTo = form
              .watch('toOfEndDay')
              .split(':')
              .map((x) => +x);
            payload.items.push({
              fromTime: timeFrom[0] * 3600 + timeFrom[1] * 60,
              toTime: timeTo[0] * 3600 + timeTo[1] * 60
            });
          } else {
            form.watch('sessionOfEndDay') === 'morning'
              ? payload.items.push({ morning: true })
              : payload.items.push({ afternoon: true });
          }
        }
      }
      postLeave(payload)
        .unwrap()
        .then(() => {
          openNotification({
            type: 'success',
            message: t('submitSuccessfully')
          });
          navigate({ pathname: `${pathname}`, search: searchParam.toString() });
          handleCloseModal();
        })
        .catch((error) => {
          const isShowErrorHasDate =
            error?.data?.message?.trim() === 'LEAVE_IS_DUPLICATED_DURATION_WITH_ANOTHER_LEAVE';
          const errorMessage = i18n.exists(`common:ERRORS.${error?.data?.message}`)
            ? t(`common:ERRORS.${error?.data?.message}`)
            : t(`common:HTTP_RESPONSE_ERROR_MESSAGES.${error?.status}`);
          if (isShowErrorHasDate) {
            const leaveDuplicatedList = error?.data?.errorMetadata?.leaveDuplicatedList || [];
            setLeaveDuplicatedList(leaveDuplicatedList);
            setIsErrorMessageLeaveDuplicated(errorMessage);
            handleOpen();
          } else {
            openNotification({
              type: 'error',
              message: errorMessage
            });
          }
        });
    }
  };

  return (
    <div className="leave-modal">
      <Title className="title">{t(`requestManagement.submitLeaveRequest`)}</Title>
      <FormProvider {...form}>
        <Select
          className="employee-container"
          name="employee"
          title={t(`requestManagement.employee`)}
          placeholder={t('requestManagement.searchEmployees')}
          showSearch
          allowClear={false}
          listHeight={398}
          searchValue={selectedEmployee.length > 0 ? selectedEmployee : searchValue}
          onSearch={handleOnSearch}
          onSelect={handleOnSelect}
          options={formattedUsersData}
          onBlur={handleOnBlur}
          required
        />

        <Text style={{ marginTop: '22px' }} className="text-label" strong>
          {t(`requestManagement.dateRange`)}
          <span className="required-mark">*</span>
        </Text>

        <div className="date-range-container" style={{ marginBottom: '22px' }}>
          <DateRangePicker
            format={formatDate}
            label=" "
            onChange={(value: any) => {
              if (value) {
                setIsSameDate(
                  moment(value[0]).format(formatDate) === moment(value[1]).format(formatDate)
                );
                const dateFormat: number[] = [];
                dateFormat.push(new Date(moment(value[0]).format(formatFromDate)).getTime());
                dateFormat.push(new Date(moment(value[1]).format(formatToDate)).getTime());
                form.setValue('dateRange', dateFormat);
                setDateValues(dateFormat);
              } else {
                form.setValue('dateRange', []);
                setDateValues([]);
              }
            }}
          />
        </div>
        {dateValues.length === 0 && (
          <ErrorMessageStyled>{form.formState.errors.dateRange?.message}</ErrorMessageStyled>
        )}

        {dateValues.length !== 0 && (
          <div style={{ marginTop: '22px' }}>
            <Text className="text-label" strong>
              {t(`requestManagement.leaveType`)}
              <span className="required-mark">*</span>
            </Text>
            <Spin
              className="loading"
              spinning={isFetchingLeaveRemaining}
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            >
              <ListCardContainer>
                {leaveList.map((item: Leave) => (
                  <Card
                    setSelectedLeave={setSelectedLeave}
                    id={item.leaveTypeId}
                    key={item.leaveTypeId}
                    leaveName={item.leaveTypeName}
                    active={selectedLeave === item.leaveTypeId ? true : false}
                    remainingDays={item.remainingEntitlement}
                    availableDays={item.hasAvailableLeave ? item.availableLeave : undefined}
                    disabled={
                      (item.availableLeave === 0 && item.hasAvailableLeave) ||
                      item.remainingEntitlement <= 0
                    }
                  />
                ))}
              </ListCardContainer>
            </Spin>
          </div>
        )}

        {leaveList.length !== 0 && selectedLeave === '' && form.formState.isSubmitted && (
          <LeaveErrorMessageStyled>{t('common:form.required')}</LeaveErrorMessageStyled>
        )}

        {form.getValues('dateRange').length !== 0 && !isSameDate && (
          <div style={{ marginBottom: '22px' }}>
            <Select
              required
              name="partial"
              title={t(`requestManagement.partialDay`)}
              allowClear={false}
              options={listPartialDay.map((item: any, index: number) => ({
                key: index,
                label: Partial[item.type],
                value: item.id,
                render: () => <p>{t(`requestManagement.${Partial[item.type]}`)}</p>
              }))}
              onChange={() => {
                form.setValue('durationOfPartial', 'halfDay');
                form.setValue('sessionOfDay', 'morning');
              }}
            />
          </div>
        )}

        {form.getValues('dateRange').length !== 0 && isSameDate && (
          <SelectWrapper>
            <Select
              className="duration-select"
              required
              name="duration"
              title={t(`requestManagement.duration`)}
              allowClear={false}
              onChange={() => {
                form.setValue('sessionOfDay', 'morning');
                form.setValue('timeFrom', '');
                form.setValue('timeTo', '');
              }}
              options={listDurations.map((item: any, index: number) => ({
                key: index,
                label: item,
                value: item,
                render: () => <p>{t(`requestManagement.${item}`)}</p>
              }))}
            />

            {form.watch('duration') === 'halfDay' && (
              <Select
                style={{ marginTop: '24px' }}
                name="sessionOfDay"
                allowClear={false}
                options={listSessionDay.map((item: any, index: number) => ({
                  key: index,
                  label: item,
                  value: item,
                  render: () => <p>{t(`requestManagement.${item}`)}</p>
                }))}
              />
            )}
            {form.watch('duration') === 'specifyTime' && (
              <div className="container-specify-time">
                <Input
                  icons={<TimeCircleIcon />}
                  subLabel={t('requestManagement.from')}
                  type="time"
                  name="timeFrom"
                />
                <Input
                  icons={<TimeCircleIcon />}
                  subLabel={t('requestManagement.to')}
                  type="time"
                  name="timeTo"
                />
              </div>
            )}
          </SelectWrapper>
        )}

        {form.getValues('dateRange').length !== 0 &&
          !isSameDate &&
          form.watch('partial') !== listPartialDay[0].id && (
            <SelectWrapper>
              <Select
                required
                name="durationOfPartial"
                title={
                  form.watch('partial') === listPartialDay[1].id
                    ? t('requestManagement.duration')
                    : form.watch('partial') !== listPartialDay[3].id
                    ? t('requestManagement.startDayPartial')
                    : t('requestManagement.endDayPartial')
                }
                allowClear={false}
                options={listDurationsOfPartialDay.map((item: any, index: number) => ({
                  key: index,
                  label: item,
                  value: item,
                  render: () => <p>{t(`requestManagement.${item}`)}</p>
                }))}
                onChange={() => {
                  form.setValue('sessionOfDay', 'morning');
                  form.setValue('fromOfStartDay', '');
                  form.setValue('toOfStartDay', '');
                }}
              />

              {form.watch('durationOfPartial') === 'halfDay' && (
                <Select
                  style={{ marginTop: '24px' }}
                  name="sessionOfDay"
                  allowClear={false}
                  options={listSessionDay.map((item: any, index: number) => ({
                    key: index,
                    label: item,
                    value: item,
                    render: () => <p>{t(`requestManagement.${item}`)}</p>
                  }))}
                />
              )}

              {form.watch('durationOfPartial') === 'specifyTime' && (
                <div className="container-specify-time">
                  <Input
                    icons={<TimeCircleIcon />}
                    subLabel={t('requestManagement.from')}
                    type="time"
                    name="fromOfStartDay"
                  />
                  <Input
                    icons={<TimeCircleIcon />}
                    subLabel={t('requestManagement.to')}
                    type="time"
                    name="toOfStartDay"
                  />
                </div>
              )}
            </SelectWrapper>
          )}

        {form.getValues('dateRange').length !== 0 &&
          !isSameDate &&
          form.watch('partial') === listPartialDay[4].id && (
            <SelectWrapper
              style={{ marginTop: form.watch('durationOfPartial') === 'halfDay' ? '22px' : '0' }}
            >
              <Select
                required
                name="durationOfPartialEndDay"
                title={t(`requestManagement.endDayPartial`)}
                allowClear={false}
                options={listDurationsOfPartialDay.map((item: any, index: number) => ({
                  key: index,
                  label: item,
                  value: item,
                  render: () => <p>{t(`requestManagement.${item}`)}</p>
                }))}
                onChange={() => {
                  form.setValue('sessionOfEndDay', 'morning');
                  form.setValue('fromOfEndDay', '');
                  form.setValue('toOfEndDay', '');
                }}
              />

              {form.watch('durationOfPartialEndDay') === 'halfDay' && (
                <Select
                  style={{ marginTop: '24px' }}
                  name="sessionOfEndDay"
                  allowClear={false}
                  options={listSessionDay.map((item: any, index: number) => ({
                    key: index,
                    label: item,
                    value: item,
                    render: () => <p>{t(`requestManagement.${item}`)}</p>
                  }))}
                />
              )}

              {form.watch('durationOfPartialEndDay') === 'specifyTime' && (
                <div className="container-specify-time">
                  <Input
                    icons={<TimeCircleIcon />}
                    subLabel={t('requestManagement.from')}
                    type="time"
                    name="fromOfEndDay"
                  />
                  <Input
                    icons={<TimeCircleIcon />}
                    subLabel={t('requestManagement.to')}
                    type="time"
                    name="toOfEndDay"
                  />
                </div>
              )}
            </SelectWrapper>
          )}

        <Select
          name="stateId"
          title={t(`requestManagement.transitionToStatus`)}
          placeholder={t(`requestManagement.chooseStatus`)}
          options={formattedStatus}
        />

        <div style={{ height: '32px', margin: '22px 0 44px' }}>
          <Text className="text-label" strong>
            {t(`requestManagement.assignee`)}
          </Text>
          {directReportData && (
            <div className="direct-report-container">
              {!isLoading && avatarDirectReport ? (
                <img className="reporter-image" src={avatarDirectReport} />
              ) : (
                <div className="fake-image" />
              )}
              <span>{directReportData?.name}</span>
            </div>
          )}
        </div>

        <div style={{ marginBottom: '22px' }}>
          <Select
            showSearch
            name="emailCC"
            title={t(`requestManagement.ccEmail`)}
            placeholder={t(`requestManagement.searchUsers`)}
            mode="multiple"
            allowClear={false}
            listHeight={398}
            options={formattedEmailCC}
            onSearch={handleOnSearchEmailCC}
            onChange={handleChangeValueSelect}
            menuItemSelectedIcon={null}
            optionLabelProp="label"
          />
        </div>

        <Input type="textarea" label={t(`requestManagement.comment`)} name="comment" required />

        <BtnWrapper>
          <Space size="small">
            <Button
              disabled={isSaving}
              loading={isSaving}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit(submitLeaveRequest)();
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
      <Modal
        type="confirm"
        confirmIcon="x"
        className="leave__modal--duplicated"
        visible={isOpen}
        onCancel={() => handleClose()}
      >
        <p style={{ textAlign: 'left', fontSize: '16px', fontWeight: 'bold' }}>
          {errorMessageLeaveDuplicated}
        </p>
        <ul style={{ paddingLeft: '18px' }}>
          {leaveDuplicatedList?.map((item: LeaveDuplicatedType, index: number) => (
            <li key={index}>
              <div style={{ display: 'flex' }}>
                <div style={{ fontSize: 14, fontWeight: 400, minWidth: '44%', textAlign: 'left' }}>
                  {parsedTimeStampToDate(item?.fromDate)} - {parsedTimeStampToDate(item?.toDate)}:
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    display: 'block',
                    textAlign: 'left'
                  }}
                >
                  <span>{item?.leaveTypeName}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
          <Button onClick={() => handleClose()}> {t('common:confirm.ok')}</Button>
        </div>
      </Modal>
    </div>
  );
};

export default LeaveForm;
