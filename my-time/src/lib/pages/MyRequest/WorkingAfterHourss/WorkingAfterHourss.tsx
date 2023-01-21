import { ButtonFunction, StyleBackgroundStatus, StyledDateRange, StyledFunctions } from '../styled';
import { EyeIcon, Table } from '@nexthcm/components';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { IWorkingAfterHourss } from '../../../types/workingAfterHourss';
import { RootState, useCommonSelector } from '@nexthcm/common';
import useMyRequestFilter from '../../../hooks/useMyRequestFilter';
import { useGetWorkingAfterHourssQuery } from '../../../services';
import ListDropDown from './ListDropDown';
import ShowText from '../../../components/ShowText/ShowText';
import { useEffect } from 'react';

const WorkingAfterHourss = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const tableInstance = Table.useTable();
  const myRequestFilter = useMyRequestFilter();
  const navigate = useNavigate();
  const location = useLocation();

  const userId = useCommonSelector((state: RootState) => state.user.user.userId);

  const { data, isFetching, refetch } = useGetWorkingAfterHourssQuery(
    {
      ...tableInstance.params,
      userId: userId,
      ...myRequestFilter.params
    },
    {
      refetchOnMountOrArgChange: true
    }
  );

  useEffect(() => {
    refetch();
  }, [location.key]);

  const wafListData = data?.data ?? {};

  const formatDate = (date: number) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US');
    return formattedDate;
  };
  const formattedText = (text: string) => {
    const result = (text[0].toUpperCase() + text.slice(1).toLowerCase()).replace('_', ' ');
    return result;
  };

  const parsedType = (type: string) => {
    switch (type) {
      case 'OVERTIME':
        return t('myRequest.overtime');
      case 'WORKING_AFTERTIME':
        return t('myRequest.afterHours');
      default:
        return;
    }
  };

  const dataSource =
    wafListData?.items && wafListData?.items.length > 0
      ? wafListData?.items.map((items: IWorkingAfterHourss) => {
          return {
            key: items.id,
            fromDate:
              formatDate(items.fromDate) === formatDate(items.toDate)
                ? formatDate(items.fromDate)
                : `${formatDate(items.fromDate)} - ${formatDate(items.toDate)}`,
            status: items.currentState.name,
            comment: items.comment,
            color: items.currentState.stateType.color,
            nextStates: items.nextStates,
            type: parsedType(items.type),
            duration: items.duration / 3600 + 'h'
          };
        })
      : [];

  const columns = [
    {
      title: t('myRequest.dateRange'),
      dataIndex: 'fromDate',
      sorter: true,
      render: (date: any) => {
        return (
          <StyledDateRange>
            <span className="dateRange">{date}</span>
          </StyledDateRange>
        );
      }
    },
    {
      title: t('myRequest.spentTime'),
      dataIndex: 'duration',
      sorter: true
    },
    {
      title: t('myRequest.type'),
      dataIndex: 'type',
      sorter: true,
      width: '12%'
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
      width: '40%',
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
    <>
      <Table
        tableInstance={tableInstance}
        totalElements={wafListData?.totalElements}
        totalPages={wafListData?.totalPages}
        columns={columns}
        dataSource={dataSource}
        loading={isFetching}
      />
      <Outlet />
    </>
  );
};

export default WorkingAfterHourss;
