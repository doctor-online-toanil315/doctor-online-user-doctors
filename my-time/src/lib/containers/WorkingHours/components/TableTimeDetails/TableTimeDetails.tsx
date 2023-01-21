import { EditIcon, Table } from '@nexthcm/components';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useLazyGetWorkingHoursOnlyMeQuery } from '../../../../services';
import { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';

const formatInTimeOutTime = (time: number) => {
  return moment.utc(time * 1000).format('HH:mm');
};

interface Props {
  record: any;
  setTypeForm: (data: string) => void;
  setDataEdit: (data: any) => void;
  handleOpen: () => void;
  fromDateForGroupBy: string;
  toDateForGroupBy: string;
  expanded: boolean;
}

const TableTimeDetails = ({
  record,
  setTypeForm,
  setDataEdit,
  handleOpen,
  fromDateForGroupBy,
  toDateForGroupBy,
  expanded
}: Props) => {
  const { t, i18n } = useTranslation();
  const tableInstance = Table.useTable();
  const [dataOnlyMe, setDataOnlyMe] = useState<any>();
  const [getWorkingHoursOnly, { isLoading }] = useLazyGetWorkingHoursOnlyMeQuery();

  useEffect(() => {
    if (expanded) {
      getWorkingHoursOnly(
        {
          ...tableInstance.params,
          userId: record.key,
          fromDate: fromDateForGroupBy,
          toDate: toDateForGroupBy
        },
        true
      )
        .unwrap()
        .then((res) => {
          setDataOnlyMe(res.data);
        });
    }
  }, [expanded, fromDateForGroupBy, toDateForGroupBy, tableInstance.params]);

  const dataExpandedTable = dataOnlyMe?.items.map((item: any) => {
    return {
      key: item.id,
      date:
        i18n.language === 'en'
          ? moment(item.trackingDate).format('MM/DD/YYYY')
          : moment(item.trackingDate).format('DD/MM/YYYY'),
      timeIn: item.inTime ? formatInTimeOutTime(item.inTime) : null,
      timeOut: item.outTime ? formatInTimeOutTime(item.outTime) : null,
      totalWorkingTime: item.totalWorkingTime ? (item.totalWorkingTime / 3600).toFixed(1) : '-',
      workingDays: item.workingDay ? item.workingDay : '-',
      OT: item.ot ? item.ot : '-',
      leaveCount: item.leaveType ? item.leaveType : null,
      trackingDate: item.trackingDate,
      userId: item.userId,
      fullName: item.userInfo.fullName
    };
  });

  const col: ColumnsType = [
    {
      title: t('workingHours.date'),
      dataIndex: 'date',
      key: 'date',
      sorter: true,
      width: '10%'
    },
    {
      title: t('workingHours.timeIn'),
      dataIndex: 'timeIn',
      key: 'timeIn',
      sorter: true,
      align: 'center',
      width: '10%'
    },
    {
      title: t('workingHours.timeOut'),
      dataIndex: 'timeOut',
      key: 'timeOut',
      sorter: true,
      align: 'center',
      width: '10%'
    },
    {
      title: t('workingHours.totalWorkingTime'),
      dataIndex: 'totalWorkingTime',
      key: 'totalWorkingTime',
      sorter: true,
      align: 'center',
      width: '15%'
    },
    {
      title: t('workingHours.workingDays'),
      dataIndex: 'workingDays',
      key: 'workingDays',
      sorter: true,
      align: 'center',
      width: '10%'
    },
    {
      title: t('workingHours.OT'),
      dataIndex: 'OT',
      key: 'OT',
      sorter: true,
      align: 'center',
      width: '10%'
    },
    {
      title: t('workingHours.leaveCount'),
      dataIndex: 'leaveCount',
      key: 'leaveCount',
      sorter: true,
      align: 'center',
      width: '10%'
    },
    {
      title: t('workingHours.functions'),
      dataIndex: 'functions',
      key: 'functions',
      align: 'center',
      width: '15%',
      render: (_, data: any) => (
        <div
          className="edit-icon-container"
          onClick={() => {
            setTypeForm('edit');
            setDataEdit({ ...data });
            handleOpen();
          }}
        >
          <EditIcon />
        </div>
      )
    }
  ];

  return (
    <Table
      className="expanded-table"
      loading={isLoading}
      columns={col}
      dataSource={dataExpandedTable}
      tableInstance={tableInstance}
      totalElements={dataOnlyMe ? dataOnlyMe?.totalElements : 0}
      totalPages={dataOnlyMe ? dataOnlyMe?.totalPages : 0}
    />
  );
};

export default TableTimeDetails;
