import React, { useEffect, useState } from 'react';
import { DeleteIcon, EditIcon, Status, Table } from '@nexthcm/components';
import { useSearchParams } from 'react-router-dom';
import { useGetLeavesQuery } from '../../services/MyTimeApp';
import { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { RequestManagementFilter } from '../../containers/RequestManagementFilter';
import useFilter from '../../hooks/useFilter';

const Leave = () => {
  const { t } = useTranslation();
  const tableInstance = Table.useTable();
  const paramsFilterContainer = useFilter();
  const [dataSource, setDataSource] = useState<any>([]);
  const [leaveData, setLeaveData] = useState<any>();
  const [searchParams] = useSearchParams();
  const { data, isFetching } = useGetLeavesQuery(
    {
      ...tableInstance.params,
      ...paramsFilterContainer.params,
      search: searchParams.get('search') ?? ''
    },
    {
      refetchOnMountOrArgChange: true
    }
  );
  const columns: ColumnsType<any> = [
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
      sorter: true
    },
    {
      title: t('Description'),
      dataIndex: 'description',
      key: 'description',
      sorter: true
    },
    {
      title: t('Status'),
      dataIndex: 'state',
      key: 'status',
      render: (value) => <Status isActive={value === 1} />,
      sorter: true
    },
    {
      title: t('Functions'),
      key: 'functions',
      dataIndex: 'functions',
      render: () => (
        <Space size="middle">
          <EditIcon />
          <DeleteIcon />
        </Space>
      )
    }
  ];

  useEffect(() => {
    if (data) {
      const formatData = data.data?.items.map((item: any) => {
        return {
          ...item,
          key: item.id
        };
      });
      setDataSource(formatData);
      setLeaveData(data.data);
    }
  }, [data]);

  const handleBulkChange = () => {
    console.log('handleBulkChange');
  };

  const handleExport = () => {
    console.log('handleExport');
  };

  return (
    <>
      <RequestManagementFilter
        handleBulkChange={handleBulkChange}
        handleExport={handleExport}
        isLoadingBulkChange={true}
        isLoadingExport={true}
        disableBulkChange={true}
      />
      <Table
        tableInstance={tableInstance}
        totalElements={leaveData ? leaveData?.totalElements : 0}
        totalPages={leaveData ? leaveData?.totalPages : 0}
        columns={columns}
        dataSource={dataSource}
        loading={isFetching}
      />
    </>
  );
};

export default Leave;
