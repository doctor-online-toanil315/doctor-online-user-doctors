import { useTranslation } from 'react-i18next';
import { EyeIcon, Table } from '@nexthcm/components';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ButtonFunction, StyleBackgroundStatus, StyledDateRange, StyledFunctions } from '../styled';
import { useGetWorkFromHomeQuery } from '../../../services';
import { IWorkFromHome } from '../../../types/workFromHome';
import ListDropDown from './ListDropDown';
import { RootState, useCommonSelector } from '@nexthcm/common';
import useMyRequestFilter from '../../../hooks/useMyRequestFilter';
import ShowText from '../../../components/ShowText/ShowText';
import { useEffect } from 'react';

const WorkFromHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tableInstance = Table.useTable();
  const { t } = useTranslation();
  const myRequestFilter = useMyRequestFilter();
  const navigate = useNavigate();
  const location = useLocation();

  const userId = useCommonSelector((state: RootState) => state.user.user.userId);

  const { data, isFetching, refetch } = useGetWorkFromHomeQuery(
    {
      ...tableInstance.params,
      userId: userId,
      ...myRequestFilter.params
    },
    {
      refetchOnMountOrArgChange: true
    }
  );

  const wfhListData = data?.data ?? {};

  useEffect(() => {
    refetch();
  }, [location.key]);

  const formatDate = (date: number) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US');

    return formattedDate;
  };

  const dataSource =
    wfhListData?.items && wfhListData?.items.length > 0
      ? wfhListData?.items.map((items: IWorkFromHome) => {
          return {
            key: items.id,
            fromDate: `${formatDate(items.fromDate)} - ${formatDate(items.toDate)}`,
            totalDay: items.totalDay,
            status: items.currentState.name,
            comment: items.comment,
            color: items.currentState.stateType.color,
            nextStates: items.nextStates
          };
        })
      : [];

  const columns = [
    {
      title: t('myRequest.dateRange'),
      dataIndex: 'fromDate',
      sorter: true,
      render: (value: any) => {
        return <StyledDateRange>{value}</StyledDateRange>;
      }
    },
    {
      title: t('myRequest.days'),
      dataIndex: 'totalDay',
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
      width: '50%',
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
        totalElements={wfhListData?.totalElements}
        totalPages={wfhListData?.totalPages}
        columns={columns}
        dataSource={dataSource}
        loading={isFetching}
      />
      <Outlet />
    </>
  );
};

export default WorkFromHome;
