import { FilterContainer } from './styles';
import {
  Button,
  Checkbox,
  DateRangePicker,
  DownloadIcon,
  Input,
  SearchIcon,
  Select,
  SelectMultipleIcon,
  Table
} from '@nexthcm/components';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetStatusByIDQuery, useGetStatusQuery } from '../../services/AccountApp';
import { debounce } from 'lodash';
import moment from 'moment';
import { useDebounce, useFormat } from '@nexthcm/common';

interface MyTimeProps {
  handleExport: () => void;
  handleBulkChange: () => void;
  disableBulkChange?: boolean;
  isLoadingBulkChange: boolean;
  isLoadingExport: boolean;
}

const RequestManagementFilter = ({
  handleExport,
  handleBulkChange,
  isLoadingBulkChange,
  isLoadingExport,
  disableBulkChange = false
}: MyTimeProps) => {
  const { t } = useTranslation();
  const formatDate = useFormat();
  const [searchParams, setSearchParams] = useSearchParams();
  const [valueSearch, setValueSearch] = useState('');
  const [status, setStatus] = useState([]);
  const [checked, setChecked] = useState(true);
  const [searchValue, setSearchValue] = useState<string>(searchParams.get('search') || '');
  const debounceSearch = useDebounce(searchValue, 500);
  const tableInstance = Table.useTable();
  const defaultValues = {
    search: searchParams.get('search'),
    dates: searchParams.get('dates'),
    createDates: searchParams.get('createDates'),
    changeDates: searchParams.get('changeDates'),
    status: searchParams.get('status') === null ? [] : searchParams.get('status')?.split(','),
    filterType: searchParams.get('filterType')
  };
  const form = useForm({
    defaultValues
  });

  const { data: statusData } = useGetStatusQuery(
    { name: valueSearch },
    {
      refetchOnMountOrArgChange: true
    }
  );

  const { data: getStatusID } = useGetStatusByIDQuery(
    { id: searchParams.get('status') },
    { skip: searchParams.get('status') === null, refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    form.reset(defaultValues);
  }, [searchParams]);

  useEffect(() => {
    setStatus(
      statusData?.data.map((item) => ({
        key: item.id,
        label: item.name.trim(),
        value: item.id,
        render: () => (
          <p className="select-option" style={{ background: `${item.stateType?.color}` }}>
            {item.name}
          </p>
        )
      }))
    );
  }, [statusData]);

  useEffect(() => {
    setStatus(
      getStatusID?.data.map((item) => ({
        key: item.id,
        label: item.name.trim(),
        value: item.id,
        render: () => (
          <p className="select-option" style={{ background: `${item.stateType?.color}` }}>
            {item.name}
          </p>
        )
      }))
    );
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

  const handleSearch = debounce((e) => {
    setValueSearch(e);
  }, 500);

  const handleChangeDate = (key: string, value: any) => {
    if (value) {
      const dateFormat = value?.map((item: any) => moment(item._d).format('DD/MM/YYYY'));
      searchParams.set(key, encodeURI(`${dateFormat[0]} - ${dateFormat[1]}`));
      setSearchParams(searchParams);
    }
    tableInstance.setParams((prev) => {
      return {
        ...prev,
        page: 0
      };
    });
    if (!value || value.length === 0) {
      searchParams.delete(key);
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    debounceSearch.trim()
      ? searchParams.set('search', debounceSearch.trim())
      : searchParams.delete('search');

    setSearchParams(searchParams);
  }, [debounceSearch]);

  return (
    <FilterContainer>
      <FormProvider {...form}>
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-2">
            <DateRangePicker
              format={formatDate}
              name="dates"
              label={t('filter.dateRange')}
              value={
                form.getValues('dates')
                  ? [
                      moment(form.getValues('dates')?.split('%20-%20')[0], 'DD/MM/YYYY'),
                      moment(form.getValues('dates')?.split('%20-%20')[1], 'DD/MM/YYYY')
                    ]
                  : undefined
              }
              onChange={(value) => {
                const dateFormat = value
                  ? value.map((item: any) => moment(item._d).format('DD/MM/YYYY'))
                  : null;
                form.setValue(
                  'dates',
                  dateFormat ? encodeURI(`${dateFormat[0]} - ${dateFormat[1]}`) : null
                );
                handleChangeDate('dates', value);
              }}
            />
          </div>
          <div className="col-span-2">
            <DateRangePicker
              format={formatDate}
              name="createDateRange"
              label={t('filter.createDateRange')}
              value={
                form.getValues('createDates')
                  ? [
                      moment(form.getValues('createDates')?.split('%20-%20')[0], 'DD/MM/YYYY'),
                      moment(form.getValues('createDates')?.split('%20-%20')[1], 'DD/MM/YYYY')
                    ]
                  : undefined
              }
              onChange={(value) => {
                const dateFormat = value
                  ? value.map((item: any) => moment(item._d).format('DD/MM/YYYY'))
                  : null;
                form.setValue(
                  'createDates',
                  dateFormat ? encodeURI(`${dateFormat[0]} - ${dateFormat[1]}`) : null
                );
                handleChangeDate('createDates', value);
              }}
            />
          </div>
          <div className="col-span-2">
            <DateRangePicker
              format={formatDate}
              name="changeDateRange"
              label={t('filter.changeDateRange')}
              value={
                form.getValues('changeDates')
                  ? [
                      moment(form.getValues('changeDates')?.split('%20-%20')[0], 'DD/MM/YYYY'),
                      moment(form.getValues('changeDates')?.split('%20-%20')[1], 'DD/MM/YYYY')
                    ]
                  : undefined
              }
              onChange={(value) => {
                const dateFormat = value
                  ? value.map((item: any) => moment(item._d).format('DD/MM/YYYY'))
                  : null;
                form.setValue(
                  'changeDates',
                  dateFormat ? encodeURI(`${dateFormat[0]} - ${dateFormat[1]}`) : null
                );
                handleChangeDate('changeDates', value);
              }}
            />
          </div>
          <div className="col-span-3">
            <Input
              name="search"
              onChange={(e) => {
                form.setValue('search', `${e.target.value}`);
                // handleOnChange('search', e.target.value);
                setSearchValue(e.target.value);
              }}
              icons={<SearchIcon />}
              subLabel={t('filter.searchByCIFFullNameOffice')}
              allowClear
            />
          </div>
          <div className="col-span-2">
            <Select
              name="status"
              mode="multiple"
              showSearch
              optionLabelProp="label"
              options={status}
              placeholder={t('filter.findStatues')}
              multiplePlaceholders
              menuItemSelectedIcon={null}
              onSearch={(e) => {
                handleSearch(e);
              }}
              onChange={(value) => {
                handleOnChange('status', value);
              }}
            />
          </div>
          <div className="checkbox">
            <Checkbox
              name="filterType"
              checked={checked}
              onChange={() => {
                setChecked(!checked);
                handleOnChange('filterType', !checked ? 'MY_TEAM' : '');
              }}
            >
              My Team
            </Checkbox>
          </div>
        </div>
      </FormProvider>
      <div className="button gap-4">
        <Button
          height={44}
          icon={<SelectMultipleIcon />}
          loading={isLoadingBulkChange}
          disabled={disableBulkChange || isLoadingBulkChange}
          onClick={handleBulkChange}
        >
          {t('button.bulkChange')}
        </Button>
        <Button
          height={44}
          icon={<DownloadIcon />}
          loading={isLoadingExport}
          disabled={isLoadingExport}
          onClick={handleExport}
        >
          {t('button.export')}
        </Button>
      </div>
    </FilterContainer>
  );
};

export default RequestManagementFilter;
