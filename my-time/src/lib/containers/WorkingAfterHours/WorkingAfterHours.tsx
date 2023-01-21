import React, { useEffect, useState } from 'react';
import { Checkbox, EyeIcon, MoreVertIcon, Table, Tag, Text } from '@nexthcm/components';
import { ColumnsType } from 'antd/es/table';
import { Drawer, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  useExportMutation,
  useGetRequestManagementQuery,
  useOperationTransactionsMutation
} from '../../services/MyTimeApp';
import { StyledTableButton, StyledTableFunction, StyledUpdate } from './styles';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { PopoverActions } from './components/PopoverActions';
import { BulkItemType, IWorkingAfterHoursRes } from '../../types';
import { BulkChange } from '../../components/BulkChange';
import { RequestManagementFilter } from '../RequestManagementFilter';
import useFilter from '../../hooks/useFilter';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import FileSaver from 'file-saver';
import moment from 'moment';
import ShowText from '../../components/ShowText/ShowText';

const WorkingAfterHours = () => {
  const tableInstance = Table.useTable();
  const [dataWorkingAfterHours, setDataWorkingAfterHours] = useState<IWorkingAfterHoursRes>(
    {} as IWorkingAfterHoursRes
  );
  const { t } = useTranslation();
  const paramsFilterContainer = useFilter();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { key } = useLocation();
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [list, setList] = useState<string[]>([]);
  const [isBulkChange, setIsBulkChange] = useState(false);
  const [dataBulk, setDataBulk] = useState<BulkItemType[]>();
  const [dataSource, setDateSource] = useState();

  const [getBulk, { isLoading: isLoadingBulk }] = useOperationTransactionsMutation();

  const [exportData, { isLoading: isLoadingExport }] = useExportMutation();

  const {
    data,
    isFetching: isLoadingGetWorkingAfterHours,
    refetch
  } = useGetRequestManagementQuery(
    {
      type: 'ot-requests',
      params: {
        ...tableInstance.params,
        ...paramsFilterContainer.params,
        search: searchParams.get('search') ?? ''
      }
    },
    {
      refetchOnMountOrArgChange: true
    }
  );
  useEffect(() => {
    if (data) {
      setDataWorkingAfterHours(data.data);
      const listId = data.data.items
        ?.filter((item) => item.nextStates.length > 0)
        .map((item) => item.id);
      setList(listId);
      setIsCheckAll(false);
      setCheckedList([]);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [key]);

  const columnsCheckBox = {
    title: <Checkbox onChange={(e) => handleSelectAll(e)} checked={isCheckAll} />,
    render: (value) => {
      return (
        <>
          {value.nextStates.length > 0 && (
            <Checkbox
              checked={checkedList.includes(value.key)}
              onChange={(e) => handleSelect(e, value.key)}
            />
          )}
        </>
      );
    }
  };
  const columnFunctions = {
    title: t('MY_TIME_REQUEST_LIST_COLUMNS.functions'),
    key: 'functions',
    dataIndex: 'id',
    render: (id, record) => (
      <StyledTableFunction>
        <StyledTableButton>
          <EyeIcon
            onClick={() => {
              navigate({
                pathname: `${record.key}`,
                search: searchParams.toString()
              });
            }}
          />
        </StyledTableButton>

        {record.nextStates.length > 0 && (
          <PopoverActions id={id} dataStates={record.nextStates}>
            <MoreVertIcon />
          </PopoverActions>
        )}
      </StyledTableFunction>
    )
  };
  const columns: ColumnsType = [
    {
      title: t('modal.cif'),
      dataIndex: 'user.code',
      key: 'cif',
      sorter: true,
      width: '7%'
    },
    {
      title: t('MY_TIME_REQUEST_LIST_COLUMNS.name'),
      dataIndex: 'user.fullName',
      key: 'name',
      sorter: true,
      width: '15%',
      render: (value: string) => <span className="font-bold">{value.toUpperCase()}</span>
    },
    {
      title: t('MY_TIME_REQUEST_LIST_COLUMNS.dateRange'),
      dataIndex: 'fromDate',
      key: 'fromDate',
      sorter: true,
      width: '10%'
    },
    {
      title: t('MY_TIME_REQUEST_LIST_COLUMNS.spentTime'),
      dataIndex: 'duration',
      key: 'duration',
      sorter: true,
      width: '8%',
      align: 'center'
    },
    {
      title: t('MY_TIME_REQUEST_LIST_COLUMNS.type'),
      dataIndex: 'type',
      key: 'type',
      sorter: true,
      width: '10%',
      render: (value: string) => <Text>{t(value)}</Text>
    },
    {
      title: t('MY_TIME_REQUEST_LIST_COLUMNS.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status, record: any) => (
        <Tag color={record.currentState?.stateType?.color}>{record.currentState?.name}</Tag>
      ),
      width: '10%'
    },
    {
      title: t('MY_TIME_REQUEST_LIST_COLUMNS.comment'),
      dataIndex: 'comment',
      key: 'comment',
      sorter: true,
      width: '32%',
      render: (_, record: any) => {
        return <ShowText record={record} />;
      }
    }
  ];

  useEffect(() => {
    dataWorkingAfterHours?.items && setDateSource(dataFormat(dataWorkingAfterHours?.items));
  }, [dataWorkingAfterHours?.items]);

  const handleSelectAll = (e: CheckboxChangeEvent) => {
    const { checked } = e.target;
    setIsCheckAll(checked);
    setCheckedList(list.map((li) => li));
    if (!checked) {
      setCheckedList([]);
    }
  };

  const handleSelect = (e: CheckboxChangeEvent, id: string) => {
    const { checked } = e.target;
    if (checked) {
      setCheckedList([...checkedList, id]);
      setIsCheckAll(list.length === [...checkedList, id].length);
    }
    if (!checked) {
      setCheckedList(checkedList.filter((item) => item !== id));
      setIsCheckAll(false);
    }
  };
  const handleBulkChange = () => {
    getBulk({
      type: 'ot-requests',
      params: {
        reqIds: checkedList.toString()
      }
    })
      .unwrap()
      .then(({ data }) => {
        setDataBulk(data);
        setIsBulkChange(true);
      });
  };

  const onCloseDrawer = () => {
    setIsBulkChange(false);
  };

  const handleExport = () => {
    exportData({
      type: 'export-ot-requests',
      params: {
        ...paramsFilterContainer.params
      }
    })
      .unwrap()
      .then((value) => {
        FileSaver.saveAs(value, 'WORKING_AFTER_HOURS.xlsx');
      });
  };

  return (
    <StyledUpdate>
      <RequestManagementFilter
        handleBulkChange={handleBulkChange}
        handleExport={handleExport}
        disableBulkChange={isLoadingBulk || checkedList.length === 0}
        isLoadingBulkChange={isLoadingBulk}
        isLoadingExport={isLoadingExport}
      />
      <br />
      <Table
        tableInstance={tableInstance}
        totalElements={dataWorkingAfterHours?.totalElements || 0}
        totalPages={dataWorkingAfterHours?.totalPages || 0}
        columns={[columnsCheckBox, ...columns, columnFunctions] as ColumnsType}
        dataSource={dataSource}
        loading={isLoadingGetWorkingAfterHours}
      />
      <Outlet />
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
          dataFormat={dataFormat}
          type="ot-requests"
        />
      </Drawer>
    </StyledUpdate>
  );
};
const dataFormat = (data: any) => {
  return data?.map((item: any) => ({
    ...item,
    key: item.id,
    'user.code': item.user.cif,
    'user.fullName': item.user.fullName,
    fromDate:
      moment(item.fromDate).format('l').toString() === moment(item.toDate).format('l').toString()
        ? moment(item.fromDate).format('l')
        : moment(item.fromDate).format('l') + ' - ' + moment(item.toDate).format('l'),
    duration: Number(item.duration) / 60 / 60 + 'h',
    type: item.type,
    status: item.currentState.name,
    comment: item.comment
  }));
};
export default WorkingAfterHours;
