import { yupResolver } from '@hookform/resolvers/yup';
import { RootState, useCommonSelector } from '@nexthcm/common';
import {
  CheckIcon,
  EditIcon,
  EyeIcon,
  Input,
  OptionType,
  Select,
  Table
} from '@nexthcm/components';
import { Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import getWeekOfMonth from 'date-fns/getWeekOfMonth';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { findNameDefaultMonth } from '../../constants/WorkingHours';
import { useGetWorkingHoursOnlyMeQuery } from '../../services';
import { formatDateWorkingHours, formatInTimeOutTime, newFromToDate } from '../../utils/utils';
import { getCurrentDate, getFirstLastDayOfYear, weekCount } from '../../utils/workingHours';
import { RequestUpdateTimeSheet, WorkingHoursDetail } from './components';
import { BtnFunction, StyledFunctions, StyledWorkingHourse } from './styles';

export interface WorkingHoursType {
  key: string;
  office: string;
  trackingDate: string;
  createdDate?: number;
  addressCheckIn: string;
  addressCheckOut: string;
  inTime: number;
  outTime: number;
  totalWorkingTime: number;
  workingDay: number;
  ot: number;
  onsiteDay: number;
  leaveType: string;
}

const OnlyMe = () => {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useSearchParams();
  const date = new Date();
  const tableInstance = Table.useTable();
  const [params, setParams] = useState<any>({});
  const [urlApi, setUrlApi] = useState({});
  const { user } = useCommonSelector((state: RootState) => state.user);
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const [isShowModalView, setIsShowModalView] = useState(false);
  // const [loadingTable, setLoadingTable] = useState(false);
  const [week, setWeek] = useState<any>([]);
  const [dataUpdate, setDataUpdate] = useState<WorkingHoursType>({} as WorkingHoursType);
  const monthDefaultValue = filter.get('month')
    ? t(`date.${findNameDefaultMonth(filter.get('month') as string)?.trim()}`)
    : '';

  const defaultValues = {
    year: filter.get('year') || '',
    month: monthDefaultValue,
    week: filter.get('week') || ''
  };

  const form = useForm({
    defaultValues,
    resolver: yupResolver(yup.object({}))
  });

  useEffect(() => {
    if (!filter.get('year')) {
      filter.set('year', date.getFullYear()?.toString());
      filter.set('month', date.getMonth()?.toString());
      filter.set('week', getWeekOfMonth(date)?.toString());
    } else {
      filter.set('year', filter.get('year') || '');
      filter.set('month', filter.get('month') || '');
      filter.set('week', filter.get('week') || '');
    }
    setFilter(filter);
  }, []);

  useEffect(() => {
    const obj: any = {};
    ['year', 'month', 'week'].forEach((key: string) => {
      if (filter.get(key)) {
        obj[key] = filter.get(key);
      } else if (filter.get(key) === 'undefined' || !filter.get(key)) {
        delete obj[key];
      }
      setParams(obj);
    });
  }, []);

  const { data, isLoading, isFetching } = useGetWorkingHoursOnlyMeQuery(
    {
      userId: user.userId,
      ...tableInstance.params,
      ...urlApi
    },
    { refetchOnMountOrArgChange: true }
  );

  const parsedDataWorkingHours = data?.data?.items?.map((value: any) => ({
    key: value?.id,
    office: value?.userInfo?.office?.name,
    trackingDate: formatDateWorkingHours(value?.trackingDate, i18n.language === 'en' ? 'en' : 'vi'),
    createdDate: value?.trackingDate,
    addressCheckIn: value?.addressCheckIn,
    addressCheckOut: value?.addressCheckOut,
    totalWorkingTime: value?.totalWorkingTime,
    workingDay: value?.workingDay,
    ot: value?.ot,
    onsiteDay: value?.onsiteDay,
    leaveType: value?.leaveType,
    inTime: value?.inTime,
    outTime: value?.outTime
  }));
  const columns: ColumnsType<WorkingHoursType> = [
    {
      title: t('workingHours.office'),
      dataIndex: 'office',
      key: 'office',
      sorter: true
    },
    {
      title: t('workingHours.date'),
      dataIndex: 'trackingDate',
      key: 'trackingDate',
      sorter: true
    },
    {
      title: t('workingHours.timeIn'),
      dataIndex: 'addressCheckIn',
      key: 'addressCheckIn',
      render: (_, data) => {
        if (data?.inTime) {
          const isAddress = data?.addressCheckIn;
          return (
            <div className="address-check-in">
              <div style={{ textAlign: 'center' }}>{formatInTimeOutTime(data?.inTime)}</div>
              {isAddress && <div>({data?.addressCheckIn})</div>}
            </div>
          );
        }
        return <></>;
      },
      align: 'center',
      sorter: true
    },
    {
      title: t('workingHours.timeOut'),
      dataIndex: 'addressCheckOut',
      key: 'addressCheckOut',
      render: (_, data) => {
        if (data?.outTime) {
          const isAddress = data?.addressCheckOut;
          return (
            <div className="address-check-in">
              <div style={{ textAlign: 'center' }}>{formatInTimeOutTime(data?.outTime)}</div>
              {isAddress && <div>({data?.addressCheckOut})</div>}
            </div>
          );
        }
        return <></>;
      },
      align: 'center',
      sorter: true
    },
    {
      title: t('workingHours.totalWorkingTime'),
      dataIndex: 'totalWorkingTime',
      key: 'totalWorkingTime',
      render: (_, data) => {
        if (data?.totalWorkingTime)
          return (
            <div style={{ textAlign: 'center' }}>{(data?.totalWorkingTime / 3600)?.toFixed(1)}</div>
          );
        return <div style={{ textAlign: 'center' }}>-</div>;
      },
      sorter: true,
      align: 'center'
    },
    {
      title: t('workingHours.workingDays'),
      dataIndex: 'workingDay',
      key: 'workingDay',
      render: (_, data) => {
        if (data?.workingDay)
          return <div style={{ textAlign: 'center' }}>{data?.workingDay?.toFixed(1)} </div>;
        return <div style={{ textAlign: 'center' }}>-</div>;
      },
      sorter: true,
      align: 'center'
    },
    {
      title: t('workingHours.ot'),
      dataIndex: 'ot',
      key: 'ot',
      render: (_, data) => {
        if (data?.ot) return <span>{data?.ot} </span>;
        return <div style={{ textAlign: 'center' }}>-</div>;
      },
      sorter: true,
      align: 'center'
    },
    {
      title: t('workingHours.onsiteDay'),
      dataIndex: 'onsiteDay',
      key: 'onsiteDay',
      render: (_, data) => {
        if (data?.onsiteDay) return <span>{data?.onsiteDay} </span>;
        return <div style={{ textAlign: 'center' }}>-</div>;
      },
      sorter: true,
      align: 'center'
    },
    {
      title: t('workingHours.leave'),
      dataIndex: 'leaveType',
      key: 'leaveType',
      align: 'center',
      sorter: true
    },
    {
      title: t('workingHours.functions'),
      key: 'functions',
      dataIndex: 'functions',
      align: 'center',
      width: '8%',
      render: (_, data) => (
        <StyledFunctions>
          <BtnFunction onClick={() => handleClickView(data)}>
            <EyeIcon className="view-icon" />
          </BtnFunction>
          <BtnFunction onClick={() => handleClickUpdateTimeSheet(data)}>
            <EditIcon />
          </BtnFunction>
        </StyledFunctions>
      )
    }
  ];

  const months = [
    'date.january',
    'date.february',
    'date.march',
    'date.april',
    'date.may',
    'date.june',
    'date.july',
    'date.august',
    'date.september',
    'date.october',
    'date.november',
    'date.december'
  ];
  const [checkIconId, setCheckIconId] = useState(
    filter.get('month') || date.getMonth()?.toString()
  );
  const optionsMonths: OptionType[] = months.map((item: string, index: number) => ({
    key: index,
    value: `${index}`,
    label: `${index}`,
    render: () => (
      <>
        <p>{t(item)}</p>
        {checkIconId === index.toString() && (
          <span className="dnone check-icon">
            <CheckIcon />
          </span>
        )}
      </>
    )
  }));

  const handleChange = (value: string, name: 'week' | 'month' | 'year') => {
    if (value) {
      filter.set(name, value.toString());
    } else {
      filter.delete(name);
    }
    setParams((preParms) => ({
      ...preParms,
      [name]: value
    }));
    form.setValue(name, value);
  };

  useEffect(() => {
    const obj = { ...params };
    const newParams: any = {};
    ['year', 'month', 'week'].forEach((key: string) => {
      if (obj[key] && obj[key] !== 'undefined') {
        newParams[key] = obj[key];
      }
    });
    setFilter(newParams);
  }, [params]);

  useEffect(() => {
    let newFormDate = 0;
    let newToDate = 0;
    if (!params.week && params.month && params.year) {
      const [fromDate, toDate] = getCurrentDate(+params.month, +params.year);
      newFormDate = fromDate;
      newToDate = toDate;
      setWeek([...Array(weekCount(+params.year, +params.month + 1))].map((_, i) => i));
    } else if ((!params.month && params.year) || !params.year) {
      const [fromDate, toDate] = getFirstLastDayOfYear(+params.year || date.getFullYear());
      newFormDate = fromDate;
      newToDate = toDate;
      setWeek([]);
    } else {
      const month = +params.month === 0 || +params.month ? +params.month : date.getMonth();
      const { fromDate, toDate, weeks } = newFromToDate(
        +params.year || date.getFullYear(),
        month,
        +params.week || getWeekOfMonth(date)
      );
      newFormDate = fromDate;
      newToDate = toDate;

      setWeek(weeks);
    }
    setUrlApi((url) => ({
      ...url,
      fromDate: newFormDate,
      toDate: newToDate
    }));
  }, [params]);

  useEffect(() => {
    form.reset({
      month: monthDefaultValue,
      week: filter.get('week') || '',
      year: filter.get('year') || ''
    });
  }, [monthDefaultValue, filter.get('week'), filter.get('year')]);

  // NotificationForm update
  const handleClickUpdateTimeSheet = (data: WorkingHoursType) => {
    setDataUpdate(data);
    setIsShowModalUpdate(true);
  };
  // NotificationForm view
  const handleClickView = (data: WorkingHoursType) => {
    setDataUpdate(data);
    setIsShowModalView(true);
  };

  const handleOnCloseModal = () => {
    setIsShowModalUpdate(false);
    setIsShowModalView(false);
  };

  return (
    <StyledWorkingHourse>
      <FormProvider {...form}>
        <div className="w-100 filter">
          <div className="w-100 flex">
            <div className="year w-14 mr-16">
              <Input
                name="year"
                type="number"
                maxLength={4}
                subLabel={t('workingHours.year')}
                onChange={(e) => {
                  form.setValue('year', e.target.value);
                  handleChange(e.target.value, 'year');
                }}
                allowClear
              />
            </div>
            <div className="month w-28 mr-16">
              <Select
                name="month"
                options={optionsMonths}
                label={t('workingHours.month')}
                onChange={(value) => {
                  setCheckIconId(value);
                  handleChange(value, 'month');
                }}
              />
            </div>
            <div className="week w-14">
              <Select
                name="week"
                options={week.map((_, index: number) => ({
                  key: index + 1,
                  value: index + 1,
                  label: index + 1,
                  render: () => <p>{index + 1}</p>
                }))}
                label={t('workingHours.week')}
                onChange={(value) => handleChange(value, 'week')}
              />
            </div>
          </div>
        </div>
        <div className="table__working_hourse--only-me mt-16">
          <Table
            tableInstance={tableInstance}
            totalElements={data?.data?.totalElements}
            totalPages={data?.data?.totalPages}
            columns={columns}
            dataSource={parsedDataWorkingHours}
            loading={isLoading || isFetching}
          />
        </div>
        {isShowModalUpdate && (
          <RequestUpdateTimeSheet
            isShowModal={isShowModalUpdate}
            onCloseModal={handleOnCloseModal}
            dataUpdate={dataUpdate}
          />
        )}
        {isShowModalView && (
          <WorkingHoursDetail
            isShowModal={isShowModalView}
            onCloseModal={handleOnCloseModal}
            dataView={dataUpdate}
          />
        )}
      </FormProvider>
    </StyledWorkingHourse>
  );
};
export default OnlyMe;
