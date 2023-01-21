import { useModal } from '@nexthcm/common';
import {
  Button,
  EyeIcon,
  MoreVertIcon,
  openNotification,
  Table,
  Tag,
  Text,
  TextEllipsis,
  Title
} from '@nexthcm/components';
import { Row } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { Dropdown, Menu } from '../../components';
import { MyLeaveFilter, MyLeaveHeader } from '../../containers';
import { useMyLeaveFilter } from '../../hooks';
import { useGetMyLeaveQuery, usePutLeaveMutation } from '../../services';
import { LeaveMe, LeaveMeTable } from '../../types';
import {
  StyledModal,
  StyledMyLeave,
  StyledMyLeaveContainer,
  StyledTable,
  StyledTableButton,
  StyledTableFunction
} from './styles';

const formatDate = (date: string) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US');
  return formattedDate;
};

const formatHourMinute = (time: number) => {
  const hour = Math.floor(time / 3600);
  const minute = Math.floor((time % 3600) / 60);
  const result = `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
  return result;
};

const MyLeave = () => {
  const [modalTitle, setModalTitle] = useState<string>('');
  const [myLeaveTable, setMyLeaveTable] = useState<LeaveMeTable | null>(null);
  const [myLeavesTable, setMyLeavesTable] = useState<LeaveMeTable[] | []>([]);
  const [myLeaveNextStateKey, setMyLeaveNextStateKey] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const tableInstance = Table.useTable();
  const paramsFilterContainer = useMyLeaveFilter();
  const { t } = useTranslation();
  const { isOpen, handleOpen, handleClose } = useModal();
  const { data: myLeaveData, isFetching } = useGetMyLeaveQuery(
    {
      ...tableInstance.params,
      ...paramsFilterContainer.params
    },
    {
      refetchOnMountOrArgChange: true
    }
  );
  const [updateMyLeave, { isLoading: isUpdatingMyLeave }] = usePutLeaveMutation();

  const columns: ColumnsType<LeaveMeTable> = [
    {
      title: t('myTime.myLeave.table.dateRange'),
      dataIndex: 'dateRange',
      sorter: true
    },
    {
      title: t('myTime.myLeave.table.leaveTypeName'),
      dataIndex: 'leaveTypeName',
      sorter: true
    },
    {
      title: t('myTime.myLeave.table.days'),
      dataIndex: 'days'
    },
    {
      title: t('myTime.myLeave.table.status'),
      dataIndex: 'status',
      render: (text: string, record: LeaveMeTable) => (
        <Tag color={record.currentState.stateType.color}>{text}</Tag>
      )
    },
    {
      title: t('myTime.myLeave.table.comment'),
      dataIndex: 'comment',
      render: (text: string, record: LeaveMeTable) => <TextEllipsis data={text} />,
      sorter: true
    },
    {
      title: t('myTime.myLeave.table.functions'),
      dataIndex: 'functions',
      render: (_: string, record: LeaveMeTable) => {
        const items: ItemType[] = [];

        for (let index = 0; index < record.nextStates.length; index++) {
          const newItems = {
            label: (
              <Button
                onClick={() => {
                  handleOpen();
                  handleOnClickButton(record, index);
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
    }
  ];

  const formatDateRange = (myLeaveItem: LeaveMe) => {
    let timeRange = '';

    if (myLeaveItem.items[0]?.fromTime && myLeaveItem.items[0]?.toTime) {
      timeRange = `(${formatHourMinute(myLeaveItem.items[0].fromTime)} - ${formatHourMinute(
        myLeaveItem.items[0].toTime
      )})`;
    } else if (myLeaveItem.items[0]?.morning) {
      timeRange = `(${t('myTime.myLeave.option.morning')})`;
    } else if (myLeaveItem.items[0]?.afternoon) {
      timeRange = `(${t('myTime.myLeave.option.afternoon')})`;
    }

    if (myLeaveItem.durationInDay <= 1) {
      return `${formatDate(myLeaveItem.toDate)} ${timeRange}`;
    } else {
      return `${formatDate(myLeaveItem.fromDate)} - ${formatDate(myLeaveItem.toDate)} ${timeRange}`;
    }
  };

  const formatMyLeaveDataTable = (myLeaveList: LeaveMe[]) => {
    const formattedMyLeave: LeaveMeTable[] = [];

    myLeaveList.map((myLeaveItem: LeaveMe) => {
      return formattedMyLeave.push({
        key: myLeaveItem.id,
        dateRange: formatDateRange(myLeaveItem).trim(),
        leaveTypeName: myLeaveItem.leaveType.name.trim(),
        days: myLeaveItem.durationInDay,
        status: myLeaveItem.currentState.name.trim(),
        comment: myLeaveItem.comment,
        currentState: myLeaveItem.currentState,
        nextStates: myLeaveItem.nextStates
      });
    });

    return formattedMyLeave;
  };

  const handleOnClickButton = (record: LeaveMeTable, index: number) => {
    setModalTitle(record.nextStates[index].state.name);
    setMyLeaveTable(record);
    setMyLeaveNextStateKey(record.nextStates[index].state.id);
  };

  const handleSubmitConfirm = () => {
    if (myLeaveTable?.key) {
      updateMyLeave({ id: myLeaveTable?.key, body: myLeaveNextStateKey })
        .unwrap()
        .then(() => {
          openNotification({
            type: 'success',
            message: t('myTime.myLeave.notification.updateSuccess')
          });

          setMyLeaveNextStateKey('');
          setMyLeaveTable(null);
        })
        .catch((error) => {
          if (error.data.message === 'PROCESS_NOT_FOUND') {
            openNotification({
              type: 'error',
              message: t('myTime.myLeave.notification.processNotFound')
            });
          }
        })
        .finally(() => {
          handleClose();
        });
    }
  };

  useEffect(() => {
    if (myLeaveData) {
      const formattedData = formatMyLeaveDataTable(myLeaveData.data.items);
      setMyLeavesTable(formattedData);
    }
  }, [myLeaveData]);

  return (
    <StyledMyLeave>
      <MyLeaveHeader />
      <StyledMyLeaveContainer>
        <MyLeaveFilter />
        <StyledTable
          className="table"
          tableInstance={tableInstance}
          totalElements={myLeaveData?.data.totalElements}
          totalPages={myLeaveData?.data.totalPages}
          columns={columns}
          dataSource={myLeavesTable}
          loading={isFetching || isUpdatingMyLeave}
        />
        <Outlet />
      </StyledMyLeaveContainer>

      <StyledModal
        type="confirm"
        className="modal-confirm"
        confirmIcon="?"
        visible={isOpen}
        onCancel={handleClose}
        title={t('myTime.myLeave.warning.updatingWarning')}
      >
        <>
          <Title className="modal-confirm__status" level={4}>
            {modalTitle}
          </Title>
          <Row className="modal-confirm__button">
            <Button key="back" border="outline" onClick={handleClose} loading={isUpdatingMyLeave}>
              {t('common:confirm.cancel')}
            </Button>
            <Button key="submit" onClick={handleSubmitConfirm}>
              {t('common:confirm.ok')}
            </Button>
          </Row>
        </>
      </StyledModal>
    </StyledMyLeave>
  );
};

export default MyLeave;
