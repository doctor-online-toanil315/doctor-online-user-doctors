import {
  Checkbox,
  MoreVertIcon,
  EyeIcon,
  Table,
  Button,
  Title,
  openNotification,
  TextEllipsis
} from '@nexthcm/components';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useExportMutation,
  useGetOperationTransactionsWFHMutation,
  useGetRequestManagementQuery,
  usePutRequestManagementMutation
} from '../../services/MyTimeApp';

import FileSaver from 'file-saver';

import useFilter from '../../hooks/useFilter';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { ColumnsType } from 'antd/es/table';
import {
  IState,
  IWFHItemTable,
  OutsideOperationTransactionsData,
  OutsideOperationTransactionsResponse
} from '../../types';
import { BtnFunction, StyledFunctions, StyledModal, StyledTag, StyledWFH } from './styles';

import { RequestManagementFilter } from '../../containers';
import { Dropdown, Menu } from '../../components';
import { useToggle } from '../../hooks';
import { Drawer, Row } from 'antd';
import { BulkChange } from '../../components/BulkChange';

const WFH = () => {
  const { t, i18n } = useTranslation();
  const tableInstance = Table.useTable();
  const filterParams = useFilter();
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataSource, setDataSource] = useState<any>([]);
  const navigate = useNavigate();
  const { key } = useLocation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [availableKeys, setAvailableKeys] = useState<React.Key[]>([]);
  const [availableRecords, setAvailableRecords] = useState<number>(0);
  const [isSelectedAll, setSelectedAll] = useState<boolean>(false);

  const [isOpenEditStatus, toggleEditStatus] = useToggle();
  const [isOpenBulkChange, toggleBulkChange] = useToggle();

  const [modalEditStatus, setModalEditStatus] = useState<any>({
    recordId: '',
    title: '',
    statusId: ''
  });

  const [dataBulk, setDataBulk] = useState<OutsideOperationTransactionsData[] | []>([]);

  const {
    data: wfhListData,
    isLoading: loadingTable,
    isFetching: fetchingTable,
    refetch
  } = useGetRequestManagementQuery(
    {
      params: {
        ...tableInstance.params,
        ...filterParams.params,
        search: searchParams.get('search') ?? ''
      },
      type: 'wfh'
    },
    {
      refetchOnMountOrArgChange: true
    }
  );

  const [updateStatus, { isLoading: loadingUpdateStatus }] = usePutRequestManagementMutation();

  const [exportOutside, { isLoading: isExporting }] = useExportMutation();
  const [getOperationTransactions, { isLoading: fetchingTransaction }] =
    useGetOperationTransactionsWFHMutation();

  useEffect(() => {
    refetch();
  }, [key]);

  const columns: ColumnsType<any> = [
    {
      title: t('workFromHome.cif'),
      dataIndex: 'cif',
      key: 'cif',
      sorter: true,
      width: '10%'
    },
    {
      title: t('workFromHome.name'),
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      width: '15%',

      render: (_: string, record: IWFHItemTable) => (
        <span className="name">{record.userInfo.fullName}</span>
      )
    },
    {
      title: t('workFromHome.dateRange'),
      dataIndex: 'dateRange',
      key: 'dateRange',
      sorter: true,
      width: '15%'
    },
    {
      title: t('workFromHome.days'),
      dataIndex: 'totalDay',
      key: 'totalDay',
      width: '5%',

      sorter: true,
      render: (item) => <span>{item > 0 ? item : '-'}</span>
    },
    {
      title: t('workFromHome.status'),
      dataIndex: 'currentState',
      key: 'currentState',
      render: (item: IState) => (
        <StyledTag bg={item.stateType.color} rounded="8px">
          {item.name}
        </StyledTag>
      ),
      width: '10%'
    },
    {
      title: t('workFromHome.comment'),
      dataIndex: 'comment',
      key: 'comment',
      sorter: true,
      render: (item) => <TextEllipsis data={item} length={50} />,
      width: '35%'
    }
  ];

  const columnFunctions = {
    title: t('workFromHome.functions'),
    dataIndex: 'functions',
    width: '10%',

    render: (_: string, record: IWFHItemTable) => {
      const menuOptions = record.nextStates.map((item) => {
        return {
          label: (
            <Button
              className="btn-function"
              onClick={() => {
                setModalEditStatus((prev) => ({
                  ...prev,
                  title: item.state.name,
                  recordId: record.id,
                  statusId: item.state.id
                }));
                toggleEditStatus();
              }}
            >
              {item.transition.name}
            </Button>
          ),
          key: item.id
        };
      });

      const menu = <Menu items={menuOptions}></Menu>;

      return (
        <StyledFunctions>
          <BtnFunction onClick={() => handleOpenUpdate(record.id)}>
            <EyeIcon />
          </BtnFunction>

          {record.nextStates.length > 0 && (
            <Dropdown overlay={menu} trigger={['click']}>
              <BtnFunction>
                <MoreVertIcon />
              </BtnFunction>
            </Dropdown>
          )}
        </StyledFunctions>
      );
    }
  };

  const handleSelectedCheckboxAll = () => {
    setSelectedRowKeys(() => (isSelectedAll ? [] : availableKeys));
    setSelectedAll((prev) => !prev);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedAll(availableRecords === selectedRowKeys.length);
    },
    getCheckboxProps: (record) => {
      return {
        disabled: record.nextStates.length <= 0,
        name: record.name
      };
    },
    renderCell: (checked: boolean, record: any, index: number, originNode: React.ReactNode) => {
      return <Checkbox className="table__checkbox">{originNode}</Checkbox>;
    },
    columnTitle: (
      <Checkbox
        className="table__checkbox"
        checked={isSelectedAll}
        onChange={handleSelectedCheckboxAll}
      />
    )
  };

  const handleOpenUpdate = (id: string) => {
    navigate({
      pathname: `${id}`,
      search: searchParams.toString()
    });
  };

  const formatDate = (date: Date) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US');

    return formattedDate;
  };

  const formatData = (data) => {
    const formattedDataSource = data.map((item) => ({
      ...item,
      cif: item.userInfo.cif,
      dateRange:
        formatDate(item.fromDate) === formatDate(item.toDate)
          ? formatDate(item.fromDate)
          : `${formatDate(item.fromDate)} - ${formatDate(item.toDate)}`,
      key: item.id
    }));

    return formattedDataSource;
  };
  useEffect(() => {
    if (!wfhListData) return;

    const formattedDataSource = wfhListData.data.items.map((item) => ({
      ...item,
      cif: item.userInfo.cif,
      dateRange:
        formatDate(item.fromDate) === formatDate(item.toDate)
          ? formatDate(item.fromDate)
          : `${formatDate(item.fromDate)} - ${formatDate(item.toDate)}`,
      key: item.id
    }));

    const availableItem = formattedDataSource.filter((item) => item.nextStates.length > 0);

    setAvailableKeys([...availableItem.map((item) => item.id)]);
    setAvailableRecords(availableItem.length);
    setDataSource(formattedDataSource);
  }, [wfhListData]);

  const handleBulkChange = () => {
    getOperationTransactions({ reqIds: selectedRowKeys.toString() })
      .unwrap()
      .then((response: OutsideOperationTransactionsResponse) => {
        setDataBulk(response.data);
        toggleBulkChange();
      });
  };

  const handleExport = () => {
    exportOutside({
      type: 'export-wfh',
      params: { ...filterParams.params }
    })
      .unwrap()
      .then((response) => FileSaver.saveAs(response, 'WORK_FROM_HOME.xlsx'))
      .catch((error) => {
        const errorMessage = i18n.exists(`common:ERRORS.${error.data.message}`)
          ? t(`common:ERRORS.${error.data.message}`)
          : t(`common:HTTP_RESPONSE_ERROR_MESSAGES.${error.status}`);
        openNotification({
          type: 'error',
          message: errorMessage
        });
      });
  };

  const handleSubmitConfirm = () => {
    updateStatus({
      type: 'wfh',
      body: {
        id: modalEditStatus.recordId.trim(),
        request: {
          nextState: modalEditStatus.statusId.trim()
        }
      }
    })
      .unwrap()
      .then(() => {
        openNotification({
          type: 'success',
          message: t('workFromHome.updateSuccess')
        });
        toggleEditStatus();
        setModalEditStatus({
          title: '',
          recordId: ''
        });
      })
      .catch((error) => {
        toggleEditStatus();
        const errorMessage = i18n.exists(`common:ERRORS.${error.data.message}`)
          ? t(`common:ERRORS.${error.data.message}`)
          : t(`common:HTTP_RESPONSE_ERROR_MESSAGES.${error.status}`);
        openNotification({
          type: 'error',
          message: errorMessage
        });
      });
  };

  useEffect(() => {
    setSelectedRowKeys([]);
    setSelectedAll(false);
  }, [wfhListData]);

  return (
    <StyledWFH>
      <RequestManagementFilter
        handleBulkChange={handleBulkChange}
        handleExport={handleExport}
        isLoadingBulkChange={fetchingTransaction}
        isLoadingExport={isExporting}
        disableBulkChange={fetchingTransaction || selectedRowKeys.length === 0}
      />
      <Table
        columns={[...columns, columnFunctions]}
        dataSource={dataSource}
        tableInstance={tableInstance}
        loading={loadingTable || fetchingTable}
        totalElements={wfhListData?.data.totalElements || 0}
        totalPages={wfhListData?.data.totalPages || 0}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection
        }}
      />
      <Outlet />
      <StyledModal
        type="confirm"
        className="modal-confirm"
        confirmIcon="?"
        visible={isOpenEditStatus}
        onCancel={toggleEditStatus}
        title={t('workFromHome.updatingWarning')}
      >
        <>
          <Title className="modal-confirm__status" level={4}>
            {modalEditStatus.title}
          </Title>
          <Row className="modal-confirm__button">
            <Button key="back" border="outline" onClick={toggleEditStatus}>
              {t('common:confirm.cancel')}
            </Button>
            <Button key="submit" onClick={handleSubmitConfirm} loading={loadingUpdateStatus}>
              {t('common:confirm.ok')}
            </Button>
          </Row>
        </>
      </StyledModal>
      <Drawer
        className="drawer-edit-employee"
        placement="bottom"
        onClose={toggleBulkChange}
        visible={isOpenBulkChange}
      >
        <BulkChange
          onCloseDrawer={toggleBulkChange}
          columnBulk={columns}
          dataBulk={dataBulk}
          dataFormat={formatData}
          type="wfh"
        />
      </Drawer>
    </StyledWFH>
  );
};

export default WFH;
