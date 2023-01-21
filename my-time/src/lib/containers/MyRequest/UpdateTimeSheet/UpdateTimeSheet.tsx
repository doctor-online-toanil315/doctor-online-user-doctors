import { RootState, useCommonSelector } from '@nexthcm/common';
import { EyeIcon, MoreVertIcon, Table, Tag } from '@nexthcm/components';
import { Space, TableColumnsType } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useMyRequestFilter } from '../../../hooks';
import { useGetMyRequestQuery } from '../../../services';
import { formatDate } from '../../../utils/utils';
import { PopoverActions } from './components/PopoverActions';
import { ButtonFunction } from './styles';

const scope = 'MY_TIME_REQUEST_LIST_COLUMNS';

const UpdateTimeSheet = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const tableInstance = Table.useTable();
  const { user } = useCommonSelector((state: RootState) => state.user);
  const myRequestFilter = useMyRequestFilter();

  const [dataSource, setDataSource] = useState();

  const { data, isFetching } = useGetMyRequestQuery(
    {
      type: 'timesheet-updates',
      params: {
        ...tableInstance.params,
        ...myRequestFilter.params,
        userId: user.userId
      }
    },
    {
      refetchOnMountOrArgChange: true
    }
  );

  const columns = [
    {
      title: t(scope + '.date'),
      dataIndex: 'createdDate',
      sorter: true
    },
    {
      title: t(scope + '.newInTime'),
      dataIndex: 'newInTime',
      sorter: true,
      align: 'center'
    },
    {
      title: t(scope + '.newOutTime'),
      dataIndex: 'newOutTime',
      sorter: true,
      align: 'center'
    },
    {
      title: t(scope + '.updateTotalTime'),
      dataIndex: 'updateTotalTime',
      sorter: true,
      align: 'center'
    },
    {
      title: t(scope + '.updateWorkingDay'),
      dataIndex: 'updateWorkingDay',
      sorter: true,
      align: 'center'
    },
    {
      title: t(scope + '.status'),
      dataIndex: 'status',
      render: (status, record: any) => (
        <Tag color={record.currentState?.stateType?.color}>{record.currentState?.name}</Tag>
      )
    },
    {
      title: t(scope + '.comment'),
      dataIndex: 'comment',
      sorter: true
    },
    {
      title: t(scope + '.functions'),
      key: 'key',
      render: (id, record) => (
        <Space>
          {
            <ButtonFunction>
              <EyeIcon
                onClick={() => {
                  searchParams.set('id', record.id);
                  setSearchParams(searchParams);
                }}
              />
            </ButtonFunction>
          }
          {record.nextStates.length > 0 && (
            <PopoverActions id={record.id} dataStates={record.nextStates}>
              <ButtonFunction>
                <MoreVertIcon />
              </ButtonFunction>
            </PopoverActions>
          )}
        </Space>
      )
    }
  ];

  useEffect(() => {
    data?.data?.items && setDataSource(dataFormat(data?.data?.items));
  }, [data?.data?.items]);

  return (
    <Table
      tableInstance={tableInstance}
      totalElements={data?.data?.totalElements}
      totalPages={data?.data?.totalPages}
      columns={columns as TableColumnsType}
      dataSource={dataSource}
      loading={isFetching}
    />
  );
};

const dataFormat = (data: any) => {
  return data?.map((item: any) => ({
    ...item,
    key: item.id,
    createdDate: formatDate(item.createdDate, 'dddd, DD/MM/YYYY'),
    newInTime: formatDate(item.newInTime * 1000, 'HH:mm', true),
    newOutTime: formatDate(item.newOutTime * 1000, 'HH:mm', true),
    updateTotalTime: formatDate(item.updateTotalTime * 1000, 'HH:mm', true),
    updateWorkingDay: item.updateWorkingDay,
    status: item.currentState.name,
    comment: item.comment
  }));
};

export default UpdateTimeSheet;
