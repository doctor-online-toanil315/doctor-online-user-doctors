import { useFormat } from '@nexthcm/common';
import { DateRangePicker, Select, Table, Tag } from '@nexthcm/components';
import { Col, Row } from 'antd';
import { debounce } from 'lodash';
import moment from 'moment';
import { RangeValue } from 'rc-picker/lib/interface';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useGetStatusesMutation } from '../../../services';
import { Status } from '../../../types';
import { StyledMyLeaveFilter } from './styles';

const MyLeaveFilter = () => {
  const formatDate = useFormat();
  const [searchParams, setSearchParams] = useSearchParams();
  const tableInstance = Table.useTable();
  const { t } = useTranslation();
  const [getStatuses, { isLoading }] = useGetStatusesMutation();
  const [statusData, setStatusData] = useState<Status[]>([]);

  const defaultValues = {
    dates: searchParams.get('dates'),
    status: searchParams.get('status') === null ? [] : searchParams.get('status')?.split(',')
  };

  const form = useForm({
    defaultValues
  });

  const debounceInputOnChange = useCallback(
    debounce((nextValue) => {
      getStatuses({ search: nextValue })
        .unwrap()
        .then((data) => setStatusData(data?.data?.items));
    }, 500),
    []
  );

  const optionsTag = statusData.map((statusItem) => {
    return {
      key: statusItem.id,
      label: statusItem.name.trim(),
      value: statusItem.id,
      render: () => <Tag color={statusItem.stateType.color}>{statusItem.name}</Tag>
    };
  });

  const handleChangeDateRange = (value: RangeValue<moment.Moment>) => {
    console.log(value);

    if (value) {
      const formattedDate = value.map((item: any) => moment(item._d).format('DD/MM/YYYY'));

      form.setValue('dates', encodeURI(`${formattedDate[0]} - ${formattedDate[1]}`));
      searchParams.set('dates', encodeURI(`${formattedDate[0]} - ${formattedDate[1]}`));
      tableInstance.setParams((prev) => {
        return {
          ...prev,
          page: 0
        };
      });
    } else {
      searchParams.delete('dates');
      form.setValue('dates', null);
    }

    setSearchParams(searchParams);
  };

  const handleOnSearchStatus = (value: string) => {
    debounceInputOnChange(value.trim());
  };

  const handleOnChangeStatus = (value: string) => {
    if (value.length > 0) {
      searchParams.set('status', value);
    } else {
      searchParams.delete('status');
    }

    setSearchParams(searchParams);
  };

  useEffect(() => {
    form.reset(defaultValues);
  }, [searchParams]);

  useEffect(() => {
    getStatuses({})
      .unwrap()
      .then((data) => setStatusData(data?.data?.items));
  }, []);

  return (
    <StyledMyLeaveFilter>
      <FormProvider {...form}>
        <div className={'grid grid-cols-6 gap-4'}>
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
                handleChangeDateRange(value);
              }}
            />
          </div>
          <div className="col-span-2" style={{ marginLeft: 10 }}>
            <Select
              showSearch
              className="select-status"
              name="status"
              mode="multiple"
              optionLabelProp="label"
              label={t('myTime.myLeave.groupControl.title.status')}
              placeholder={t('filter.findStatues')}
              menuItemSelectedIcon={null}
              options={optionsTag}
              onChange={handleOnChangeStatus}
              onSearch={handleOnSearchStatus}
              loading={isLoading}
              multiplePlaceholders
            />
          </div>
        </div>
      </FormProvider>
    </StyledMyLeaveFilter>
  );
};

export default MyLeaveFilter;
