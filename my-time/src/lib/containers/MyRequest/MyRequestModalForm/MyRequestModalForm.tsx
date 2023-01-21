import { yupResolver } from '@hookform/resolvers/yup';
import { removeAccentedLetter, RootState, useCommonSelector, useFormat } from '@nexthcm/common';
import {
  Button,
  Checkbox,
  CheckIcon,
  ClearIcon,
  DateRangePickerRequired,
  Input,
  openNotification,
  OptionType,
  PlusIcon,
  Select,
  Text,
  Title
} from '@nexthcm/components';
import { Row } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import { debounce } from 'lodash';
import moment from 'moment';
import { RangeValue } from 'rc-picker/lib/interface';
import { useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { CustomizedAvatar } from '../../../components';
import {
  useCheckDuplicateRequestOnsiteMutation,
  useCheckDuplicateRequestWFHMutation,
  useGetCalculateWorkingDateMutation,
  useGetOnsiteMutation,
  useGetUserMutation,
  useGetUserOrganizationQuery,
  useGetWfhEscalateMutation,
  usePostOTRequestMutation,
  usePostOutsideMutation,
  usePostWFHMutation
} from '../../../services';
import { OnSite, User, WorkingType } from '../../../types';
import { ModalGenre } from '../MyRequestHeader/MyRequestHeader';
import { StyledModalForm } from './styles';

interface MyRequestModalFormProps {
  modalGenre: string;
  modalTitle: string;
  handleCloseModal: () => void;
}

const MyRequestModalForm = (props: MyRequestModalFormProps) => {
  const { modalGenre, modalTitle, handleCloseModal } = props;

  const { userId } = useCommonSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const formatDate = useFormat();
  const [selectedEmailCC, setSelectedEmailCC] = useState<Array<string | number>>([]);
  const [selectedType, setSelectedType] = useState<number>(0);
  const [selectedOffice, setSelectedOffice] = useState<OnSite | null>(null);
  const [emailCC, setEmailCC] = useState<User[]>([]);
  const [office, setOffice] = useState<OnSite[]>([]);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [escalateUser, setEscalateUser] = useState<any>();
  const [dateRangeState, setDateRangeState] = useState<any[]>([
    { isDuplicated: false, isWorkingDateError: false }
  ]);
  const { t, i18n } = useTranslation();
  const { data: userOrganizationData } = useGetUserOrganizationQuery({ userId });
  const [getCalculateWorkingDate, { isLoading: isGettingCalculateWorkingDate }] =
    useGetCalculateWorkingDateMutation();
  const [getWfhEscalate, { isLoading: isGettingWfhEscalate }] = useGetWfhEscalateMutation();
  const [getEmailCC] = useGetUserMutation();
  const [getOffice, { isLoading: isGettingOffice }] = useGetOnsiteMutation();
  const [createWorkFormHome, { isLoading: isCreatingWorkFormHome }] = usePostWFHMutation();
  const [createWorkOvertime, { isLoading: isCreatingWorkOvertime }] = usePostOTRequestMutation();
  const [createWorkOnsite, { isLoading: isCreatingWorkOnsite }] = usePostOutsideMutation();
  const [checkDuplicateWorkFromHome, { isLoading: isCheckingDuplicateWorkFromHome }] =
    useCheckDuplicateRequestWFHMutation();
  const [checkDuplicateWorkOnsite, { isLoading: isCheckingDuplicateWorkOnsite }] =
    useCheckDuplicateRequestOnsiteMutation();
  const form = useForm({
    defaultValues: {
      modalGenre,
      comment: '',
      type: 0,
      workingTime: undefined,
      office: undefined,
      dateRange: [{ date: [] }] as any[]
    },
    resolver: yupResolver(
      yup.object({
        comment: yup.string().trim().required(t('common:form.required')),
        office: yup.string().when('modalGenre', {
          is: (modalGenre) => modalGenre === ModalGenre.WORK_ONSITE,
          then: (schema) => schema.required(t('common:form.required'))
        }),
        workingTime: yup
          .number()
          .transform((value) => (isNaN(value) ? undefined : value))
          .nullable()
          .when('modalGenre', {
            is: (modalGenre) => modalGenre === ModalGenre.WORK_OVERTIME,
            then: (schema) => schema.required(t('common:form.required'))
          }),
        dateRange: yup.array().of(
          yup.object().shape({
            date: yup.array().min(2, t('common:form.required'))
          })
        )
      })
    )
  });
  const formatFromDate = useFormat('MM/DD/YYYY 00:00:00:000', 'DD/MM/YYYY 00:00:00:000');
  const formatToDate = useFormat('MM/DD/YYYY 23:59:59:999', 'DD/MM/YYYY 23:59:59:999');

  const formatDateToTimestampFromDate = (date: any) => {
    const dateTimestamp = new Date(moment(date).format(formatFromDate)).getTime();
    return dateTimestamp;
  };

  const formatDateToTimestampToDate = (date: any) => {
    const dateTimestamp = new Date(moment(date).format(formatToDate)).getTime();
    return dateTimestamp;
  };
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'dateRange'
  });
  const debounceOnSearchEmailCC = debounce((nextValue) => {
    getEmailCC({ search: removeAccentedLetter(nextValue) })
      .unwrap()
      .then((data: User[]) => {
        setEmailCC(data);
      });
  }, 500);

  const listType = ['overtime', 'afterHours'];

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

  const formattedOffice: OptionType[] = office?.map((item) => ({
    key: item.id,
    label: item.name,
    value: item.id,
    render: () => {
      return (
        <div className="option-check-icon">
          {item.name}
          <span>{selectedOffice?.id === item.id ? <CheckIcon></CheckIcon> : <div></div>}</span>
        </div>
      );
    }
  }));

  const formattedType: OptionType[] = listType.map((listItem, index: number) => {
    return {
      key: index,
      label: listItem,
      value: WorkingType[listItem],
      render: () => {
        return (
          <div className="option-check-icon">
            {t(`myTime.myRequest.type.${listItem}`)}
            <span>
              {selectedType === WorkingType[listItem] ? <CheckIcon></CheckIcon> : <div></div>}
            </span>
          </div>
        );
      }
    };
  });

  const handleOnSelectType = (value: number) => {
    setSelectedType(value);
  };

  const handleOnSearchEmailCC = (value: string) => {
    debounceOnSearchEmailCC(value);
  };

  const handleOnChangeEmailCC = (value: Array<string | number>) => {
    setSelectedEmailCC(value);
  };

  const handleOnChangeDateRange = (value: RangeValue<moment.Moment>, index: number) => {
    setIsDisable(false);
    form.resetField(`dateRange.${index}.date`, { defaultValue: [] });

    if (!value) {
      form.clearErrors(`dateRange.${index}.date`);
      setDateRangeState((prev) => {
        const newDateRangeState = [...prev];
        dateRangeState[index].isDuplicated = false;
        newDateRangeState[index].isWorkingDateError = false;

        return newDateRangeState;
      });
    } else {
      form.setValue(`dateRange.${index}.date`, value);

      const payloadDateRange = {
        fromDate: formatDateToTimestampFromDate(value[0]),
        toDate: formatDateToTimestampToDate(value[1])
      };

      if (modalGenre === ModalGenre.WORK_FROM_HOME) {
        checkDuplicateWorkFromHome(payloadDateRange)
          .unwrap()
          .then(() => {
            setDateRangeState((prev) => {
              const newDateRangeState = [...prev];
              dateRangeState[index].isDuplicated = false;
              newDateRangeState[index].isWorkingDateError = false;

              return newDateRangeState;
            });

            getCalculateWorkingDate({
              fromDate: formatDateToTimestampFromDate(value[0]),
              toDate: formatDateToTimestampToDate(value[1]),
              orgId: userOrganizationData.id
            })
              .unwrap()
              .then(() => {
                setDateRangeState((prev) => {
                  const newDateRangeState = [...prev];
                  dateRangeState[index].isDuplicated = false;
                  newDateRangeState[index].isWorkingDateError = false;

                  return newDateRangeState;
                });

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
                setDateRangeState((prev) => {
                  const newDateRangeState = [...prev];
                  dateRangeState[index].isDuplicated = false;
                  newDateRangeState[index].isWorkingDateError = true;

                  return newDateRangeState;
                });
              });
          })
          .catch(() => {
            setDateRangeState((prev) => {
              const newDateRangeState = [...prev];
              newDateRangeState[index].isDuplicated = true;
              newDateRangeState[index].isWorkingDateError = false;

              return newDateRangeState;
            });
          });
      }

      if (modalGenre === ModalGenre.WORK_ONSITE) {
        checkDuplicateWorkOnsite(payloadDateRange)
          .unwrap()
          .then(() => {
            setDateRangeState((prev) => {
              dateRangeState[index].isDuplicated = false;
              dateRangeState[index].isWorkingDateError = false;

              return [...prev, dateRangeState[index]];
            });
          })
          .catch(() => {
            setDateRangeState((prev) => {
              dateRangeState[index].isDuplicated = true;
              dateRangeState[index].isWorkingDateError = false;

              return [...prev, dateRangeState[index]];
            });
          });
      }
    }
  };

  const handleOnFocusOffice = () => {
    getOffice({})
      .unwrap()
      .then((data) => {
        setOffice(data);
      });
  };

  const handleOnSelectOffice = (value: number, option: DefaultOptionType) => {
    setSelectedOffice({
      id: option['key'],
      name: String(option.label)
    });
  };

  const handleOnSubmit = (submittedData: any) => {
    selectedEmailCC.length === 0 && delete submittedData.selectedEmailCC;

    if (modalGenre === ModalGenre.WORK_FROM_HOME) {
      const payloadWorkFormHome: any = {
        comment: submittedData.comment,
        sendToIds: selectedEmailCC,
        dateRangeNotContinuous: submittedData.dateRange.map((dateRangeItem) => ({
          fromDate: formatDateToTimestampFromDate(dateRangeItem?.date[0]),
          toDate: formatDateToTimestampToDate(dateRangeItem?.date[1])
        })),
        escalateInfo: escalateUser
      };

      if (selectedEmailCC.length === 0) delete payloadWorkFormHome.sendToIds;

      if (!isDisable) {
        createWorkFormHome(payloadWorkFormHome)
          .unwrap()
          .then(() => {
            openNotification({
              type: 'success',
              message: t('submitSuccessfully')
            });
            navigate({ pathname: `${pathname}`, search: searchParams.toString() });
            handleCloseModal();
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
      }
    } else if (modalGenre === ModalGenre.WORK_OVERTIME) {
      const payloadWorkOvertime: any = {
        comment: submittedData.comment,
        duration: submittedData.workingTime * 3600,
        fromDate: formatDateToTimestampFromDate(submittedData.dateRange[0].date[0]),
        toDate: formatDateToTimestampToDate(submittedData.dateRange[0].date[1]),
        sendToIds: selectedEmailCC,
        type: submittedData.type
      };

      if (selectedEmailCC.length === 0) delete payloadWorkOvertime.sendToIds;

      createWorkOvertime(payloadWorkOvertime)
        .unwrap()
        .then(() => {
          openNotification({
            type: 'success',
            message: t('submitSuccessfully')
          });
          navigate({ pathname: `${pathname}`, search: searchParams.toString() });

          handleCloseModal();
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
    } else if (modalGenre === ModalGenre.WORK_ONSITE) {
      const payloadWorkOnsite: any = {
        comment: submittedData.comment,
        dateRangeNotContinuous: submittedData.dateRange.map((dateRangeItem) => ({
          fromDate: formatDateToTimestampFromDate(dateRangeItem.date[0]),
          toDate: formatDateToTimestampToDate(dateRangeItem.date[1])
        })),
        officeDTO: selectedOffice,
        sendToIds: selectedEmailCC
      };

      if (selectedEmailCC.length === 0) delete payloadWorkOnsite.sendToIds;

      if (!isDisable) {
        createWorkOnsite(payloadWorkOnsite)
          .unwrap()
          .then(() => {
            openNotification({
              type: 'success',
              message: t('submitSuccessfully')
            });
            navigate({ pathname: `${pathname}`, search: searchParams.toString() });
            handleCloseModal();
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
      }
    }
  };

  useEffect(() => {
    for (let index = 0; index < dateRangeState.length; index++) {
      if (dateRangeState[index].isDuplicated || dateRangeState[index].isWorkingDateError) {
        setIsDisable(true);
      }
    }
  }, [dateRangeState]);

  return (
    <StyledModalForm>
      <Title className="title">{modalTitle}</Title>
      <FormProvider {...form}>
        <div className="group-control">
          {modalGenre === ModalGenre.WORK_OVERTIME && (
            <Select
              className="select-type"
              name="type"
              title={t('myTime.myRequest.groupControl.title.type')}
              allowClear={false}
              options={formattedType}
              onSelect={handleOnSelectType}
            />
          )}
        </div>

        <div className="group-control">
          <Text strong>
            {t('myTime.myRequest.groupControl.title.dateRange')}
            <span className="required-mark">*</span>
          </Text>
          {fields.map((_, index) => (
            <Row className="date-range" key={index}>
              <div className="date-range__picker">
                <DateRangePickerRequired
                  format={formatDate}
                  parentName="dateRange"
                  label={t('myTime.myRequest.groupControl.placeholder.dateRange')}
                  name={`dateRange.${index}.date`}
                  onChange={(value) => handleOnChangeDateRange(value, index)}
                />
                {dateRangeState[index].isDuplicated && <Text>{t('common:form.duplicated')}</Text>}
                {dateRangeState[index].isWorkingDateError && (
                  <Text>{t('common:form.notWorkingDate')}</Text>
                )}
              </div>
              {modalGenre !== ModalGenre.WORK_OVERTIME && (
                <div className="date-range__button-add">
                  <Button
                    className="button-icon"
                    icon={<ClearIcon />}
                    disabled={fields.length <= 1}
                    onClick={() => {
                      remove(index);
                      setDateRangeState((prev) => {
                        const newDateRangeState = [...prev];
                        newDateRangeState.splice(index, 1);

                        return newDateRangeState;
                      });
                    }}
                  />
                </div>
              )}
            </Row>
          ))}
          {modalGenre !== ModalGenre.WORK_OVERTIME && (
            <Button
              className="button-icon"
              icon={<PlusIcon />}
              onClick={() => {
                append({ date: [] });
                setDateRangeState((prev) => {
                  const newDateRangeState = [...prev];
                  newDateRangeState.push({
                    isDuplicated: false,
                    isWorkingDateError: false
                  });

                  return newDateRangeState;
                });
              }}
            />
          )}
        </div>

        <div className="group-control">
          {modalGenre === ModalGenre.WORK_FROM_HOME && (
            <>
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
            </>
          )}
        </div>

        <div className="group-control">
          {modalGenre === ModalGenre.WORK_ONSITE && (
            <Select
              className="select-office"
              name="office"
              title={t('myTime.myRequest.groupControl.title.office')}
              placeholder={t('myTime.myRequest.groupControl.placeholder.office')}
              allowClear={false}
              loading={isGettingOffice}
              options={formattedOffice}
              onSelect={handleOnSelectOffice}
              onFocus={handleOnFocusOffice}
              required
            />
          )}
        </div>

        <div className="group-control">
          {modalGenre === ModalGenre.WORK_OVERTIME && (
            <Input
              className="working-time-input"
              type="numberFloat"
              name="workingTime"
              label={t('myTime.myRequest.groupControl.title.totalWorkingTime')}
              placeholder={t('myTime.myRequest.groupControl.placeholder.totalWorkingTime')}
              required
              decimal={1}
            />
          )}
        </div>

        <div className="group-control">
          <Input
            type="textarea"
            name="comment"
            label={t('myTime.myRequest.groupControl.title.comment')}
            required
          />
        </div>

        <div className="group-control">
          <Select
            showSearch
            className="select-email"
            name="emailCC"
            mode="multiple"
            optionLabelProp="label"
            title={t('myTime.myRequest.groupControl.title.emailCC')}
            placeholder={t('myTime.myRequest.groupControl.placeholder.emailCC')}
            allowClear={false}
            listHeight={410}
            menuItemSelectedIcon={null}
            options={formattedEmailCC}
            onSearch={handleOnSearchEmailCC}
            onChange={handleOnChangeEmailCC}
          />
        </div>

        <Row className="group-button">
          <Button
            key="submit"
            loading={isCreatingWorkFormHome || isCreatingWorkOvertime || isCreatingWorkOnsite}
            disabled={
              isGettingCalculateWorkingDate ||
              isGettingWfhEscalate ||
              isCheckingDuplicateWorkFromHome ||
              isCheckingDuplicateWorkOnsite
            }
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
    </StyledModalForm>
  );
};

export default MyRequestModalForm;
