import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  ClearIcon,
  DateRangePickerRequired,
  Input,
  PlusIcon,
  Select,
  Text,
  Checkbox,
  Title,
  openNotification,
  Modal
} from '@nexthcm/components';
import { Row, Space } from 'antd';
import { OptionType } from '@nexthcm/components';
import { debounce, isNull } from 'lodash';
import moment from 'moment/moment';
import { FocusEvent, useCallback, useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { RangeValue } from 'rc-picker/lib/interface';
import {
  useGetUserMutation,
  useGetOnSiteQuery,
  useGetStateQuery,
  usePostWFHMutation,
  useCheckDuplicateRequestWFHMutation,
  useGetCalculateWorkingDateMutation,
  useGetUserOrganizationQuery,
  useGetWfhEscalateMutation
} from '../../services';
import { Status, User, UserResponse, OnSite } from '../../types';
import Option from './Option';
import { BtnWrapper, StyledOptionCheckbox } from './styles';
import { DefaultOptionType } from 'antd/lib/select';
import { RootState, useCommonSelector, useFormat, useModal } from '@nexthcm/common';
import { LeaveDuplicatedType } from './LeaveForm';
import { parsedTimeStampToDate } from '../../constants/LeaveRequestManagenebt';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CustomizedAvatar } from '../CustomizedAvatar';

interface Props {
  handleCloseModal: () => void;
}

const WFHForm: React.FC<Props> = ({ handleCloseModal }) => {
  const { t, i18n } = useTranslation();
  const { userId } = useCommonSelector((state: RootState) => state.user.user);
  const formatDate = useFormat();
  const formatFromDate = useFormat('MM/DD/YYYY 00:00:00:000', 'DD/MM/YYYY 00:00:00:000');
  const formatToDate = useFormat('MM/DD/YYYY 23:59:59:999', 'DD/MM/YYYY 23:59:59:999');

  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [employees, setEmployees] = useState<User[]>([]);
  const [idEmployee, setIdEmployee] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const [selectedEmailCC, setSelectedEmailCC] = useState<Array<string | number>>([]);
  const [emailCC, setEmailCC] = useState<User[]>([]);
  const [statusList, setStatusList] = useState<Status[]>([]);
  const [getEmployee] = useGetUserMutation();
  const [postWFH, { isLoading }] = usePostWFHMutation();
  const [checkDuplicateWorkFromHome] = useCheckDuplicateRequestWFHMutation();
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const { pathname } = useLocation();
  const { isOpen, handleClose, handleOpen } = useModal();
  const [errorMessageLeaveDuplicated, setIsErrorMessageLeaveDuplicated] = useState('');
  const [leaveDuplicatedList, setLeaveDuplicatedList] = useState([]);
  const [escalateUser, setEscalateUser] = useState<any>();
  const { data: userOrganizationData } = useGetUserOrganizationQuery({ userId });
  const [getCalculateWorkingDate, { isLoading: isGettingCalculateWorkingDate }] =
    useGetCalculateWorkingDateMutation();
  const [getWfhEscalate, { isLoading: isGettingWfhEscalate }] = useGetWfhEscalateMutation();

  const form = useForm({
    defaultValues: {
      comment: '',
      dateRangeNotContinuous: [{ date: [] }] as any[]
    },
    resolver: yupResolver(
      yup.object({
        employee: yup.string().required(t('common:form.required')),
        comment: yup.string().trim().required(t('common:form.required')),
        dateRangeNotContinuous: yup.array().of(
          yup.object().shape({
            date: yup.array().min(2, t('common:form.required'))
          })
        )
      })
    )
  });

  const handleOnChangeDateRange = (value: RangeValue<moment.Moment>, index: number) => {
    form.setValue(`dateRangeNotContinuous.${index}.date`, value);
    if (value) {
      const payloadDateRange = {
        userId: idEmployee,
        fromDate: new Date(moment(value[0]).format(formatFromDate)).getTime(),
        toDate: new Date(moment(value[1]).format(formatToDate)).getTime()
      };
      checkDuplicateWorkFromHome(payloadDateRange)
        .unwrap()
        .then(() => {
          form.clearErrors();
          setDisabled(false);

          getCalculateWorkingDate({
            fromDate: new Date(moment(value[0]).format(formatFromDate)).getTime(),
            toDate: new Date(moment(value[1]).format(formatToDate)).getTime(),
            orgId: userOrganizationData.id
          })
            .unwrap()
            .then(() => {
              setDisabled(false);

              getWfhEscalate({
                userId,
                totalDay: 1
              })
                .then((response: any) => {
                  setEscalateUser(response.data);
                })
                .catch((error) => {
                  const errorMessage = i18n.exists(`common:ERRORS.${error?.data?.message}`)
                    ? t(`common:ERRORS.${error?.data?.message}`)
                    : t(`common:HTTP_RESPONSE_ERROR_MESSAGES.${error.status}`);

                  openNotification({
                    type: 'error',
                    message: errorMessage
                  });
                });
            })
            .catch(() => {
              setDisabled(true);
            });
        })
        .catch(() => {
          form.setError(`dateRangeNotContinuous.${index}.date`, {
            type: 'custom',
            message: t('common:form.duplicated')
          });
          setDisabled(true);
        });
    }
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'dateRangeNotContinuous'
  });

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

  const { data: stateData } = useGetStateQuery({
    type: 4
  });

  useEffect(() => {
    if (stateData) {
      setStatusList(stateData.data);
    }
  }, [stateData]);

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

  const submitRequest = (data: any) => {
    const payload: any = {
      comment: data.comment,
      dateRangeNotContinuous:
        data.dateRangeNotContinuous[0].date.length > 0 &&
        data.dateRangeNotContinuous.map((item) => ({
          fromDate: new Date(moment(item.date[0]).format(formatFromDate)).getTime(),
          toDate: new Date(moment(item.date[1]).format(formatToDate)).getTime()
        })),
      userId: idEmployee,
      sendToIds: selectedEmailCC,
      stateId: data.stateId,
      escalateInfo: escalateUser
    };
    selectedEmailCC.length === 0 && delete payload.sendToIds;
    postWFH(payload)
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
        // const errorMessage = i18n.exists(`common:ERRORS.${error.data.message}`)
        //   ? t(`common:ERRORS.${error.data.message}`)
        //   : t(`common:HTTP_RESPONSE_ERROR_MESSAGES.${error.status}`);
        // openNotification({
        //   type: 'error',
        //   message: errorMessage
        // });
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
  };

  return (
    <div className="wfh-modal">
      <Title className="title">{t(`requestManagement.requestWFH`)}</Title>
      <FormProvider {...form}>
        <div style={{ marginBottom: '22px' }}>
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
        </div>
        <Text className="text-label" strong>
          {t(`requestManagement.dateRange`)}
          <span className="required-mark">*</span>
        </Text>
        {fields.map((_, index) => (
          <div key={index} className="container-date-range-picker">
            <div className="date-range-picker">
              <DateRangePickerRequired
                format={formatDate}
                label=" "
                className="date-range-picker"
                parentName="dateRangeNotContinuous"
                name={`dateRangeNotContinuous.${index}.date`}
                onChange={(value) => {
                  handleOnChangeDateRange(value, index);
                }}
              />
            </div>

            <Button
              disabled={fields.length <= 1}
              icon={<ClearIcon />}
              height={32}
              size="small"
              className="btn btn-delete"
              onClick={() => remove(index)}
            />
          </div>
        ))}
        <Button
          className="btn btn-append"
          height={32}
          icon={<PlusIcon />}
          onClick={() => append({ date: [] })}
        ></Button>

        <div className="group-control">
          <Text strong>{t('myTime.myRequest.groupControl.title.assignee')}</Text>
          {escalateUser && (
            <Row style={{ alignItems: 'center' }}>
              <CustomizedAvatar
                size="32"
                image={escalateUser?.avatarUrl}
                name={escalateUser?.fullName}
                id={escalateUser?.id}
                round
              />
              <Text style={{ color: '#1b1f3b', fontSize: '15px', marginLeft: '8px' }}>
                {escalateUser?.fullName}
              </Text>
            </Row>
          )}
        </div>

        <div style={{ marginBottom: '22px' }}>
          <Select
            name="stateId"
            title={t(`requestManagement.transitionToStatus`)}
            placeholder={t(`requestManagement.chooseStatus`)}
            options={formattedStatus}
          />
        </div>
        <div style={{ marginBottom: '22px' }}>
          <Input type="textarea" label={t(`requestManagement.comment`)} name="comment" required />
        </div>
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
        <BtnWrapper>
          <Space size="small">
            <Button
              disabled={
                isLoading || disabled || isGettingCalculateWorkingDate || isGettingWfhEscalate
              }
              loading={isLoading}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit(submitRequest)();
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

export default WFHForm;
