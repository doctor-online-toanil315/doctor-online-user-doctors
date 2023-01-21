import {
  Button,
  Checkbox,
  EyeIcon,
  MoreVertIcon,
  openNotification,
  Table,
  Tag,
  Text,
  TextEllipsis,
  Title
} from '@nexthcm/components';
import { Drawer, Row } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { ColumnsType } from 'antd/lib/table';
import FileSaver from 'file-saver';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Dropdown, Menu } from '../../../components';
import { BulkChange } from '../../../components/BulkChange';
import { RequestManagementFilter } from '../../../containers';
import useFilter from '../../../hooks/useFilter';
import {
  useExportMutation,
  useGetOperationTransactionsMutation,
  useGetOutsideQuery,
  useUpdateOutsideMutation
} from '../../../services/MyTimeApp';
import {
  Outside,
  OutsideOperationTransactionsData,
  OutsideOperationTransactionsResponse,
  OutsideTable
} from '../../../types';
import { StyledModal, StyledTableButton, StyledTableFunction, StyledWorkingOnsite } from './styles';

const formatDate = (date: number) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US');

  return formattedDate;
};

const WorkingOnsite = () => {
  const [outsideNextStateKey, setOutsideNextStateKey] = useState<string>('');
  const [outsideTable, setOutsideTable] = useState<OutsideTable | null>(null);
  const [outsidesTable, setOutsidesTable] = useState<OutsideTable[] | []>([]);
  const [outsidesOperationTransactions, setOutsidesOperationTransactions] = useState<
    OutsideOperationTransactionsData[] | []
  >([]);
  const [selectedOutsideKeys, setSelectedOutsideKeys] = useState<React.Key[] | []>([]);
  const [isShowBulkChange, setIsShowBulkChange] = useState<boolean>(false);
  const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { key } = useLocation();
  const tableInstance = Table.useTable();
  const paramsFilterContainer = useFilter();
  const {
    data: outsidesData,
    isFetching,
    refetch
  } = useGetOutsideQuery(
    {
      ...tableInstance.params,
      ...paramsFilterContainer.params,
      search: searchParams.get('search') ?? ''
    },
    {
      refetchOnMountOrArgChange: true
    }
  );
  const [updateOutside, { isLoading: isUpdatingOutside }] = useUpdateOutsideMutation();
  const [exportOutside, { isLoading: isExporting }] = useExportMutation();
  const [getOperationTransactions, { isLoading: isGettingOperationTransactions }] =
    useGetOperationTransactionsMutation();

  useEffect(() => {
    refetch();
  }, [key]);

  const columns: ColumnsType<OutsideTable> = [
    {
      title: t('myTime.requestManagement.workingOnsite.cif'),
      dataIndex: 'cif',
      sorter: true,
      render: (text: string) => <Text className="table__cif">{text}</Text>
    },
    {
      title: t('myTime.requestManagement.workingOnsite.name'),
      dataIndex: 'name',
      sorter: true,
      render: (text: string) => <Text className="table__name">{text}</Text>
    },
    {
      title: t('myTime.requestManagement.workingOnsite.dateRange'),
      dataIndex: 'fromDate',
      sorter: true,
      render: (text: string) => <Text className="table__dateRange">{text}</Text>
    },
    {
      title: t('myTime.requestManagement.workingOnsite.days'),
      dataIndex: 'totalDay',
      sorter: true
    },
    {
      title: t('myTime.requestManagement.workingOnsite.status'),
      dataIndex: 'status',
      render: (text: string, record: OutsideTable) => (
        <Tag color={record.currentState.stateType.color}>{text}</Tag>
      )
    },
    {
      title: t('myTime.requestManagement.workingOnsite.comment'),
      dataIndex: 'comment',
      render: (text: string, record: OutsideTable) => <TextEllipsis data={text} length={60} />,
      sorter: true
    }
  ];

  const columnsFunction = {
    title: t('myTime.requestManagement.workingOnsite.functions'),
    dataIndex: 'functions',
    render: (_: string, record: OutsideTable) => {
      const items: ItemType[] = [];

      for (let index = 0; index < record.nextStates.length; index++) {
        const newItems = {
          label: (
            <Button
              onClick={() => {
                setModalTitle(record.nextStates[index].state.name);
                setOutsideTable(record);
                setOutsideNextStateKey(record.nextStates[index].state.id);
                setIsShowConfirm(true);
              }}
            >
              {record.nextStates[index].transition.name}
            </Button>
          ),
          key: record.nextStates[index].id
        };

        items.push(newItems);
      }

      const menu = <Menu items={items}></Menu>;

      return (
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

          {record.nextStates.length !== 0 && (
            <Dropdown overlay={menu} trigger={['click']}>
              <StyledTableButton>
                <MoreVertIcon />
              </StyledTableButton>
            </Dropdown>
          )}
        </StyledTableFunction>
      );
    }
  };

  const availableOutside = outsidesTable.filter(
    (outside: OutsideTable) => outside.nextStates.length !== 0
  );

  const availableOutsideKeys = availableOutside.map((outside) => outside.key);

  const toggleSelectAll = () => {
    if (!isSelectAll) {
      setSelectedOutsideKeys(availableOutsideKeys);
      setIsSelectAll(true);
    } else {
      setSelectedOutsideKeys([]);
      setIsSelectAll(false);
    }
  };

  const rowSelection = {
    selectedRowKeys: selectedOutsideKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: OutsideTable[]) => {
      setSelectedOutsideKeys(selectedRowKeys);

      selectedRowKeys.length === availableOutsideKeys.length
        ? setIsSelectAll(true)
        : setIsSelectAll(false);
    },
    getCheckboxProps: (record: OutsideTable) => ({
      disabled: record.nextStates.length === 0
    }),
    renderCell: (
      checked: boolean,
      record: OutsideTable,
      index: number,
      originNode: React.ReactNode
    ) => {
      return <Checkbox className="table__checkbox">{originNode}</Checkbox>;
    },
    columnTitle: (
      <Checkbox className="table__checkbox" checked={isSelectAll} onChange={toggleSelectAll} />
    )
  };

  const formatOutsideData = (outsideList: Outside[]) => {
    const formattedOutside: OutsideTable[] = [];

    outsideList.map((outsideItem: Outside) => {
      return formattedOutside.push({
        key: outsideItem.id,
        cif: outsideItem.userInfo.cif,
        name: outsideItem.userInfo.fullName,
        fromDate:
          formatDate(outsideItem.fromDate) === formatDate(outsideItem.toDate)
            ? formatDate(outsideItem.fromDate)
            : `${formatDate(outsideItem.fromDate)} - ${formatDate(outsideItem.toDate)}`,
        totalDay: outsideItem.totalDay,
        status: outsideItem.currentState.name,
        comment: outsideItem.comment,
        currentState: outsideItem.currentState,
        nextStates: outsideItem.nextStates
      });
    });

    return formattedOutside;
  };

  const handleBulkChange = () => {
    getOperationTransactions({ reqIds: selectedOutsideKeys.toString() })
      .unwrap()
      .then((response: OutsideOperationTransactionsResponse) => {
        setOutsidesOperationTransactions(response.data);
        setIsShowBulkChange(true);
      });
  };

  const handleCloseBulkChange = () => {
    setIsShowBulkChange(false);
  };

  const handleExport = () => {
    exportOutside({
      type: 'export-outside',
      params: { ...paramsFilterContainer.params }
    })
      .unwrap()
      .then((response) => FileSaver.saveAs(response, 'WORKING_ONSITE.xlsx'))
      .catch(() => {
        openNotification({
          type: 'error',
          message: t('common:ERRORS.INTERNAL_SERVER_ERROR')
        });
      });
  };

  const handleSubmitConfirm = () => {
    if (outsideTable?.key) {
      updateOutside({ id: outsideTable?.key, stateId: outsideNextStateKey })
        .unwrap()
        .then(() => {
          openNotification({
            type: 'success',
            message: t('myTime.requestManagement.workingOnsite.notification.updateSuccess')
          });

          setIsShowConfirm(false);
          setOutsideNextStateKey('');
          setOutsideTable(null);
        })
        .catch((error) => {
          setIsShowConfirm(false);

          if (error.data.message === 'STATE_NOT_FOUND') {
            openNotification({
              type: 'error',
              message: t('myTime.requestManagement.workingOnsite.notification.stateNotFound')
            });
          } else if (error.data.message === 'TRANSITION_NOT_FOUND') {
            openNotification({
              type: 'error',
              message: t('myTime.requestManagement.workingOnsite.notification.transitionNotFound')
            });
          }
        });
    }
  };

  const handleCancelConfirm = () => {
    setIsShowConfirm(false);
    setOutsideNextStateKey('');
    setOutsideTable(null);
  };

  const handleOnReload = () => {
    refetch();
  };

  useEffect(() => {
    if (outsidesData) {
      const formattedData = formatOutsideData(outsidesData.data.items);

      setIsSelectAll(false);
      setOutsidesTable(formattedData);

      setSelectedOutsideKeys([]);
    }
  }, [outsidesData]);

  return (
    <StyledWorkingOnsite>
      <RequestManagementFilter
        handleBulkChange={handleBulkChange}
        handleExport={handleExport}
        isLoadingBulkChange={isGettingOperationTransactions}
        isLoadingExport={isExporting}
        disableBulkChange={selectedOutsideKeys.length === 0 || isGettingOperationTransactions}
      />

      <Table
        className="table"
        rowSelection={rowSelection}
        tableInstance={tableInstance}
        totalElements={outsidesData?.data.totalElements}
        totalPages={outsidesData?.data.totalPages}
        columns={[...columns, columnsFunction]}
        dataSource={outsidesTable}
        loading={isFetching || isUpdatingOutside}
      />
      <Outlet />
      <Drawer
        className="drawer-edit-employee"
        placement="bottom"
        onClose={() => handleCloseBulkChange()}
        visible={isShowBulkChange}
      >
        <BulkChange
          onCloseDrawer={handleCloseBulkChange}
          columnBulk={columns}
          dataBulk={outsidesOperationTransactions}
          dataFormat={formatOutsideData}
          type="outside"
          onReload={handleOnReload}
        />
      </Drawer>

      <StyledModal
        type="confirm"
        className="modal-confirm"
        confirmIcon="?"
        visible={isShowConfirm}
        onCancel={handleCancelConfirm}
        title={t('myTime.requestManagement.workingOnsite.warning.updatingWarning')}
      >
        <>
          <Title className="modal-confirm__status" level={4}>
            {modalTitle}
          </Title>
          <Row className="modal-confirm__button">
            <Button key="back" border="outline" onClick={handleCancelConfirm}>
              {t('common:confirm.cancel')}
            </Button>
            <Button key="submit" onClick={handleSubmitConfirm}>
              {t('common:confirm.ok')}
            </Button>
          </Row>
        </>
      </StyledModal>
    </StyledWorkingOnsite>
  );
};

export default WorkingOnsite;
