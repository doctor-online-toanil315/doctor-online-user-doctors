import { useModal } from '@nexthcm/common';
import {
  ArrowRightIcon,
  Button,
  Checkbox,
  CheckIcon,
  ChevronRightIcon,
  CloseIcon,
  ImportIcon,
  Input,
  LogOutIcon,
  Modal,
  SearchIcon,
  Select,
  Table
} from '@nexthcm/components';
import { Drawer } from 'antd';
import { ColumnsType } from 'antd/es/table';
import getWeekOfMonth from 'date-fns/getWeekOfMonth';
import { debounce } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useGetWorkingHoursEveryoneQuery } from '../../services';
import {
  getCurrentDate,
  getFirstLastDayOfYear,
  newFromToDate,
  weekCount
} from '../../utils/workingHours';
import { ExportTimeLogForm, TableTimeDetails } from './components';
import EditWorkingHoursForm from './components/EditWorkingHoursForm/EditWorkingHoursForm';
import { TimeLog } from './components/TimeLog';
import './style.scss';
import { Container, Header, InputContainer } from './styles';

const Everyone = () => {
  const { t, i18n } = useTranslation();
  const tableInstance = Table.useTable();
  const [visible, setVisible] = useState(false);
  const [urlApi, setUrlApi] = useState<any>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [checked, setChecked] = useState<boolean>();
  const [week, setWeek] = useState<any>([]);
  const [dataGetFromAPI, setDataGetFromAPI] = useState<any>();
  const [typeForm, setTypeForm] = useState('');
  const [dataEdit, setDataEdit] = useState({});
  const [loadingTable, setLoadingTable] = useState(false);
  const date = new Date();
  const [checkIconId, setCheckIconId] = useState(
    searchParams.get('month') || date.getMonth()?.toString()
  );

  const [params, setParams] = useState<any>({
    year: date.getFullYear(),
    month: date.getMonth(),
    week: getWeekOfMonth(date),
    filterType: 'MY_TEAM',
    search: ''
  });
  const { isOpen, handleOpen, handleClose } = useModal();

  const listMonth = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec'
  ];

  const columns: ColumnsType = [
    {
      title: t('workingHours.cif'),
      dataIndex: 'cif',
      key: 'cif',
      sorter: true,
      width: '10%'
    },
    {
      title: t('workingHours.fullName'),
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: true,
      width: '20%'
    },
    {
      title: t('workingHours.dateRange'),
      dataIndex: 'dateRange',
      key: 'dateRange',
      sorter: true,
      width: '20%'
    },
    {
      title: t('workingHours.totalWorkingTime'),
      dataIndex: 'totalWorkingTime',
      key: 'totalWorkingTime',
      sorter: true,
      align: 'center',
      width: '20%'
    },
    {
      title: t('workingHours.workingDays'),
      dataIndex: 'workingDays',
      key: 'workingDays',
      sorter: true,
      align: 'center',
      width: '15%'
    },
    {
      title: t('workingHours.OT'),
      dataIndex: 'OT',
      key: 'OT',
      sorter: true,
      align: 'center',
      width: '5%'
    },
    {
      title: t('workingHours.leaveCount'),
      dataIndex: 'leaveCount',
      key: 'leaveCount',
      sorter: true,
      align: 'center',
      width: '10%'
    }
  ];

  const defaultValues = {
    year: searchParams.get('year') || date.getFullYear(),
    month: searchParams.get('month') || date.getMonth()?.toString(),
    week: searchParams.get('week') || getWeekOfMonth(date),
    search: searchParams.get('search'),
    filterType: searchParams.get('filterType')
  };

  const form = useForm({
    defaultValues
  });

  useEffect(() => {
    searchParams.set('year', searchParams.get('year') || date.getFullYear()?.toString());
    searchParams.set('month', searchParams.get('month') || date.getMonth()?.toString());
    searchParams.set('week', searchParams.get('week') || getWeekOfMonth(date)?.toString());
    searchParams.set('filterType', 'MY_TEAM');
    setSearchParams(searchParams);
  }, []);

  useEffect(() => {
    ['year', 'month', 'week', 'filterType', 'search'].forEach((key: string) => {
      if (searchParams.get(key)) {
        params[key] = searchParams.get(key);
        if (key === 'filterType') {
          setChecked(true);
        }
      } else if (searchParams.get(key) === 'undefined' || !searchParams.get(key)) {
        delete params[key];
        if (key === 'filterType') {
          setChecked(false);
        }
      }

      setParams(params);
    });
  }, []);

  const handleOnChange = debounce((key: string, value: any) => {
    if (value) {
      searchParams.set(key, value);
      setSearchParams(searchParams);
    }
    if (!value || value.length === 0) {
      searchParams.delete(key);
      setSearchParams(searchParams);
    }
  }, 500);

  const handleChangeTime = (value: string, name: 'week' | 'month' | 'year') => {
    setParams((preParams) => ({
      ...preParams,
      [name]: value?.toString()
    }));

    searchParams.set(name, value?.toString());
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
    setSearchParams(newParams);
  }, [params]);

  useEffect(() => {
    setLoadingTable(true);
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

    const tempUrlApi = { ...params, fromDateForGroupBy: newFormDate, toDateForGroupBy: newToDate };

    if (!tempUrlApi.filterType) delete tempUrlApi.filterType;
    if (tempUrlApi.search === '') delete tempUrlApi.search;
    delete tempUrlApi.year;
    delete tempUrlApi.month;
    delete tempUrlApi.week;

    setUrlApi(tempUrlApi);
    setTimeout(() => setLoadingTable(false), 500);
  }, [params]);

  const { data, isFetching } = useGetWorkingHoursEveryoneQuery(
    {
      ...tableInstance.params,
      ...urlApi
    },
    {
      refetchOnMountOrArgChange: true
    }
  );

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (data) {
      setDataGetFromAPI(data.data);
    }
  }, [data]);

  const dataTable = dataGetFromAPI?.items.map((item: any) => ({
    key: item.userId,
    cif: item.userInfo.cif,
    fullName: item.userInfo.fullName,
    dateRange:
      i18n.language === 'en'
        ? `${moment(urlApi.fromDateForGroupBy).format('MM/DD/YYYY')} - ${moment(
            urlApi.toDateForGroupBy
          ).format('MM/DD/YYYY')}`
        : `${moment(urlApi.fromDateForGroupBy).format('DD/MM/YYYY')} - ${moment(
            urlApi.toDateForGroupBy
          ).format('DD/MM/YYYY')}`,
    totalWorkingTime: item.totalWorkingTime ? (item.totalWorkingTime / 3600).toFixed(1) : '-',
    workingDays: item.workingDay ? item.workingDay : '-',
    OT: item.ot ? item.ot : '-',
    leaveCount: item.countLeave ? item.countLeave : '-'
  }));

  return (
    <Container>
      <Header>
        <Button onClick={() => setVisible(true)} height={44} icon={<LogOutIcon />}>
          {t('workingHours.importTimeLog')}
        </Button>
        <Button
          onClick={() => {
            setTypeForm('export');
            handleOpen();
          }}
          height={44}
          icon={<ImportIcon />}
        >
          {t('workingHours.exportTimeLog')}
        </Button>
      </Header>
      <InputContainer>
        <FormProvider {...form}>
          <Input
            onChange={(e) => {
              form.setValue('year', e.target.value);
              handleChangeTime(e.target.value, 'year');
            }}
            subLabel={t('workingHours.year')}
            name="year"
            allowClear
            type="number"
            maxLength={4}
          />
          <div style={{ flex: '2' }}>
            <Select
              label={t('workingHours.month')}
              allowClear={true}
              name="month"
              onChange={(value) => {
                setCheckIconId(value);
                handleChangeTime(value, 'month');
              }}
              options={listMonth.map((item: any, index: number) => ({
                key: index,
                label: item,
                value: `${index}`,
                render: () => (
                  <>
                    <p>{t(`workingHours.${item}`)}</p>
                    {checkIconId?.toString() === index.toString() && (
                      <span className="dnone check-icon">
                        <CheckIcon />
                      </span>
                    )}
                  </>
                )
              }))}
            />
          </div>
          <div style={{ flex: '1' }}>
            <Select
              name="week"
              options={week.map((_, index: number) => ({
                key: index + 1,
                value: index + 1,
                label: index + 1,
                render: () => <p>{index + 1}</p>
              }))}
              onChange={(value) => handleChangeTime(value, 'week')}
              label={t('workingHours.week')}
            />
          </div>
          <div style={{ flex: '2' }}>
            <Input
              subLabel={t('workingHours.search')}
              onChange={(e) => {
                form.setValue('search', `${e.target.value}`);
                handleOnChange('search', e.target.value);
                setParams((prev) => ({ ...prev, search: e.target.value }));
              }}
              name="search"
              icons={<SearchIcon />}
              allowClear
            />
          </div>
          <div className="checkbox-container">
            <Checkbox
              name="filterType"
              checked={checked}
              onChange={() => {
                setChecked(!checked);
                setParams((prev) => ({ ...prev, filterType: !checked ? 'MY_TEAM' : null }));
                handleOnChange('filterType', !checked ? 'MY_TEAM' : '');
              }}
            >
              My Team
            </Checkbox>
          </div>
        </FormProvider>
      </InputContainer>
      <Table
        className="working-hours-table"
        tableInstance={tableInstance}
        dataSource={dataTable}
        totalPages={dataGetFromAPI ? dataGetFromAPI?.totalPages : 0}
        totalElements={dataGetFromAPI ? dataGetFromAPI?.totalElements : 0}
        loading={isFetching || loadingTable}
        columns={columns}
        expandable={{
          expandedRowRender: (record, index, indent, expanded) => (
            <TableTimeDetails
              record={record}
              expanded={expanded}
              handleOpen={handleOpen}
              setTypeForm={setTypeForm}
              fromDateForGroupBy={urlApi.fromDateForGroupBy}
              toDateForGroupBy={urlApi.toDateForGroupBy}
              setDataEdit={setDataEdit}
            />
          ),
          defaultExpandedRowKeys: ['0'],
          expandIcon: ({ expanded, onExpand, record }) => (
            <div onClick={(e: any) => onExpand(record, e)} className="expand-icon-container">
              <ArrowRightIcon width={20} height={20} className={expanded ? 'expanded-icon' : ''} />
            </div>
          )
        }}
      />

      <Drawer
        className="drawer-import-timelog"
        visible={visible}
        onClose={onClose}
        placement="bottom"
        closeIcon={<CloseIcon />}
        destroyOnClose
      >
        <TimeLog onClose={onClose} />
      </Drawer>
      <Modal destroyOnClose visible={isOpen} onCancel={handleClose}>
        {typeForm === 'export' && <ExportTimeLogForm handleCloseModal={handleClose} />}
        {typeForm === 'edit' && (
          <EditWorkingHoursForm dataEdit={dataEdit} handleCloseModal={handleClose} />
        )}
      </Modal>
    </Container>
  );
};

export default Everyone;
