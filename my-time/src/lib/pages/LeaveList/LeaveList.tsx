import { useTranslation } from 'react-i18next';
import { EyeIcon, Table } from '@nexthcm/components';
import {
  ButtonFunction,
  StyleBackgroundStatus,
  StyledFunctions,
  StyledNameTable,
  StyledText,
  StyledTotalTable,
  StyleTable
} from './style';
import { IDataTableNoCheck } from '../../types/LeaveList';
import * as React from 'react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ListDropdown } from '../ListDropdown';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { RequestManagementFilter } from '../../containers/RequestManagementFilter';
import {
  useExportMutation,
  useOperationTransactionsMutation,
  useGetLeaveQuery
} from '../../services/MyTimeApp';
import useFilter from '../../hooks/useFilter';
import FileSaver from 'file-saver';
import { Drawer } from 'antd';
import { BulkChange } from '../../components/BulkChange';
import ShowText from '../../components/ShowText/ShowText';

const LeaveList = () => {
  const { t } = useTranslation();
  const paramsFilterContainer = useFilter();
  const tableInstance = Table.useTable();
  const navigate = useNavigate();
  const { key } = useLocation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<React.Key[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isBulkChange, setIsBulkChange] = useState(false);
  const [dataBulk, setDataBulk] = useState<any>();
  const [exportData, { isLoading: isLoadingExport }] = useExportMutation();
  const [getBulk, { isLoading: isLoadingBulk }] = useOperationTransactionsMutation();

  const {
    data: dataTableNoCheck,
    isFetching,
    refetch
  } = useGetLeaveQuery(
    {
      ...tableInstance.params,
      ...paramsFilterContainer.params,
      search: searchParams.get('search') ?? ''
    },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    refetch();
  }, [key]);

  const leaveDataNocheck = dataTableNoCheck?.data ?? {};

  const formatDate = (item) => {
    const formattedDate = moment(moment(item.toDate).format('L')).isAfter(
      moment(moment(item.fromDate).format('L'))
    )
      ? `${moment(item.fromDate).format('L')} - ${moment(item.toDate).format('L')}`
      : `${moment(item.fromDate).format('L')}`;

    if (item.items[0]?.morning) {
      return `${formattedDate} (Morning)`;
    } else if (item.items[0]?.afternoon) {
      return `${formattedDate} (Afternoon)`;
    }
    return `${formattedDate}`;
  };

  const formatData = (data) => {
    const formattedData: any = [];
    data?.map((item: any) => {
      return formattedData.push({
        key: item.id,
        cif: item.employeeDTO.cif,
        fullName: item.employeeDTO.fullName,
        leaveType: item.leaveType.description || item.leaveType.name,
        currentState: item.currentState.name,
        colorState: item.currentState.stateType.color,
        days: item.durationInDay,
        comment: item.comment,
        dateRange: formatDate(item),
        nextStates: item.nextStates
      });
    });

    return formattedData;
  };

  const columns = [
    {
      title: t('modal.cif'),
      dataIndex: 'cif',
      sorter: true,
      width: '10%',
      render: (text: any) => <StyledText className="text">{text}</StyledText>
    },
    {
      title: t('modal.name'),
      dataIndex: 'fullName',
      sorter: true,
      width: '12%',
      render: (text) => (
        <StyledNameTable>
          <span className="fullName">{text}</span>
        </StyledNameTable>
      )
    },
    {
      title: t('modal.dateRange'),
      dataIndex: 'dateRange',
      sorter: true,
      width: '12%',
      render: (text: string) => <div>{text}</div>
    },
    {
      title: t('modal.leaveType'),
      dataIndex: 'leaveType',
      sorter: true,
      width: '10%'
    },
    {
      title: t('modal.days'),
      dataIndex: 'days',
      sorter: true
    },
    {
      title: t('modal.status'),
      dataIndex: 'currentState',
      render: (currenState, record) => (
        <StyleBackgroundStatus>
          <span
            className={`myTime-status ${currenState}`}
            style={{ backgroundColor: `${record.colorState}` }}
          >
            {currenState}
          </span>
        </StyleBackgroundStatus>
      )
    },
    {
      title: t('modal.comment'),
      dataIndex: 'comment',
      sorter: true,
      width: '30%',
      render: (_, record: any) => {
        return <ShowText record={record} />;
      }
    }
  ];

  const columnsFunction = {
    title: t('modal.functions'),
    dataIndex: 'id',
    width: '5%',
    render: (id: string, record: IDataTableNoCheck) => {
      return (
        <StyledFunctions>
          <ButtonFunction>
            <EyeIcon
              onClick={() => {
                navigate({
                  pathname: `${record.key}`,
                  search: searchParams.toString()
                });
              }}
            />
          </ButtonFunction>
          {record.nextStates.length > 0 && (
            <ButtonFunction>
              <ListDropdown record={record} />
            </ButtonFunction>
          )}
        </StyledFunctions>
      );
    }
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.nextStates.length === 0
    })
  };
  const hasSelected = selectedRowKeys.length > 0;
  const onCloseDrawer = () => {
    setIsBulkChange(false);
  };

  const handleExport = () => {
    exportData({
      type: 'leaves/export-leave',
      params: {
        ...paramsFilterContainer.params
      }
    })
      .unwrap()
      .then((value) => {
        FileSaver.saveAs(value, 'LEAVE.xlsx');
      });
  };

  const handleBulkChange = () => {
    getBulk({
      type: 'leaves',
      params: {
        leaveIds: selectedRowKeys.toString()
      }
    })
      .unwrap()
      .then((data) => {
        setDataBulk(data?.data);
        setIsBulkChange(true);
      });
  };

  useEffect(() => {
    setSelectedRowKeys([]);
  }, [leaveDataNocheck]);

  return (
    <StyledTotalTable>
      <RequestManagementFilter
        handleBulkChange={handleBulkChange}
        handleExport={handleExport}
        isLoadingBulkChange={isLoadingBulk}
        isLoadingExport={isLoadingExport}
        disableBulkChange={!hasSelected}
      />
      <StyleTable
        tableInstance={tableInstance}
        rowSelection={rowSelection}
        columns={[...columns, columnsFunction]}
        loading={isFetching}
        totalPages={leaveDataNocheck?.totalPages}
        totalElements={leaveDataNocheck?.totalElements}
        dataSource={formatData(leaveDataNocheck.items)}
      />
      <Drawer
        className="drawer-edit-employee"
        placement="bottom"
        onClose={() => onCloseDrawer()}
        visible={isBulkChange}
      >
        <BulkChange
          onCloseDrawer={onCloseDrawer}
          columnBulk={columns}
          dataBulk={dataBulk}
          dataFormat={formatData}
          type="leaves"
        />
      </Drawer>
      <Outlet />
    </StyledTotalTable>
  );
};

export default LeaveList;
