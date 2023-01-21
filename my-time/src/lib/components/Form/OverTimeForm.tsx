import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  DateRangePicker,
  Input,
  Select,
  Title,
  Text,
  Checkbox,
  openNotification,
  Modal
} from '@nexthcm/components';
import { Space } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import { OptionType } from '@nexthcm/components';
import { debounce } from 'lodash';
import { FocusEvent, useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useGetUserMutation, useGetStateQuery, usePostOTRequestMutation } from '../../services';
import moment from 'moment/moment';
import { User, UserResponse, WorkingType, Status } from '../../types';
import Option from './Option';
import {
  BtnWrapper,
  ErrorMessageStyled,
  OTErrorMessageStyled,
  StyledOptionCheckbox
} from './styles';
import { useFormat, useModal } from '@nexthcm/common';
import { LeaveDuplicatedType } from './LeaveForm';
import { parsedTimeStampToDate } from '../../constants/LeaveRequestManagenebt';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

interface Props {
  handleCloseModal: () => void;
}

const OverTimeForm: React.FC<Props> = ({ handleCloseModal }) => {
  const { t, i18n } = useTranslation();
  const formatDate = useFormat();

  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [employees, setEmployees] = useState<User[]>([]);
  const [idEmployee, setIdEmployee] = useState<string>('');
  const [dateValues, setDateValues] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [statusList, setStatusList] = useState<Status[]>([]);
  const [selectedEmailCC, setSelectedEmailCC] = useState<Array<string | number>>([]);
  const [emailCC, setEmailCC] = useState<User[]>([]);
  const [getEmployee] = useGetUserMutation();
  const [postOTRequest, { isLoading }] = usePostOTRequestMutation();
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const { pathname } = useLocation();
  const [errorMessageLeaveDuplicated, setIsErrorMessageLeaveDuplicated] = useState('');
  const [leaveDuplicatedList, setLeaveDuplicatedList] = useState([]);
  const listType = ['overtime', 'afterHours'];
  const formatFromDate = useFormat('MM/DD/YYYY 00:00:00:000', 'DD/MM/YYYY 00:00:00:000');
  const formatToDate = useFormat('MM/DD/YYYY 23:59:59:999', 'DD/MM/YYYY 23:59:59:999');
  const { isOpen, handleClose, handleOpen } = useModal();

  const form = useForm({
    defaultValues: {
      comment: '',
      type: '',
      dateRange: [] as number[]
    },
    resolver: yupResolver(
      yup.object({
        employee: yup.string().required(t('common:form.required')),
        comment: yup.string().trim().required(t('common:form.required')),
        dateRange: yup.array().min(2, t('common:form.required')),
        workingTime: yup.string().required(t('common:form.required'))
      })
    )
  });

  useEffect(() => {
    form.setValue('type', WorkingType[listType[0]]);
  }, []);

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

  const { data: stateData } = useGetStateQuery({
    type: 1
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

  const submitOTRequest = (data: any) => {
    if (dateValues) {
      let payload: any = {
        comment: data.comment,
        duration: +data.workingTime.replace(',', '.') * 3600,
        fromDate: data.dateRange[0],
        stateId: data.stateId,
        toDate: data.dateRange[1],
        type: data.type,
        userId: idEmployee
        // sendToIds: selectedEmailCC
      };
      if (selectedEmailCC && selectedEmailCC.length > 0) {
        payload = { ...payload, sendToIds: selectedEmailCC };
      }
      postOTRequest(payload)
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
    }
  };

  return (
    <div className="overtime-modal">
      <Title className="title">{t(`requestManagement.requestWorkOT`)}</Title>
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
        <div style={{ margin: '22px 0' }}>
          <Select
            allowClear={false}
            name="type"
            title={t(`requestManagement.type`)}
            options={listType.map((item: any, index: number) => ({
              key: index,
              label: item,
              value: WorkingType[item],
              render: () => <p>{t(`requestManagement.${item}`)}</p>
            }))}
          />
        </div>
        <Text className="text-label" strong>
          {t(`requestManagement.dateRange`)}
          <span className="required-mark">*</span>
        </Text>
        <DateRangePicker
          format={formatDate}
          label=" "
          style={{ marginBottom: '22px' }}
          onChange={(value: any) => {
            if (value) {
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
        {dateValues.length === 0 && (
          <ErrorMessageStyled className="error-message-ot-modal">
            {form.formState.errors.dateRange?.message}
          </ErrorMessageStyled>
        )}
        <Input
          type="numberFloat"
          name="workingTime"
          label={t(`requestManagement.totalWorkingTime`)}
          placeholder={t(`requestManagement.enterWorkingHour`)}
          required
          className="working-time-input"
          decimal={1}
        />
        <div style={{ margin: '22px 0' }}>
          <Select
            className="status-select"
            name="stateId"
            title={t(`requestManagement.transitionToStatus`)}
            placeholder={t(`requestManagement.chooseStatus`)}
            options={formattedStatus}
          />
        </div>
        <Input
          className="comment-input"
          type="textarea"
          label={t(`requestManagement.comment`)}
          name="comment"
          required
        />
        <div style={{ marginTop: '22px' }}>
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
        <BtnWrapper>
          <Space size="small">
            <Button
              disabled={isLoading}
              loading={isLoading}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit(submitOTRequest)();
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

export default OverTimeForm;
