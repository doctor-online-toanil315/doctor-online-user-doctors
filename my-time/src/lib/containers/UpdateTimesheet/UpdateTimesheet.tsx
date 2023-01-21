import { Checkbox, EyeIcon, MoreVertIcon, Table, Tag, TextEllipsis } from '@nexthcm/components';
import { Drawer } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ColumnsType } from 'antd/es/table';
import FileSaver from 'file-saver';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { BulkChange } from '../../components/BulkChange';
import useFilter from '../../hooks/useFilter';
import {
  useExportMutation,
  useGetRequestManagementQuery,
  useOperationTransactionsMutation
} from '../../services';
import { BulkItemType, TimesheetType } from '../../types';
import { formatDate } from '../../utils/utils';
import { RequestManagementFilter } from '../RequestManagementFilter';
import { PopoverActions } from './components/PopoverActions';
import { StyledTableButton, StyledTableFunction, StyledUpdate } from './styles';

const scope = 'MY_TIME_REQUEST_LIST_COLUMNS';

const UpdateTimeSheet = () => {
  const tableInstance = Table.useTable();
  const [dataTimesheet, setDataTimesheet] = useState<TimesheetType>({} as TimesheetType);
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
  const [getBulk, { isLoading: isLoadingBulk }] = useOperationTransactionsMutation();

  const [exportData, { isLoading: isLoadingExport }] = useExportMutation();

  const {
    data,
    isFetching: isLoadingGetTimesheet,
    refetch
  } = useGetRequestManagementQuery(
    {
      type: 'timesheet-updates',
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
      setDataTimesheet(data.data);
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
    title: t(scope + '.functions'),
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
      title: t(scope + '.cif'),
      dataIndex: 'user.code',
      key: 'cif',
      sorter: true,
      className: 'nowrap'
    },
    {
      title: t(scope + '.name'),
      dataIndex: 'user.fullName',
      key: 'name',
      sorter: true,
      render: (value: string) => <span className="font-bold">{value.toUpperCase()}</span>,
      width: '10%'
    },
    {
      title: t(scope + '.date'),
      dataIndex: 'createdDate',
      key: 'date',
      sorter: true,
      width: '10%'
    },
    {
      title: t(scope + '.newInTime'),
      dataIndex: 'newInTime',
      key: 'newInTime',
      sorter: true,
      align: 'center',
      width: '10%'
    },
    {
      title: t(scope + '.newOutTime'),
      dataIndex: 'newOutTime',
      key: 'newOutTime',
      sorter: true,
      align: 'center',
      width: '10%'
    },
    {
      title: t(scope + '.updateTotalTime'),
      dataIndex: 'updateTotalTime',
      key: 'updateTotalTime',
      sorter: true,
      align: 'center',
      width: '10%'
    },
    {
      title: t(scope + '.updateWorkingDay'),
      dataIndex: 'updateWorkingDay',
      key: 'updateWorkingDay',
      sorter: true,
      render: (value) => <div>{value === 0 ? '-' : value}</div>,
      width: '10%',
      align: 'center'
    },
    {
      title: t(scope + '.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status, record: any) => (
        <Tag color={record.currentState?.stateType?.color}>{record.currentState?.name}</Tag>
      )
    },
    {
      title: t(scope + '.comment'),
      dataIndex: 'comment',
      key: 'comment',
      render: (text: string) => <TextEllipsis data={text} length={78} />,
      sorter: true,
      width: '15%'
    }
  ];

  const parsedTimesheetData = dataFormat(dataTimesheet?.items);
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
      type: 'timesheet-updates',
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
      type: 'export-update-timesheet',
      params: {
        ...paramsFilterContainer.params
      }
    })
      .unwrap()
      .then((value) => {
        FileSaver.saveAs(value, 'UPDATE_TIMESHEET.xlsx');
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
        totalElements={dataTimesheet?.totalElements || 0}
        totalPages={dataTimesheet?.totalPages || 0}
        columns={[columnsCheckBox, ...columns, columnFunctions] as ColumnsType}
        dataSource={parsedTimesheetData}
        loading={isLoadingGetTimesheet}
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
          type="timesheet-updates"
        />
      </Drawer>
    </StyledUpdate>
  );
};
const dataFormat = (data: any) => {
  return data?.map((item: any) => ({
    ...item,
    key: item.id,
    'user.code': item.userInfo.cif,
    'user.fullName': item.userInfo.fullName,
    createdDate: formatDate(item.createdDate, 'dddd, M/D/YYYY'),
    newInTime: formatDate(item.newInTime * 1000, 'HH:mm', true),
    newOutTime: formatDate(item.newOutTime * 1000, 'HH:mm', true),
    updateTotalTime: formatDate(item.updateTotalTime * 1000, 'HH:mm', true),
    updateWorkingDay: item.updateWorkingDay,
    status: item.currentState.name,
    comment: item.comment
  }));
};
export default UpdateTimeSheet;
