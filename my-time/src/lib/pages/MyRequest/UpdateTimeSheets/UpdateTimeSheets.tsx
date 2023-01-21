import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { EyeIcon, Table } from '@nexthcm/components';
import { useTranslation } from 'react-i18next';
import { useGetUpdateTimeSheetsQuery } from '../../../services';
import { ButtonFunction, StyleBackgroundStatus, StyledFunctions } from '../styled';
import ListDropDown from './ListDropDown';
import { IUpdateTimeSheets } from '../../../types/updateTimeSheets';
import moment from 'moment';
import { i18n, useCommonSelector, RootState } from '@nexthcm/common';
import useMyRequestFilter from '../../../hooks/useMyRequestFilter';
import ShowText from '../../../components/ShowText/ShowText';
import { ColumnsType } from 'antd/es/table';
import { StyledDate, StyledUpdate } from './styles';

const UpdateTimeSheets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tableInstance = Table.useTable();
  const { t } = useTranslation();
  const lng = localStorage.getItem('i18nextLng');
  const myRequestFilter = useMyRequestFilter();
  const navigate = useNavigate();

  const userId = useCommonSelector((state: RootState) => state.user.user.userId);

  const { data, isFetching } = useGetUpdateTimeSheetsQuery(
    {
      ...tableInstance.params,
      userId: userId,
      ...myRequestFilter.params
    },
    {
      refetchOnMountOrArgChange: true
    }
  );

  const timeSheetList = data?.data ?? {};

  const formatDate = (date: number, ln: 'en' | 'vi') => {
    const dateVi = moment(date).locale(i18n.language).format('dddd[,] D/M/YYYY');
    return ln === 'en'
      ? moment(date).locale(i18n.language).format('dddd[,] M/D/YYYY')
      : dateVi.charAt(0).toUpperCase() + dateVi.slice(1);
  };

  const formatTime = (second: any) => {
    const formattedTime = moment.utc(second * 1000).format('HH:mm');
    return formattedTime;
  };
  const dataSource =
    timeSheetList?.items && timeSheetList?.items.length > 0
      ? timeSheetList?.items.map((items: IUpdateTimeSheets) => {
          return {
            key: items.id,
            date: formatDate(items.createdDate, lng === 'en' ? 'en' : 'vi'),
            status: items.currentState.name,
            comment: items.comment,
            newCheckInTime: formatTime(items.newInTime),
            newCheckOutTime: formatTime(items.newOutTime),
            color: items.currentState.stateType.color,
            nextStates: items.nextStates,
            updatedTotalTime: formatTime(items.updateTotalTime),
            updatedWorkingDay: items.updateWorkingDay ? items.updateWorkingDay : '-'
          };
        })
      : [];

  const columns = [
    {
      title: t('myRequest.date'),
      dataIndex: 'date',
      sorter: true,
      render: (date: any) => {
        return (
          <StyledDate>
            <span className="date">{date}</span>
          </StyledDate>
        );
      }
    },
    {
      title: t('myRequest.newCheckInTime'),
      dataIndex: 'newCheckInTime',
      align: 'center',
      sorter: true
    },
    {
      title: t('myRequest.newCheckOutTime'),
      dataIndex: 'newCheckOutTime',
      align: 'center',
      sorter: true
    },
    {
      title: t('myRequest.updatedTotalTime'),
      dataIndex: 'updatedTotalTime',
      align: 'center',
      sorter: true
    },
    {
      title: t('myRequest.updatedWorkingDay'),
      dataIndex: 'updatedWorkingDay',
      align: 'center',
      sorter: true
    },
    {
      title: t('myRequest.status'),
      dataIndex: 'status',
      sorter: true,
      render: (status, record) => (
        <StyleBackgroundStatus>
          <span
            className={`myTime-status ${status}`}
            style={{ backgroundColor: `${record.color}` }}
          >
            {status}
          </span>
        </StyleBackgroundStatus>
      )
    },
    {
      title: t('myRequest.comment'),
      dataIndex: 'comment',
      sorter: true,
      render: (_, record: any) => {
        return <ShowText record={record} />;
      }
    },
    {
      title: t('myRequest.functions'),
      dataIndex: 'id',
      render: (id, record: any) => {
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
                <ListDropDown record={record} />
              </ButtonFunction>
            )}
          </StyledFunctions>
        );
      }
    }
  ];

  return (
    <StyledUpdate>
      <Table
        tableInstance={tableInstance}
        totalElements={timeSheetList?.totalElements}
        totalPages={timeSheetList?.totalPages}
        columns={columns as ColumnsType}
        dataSource={dataSource}
        loading={isFetching}
      />
      <Outlet />
    </StyledUpdate>
  );
};

export default UpdateTimeSheets;
