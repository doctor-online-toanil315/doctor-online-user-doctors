import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { EyeIcon, Table } from '@nexthcm/components';
import { useTranslation } from 'react-i18next';
import { useGetWorkingOnsitesQuery } from '../../../services';
import { IWorkingOnsite } from '../../../types/workingOnsites';
import { ButtonFunction, StyleBackgroundStatus, StyledFunctions } from '../styled';
import ListDropdown from './ListDropDown';
import { RootState, useCommonSelector } from '@nexthcm/common';
import useMyRequestFilter from '../../../hooks/useMyRequestFilter';
import ShowText from '../../../components/ShowText/ShowText';
import { useEffect } from 'react';

const WorkingOnsites = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tableInstance = Table.useTable();
  const { t } = useTranslation();
  const myRequestFilter = useMyRequestFilter();
  const navigate = useNavigate();
  const location = useLocation();

  const userId = useCommonSelector((state: RootState) => state.user.user.userId);

  const { data, isFetching, refetch } = useGetWorkingOnsitesQuery(
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

  const workingListData = data?.data ?? {};

  const formatDate = (date: number) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US');

    return formattedDate;
  };

  const dataSource =
    workingListData?.items && workingListData?.items.length > 0
      ? workingListData?.items.map((items: IWorkingOnsite) => {
          return {
            key: items.id,
            fromDate: `${formatDate(items.fromDate)} - ${formatDate(items.toDate)}`,
            days: items.totalDay || (items.totalDay === 0 ? '-' : []),
            status: items.currentState.name,
            comment: items.comment,
            color: items.currentState.stateType.color,
            nextStates: items.nextStates,
            officeDTO: items.officeDTO.name
          };
        })
      : [];

  const columns = [
    {
      title: t('myRequest.dateRange'),
      dataIndex: 'fromDate',
      sorter: true
    },
    {
      title: t('myRequest.days'),
      dataIndex: 'days',
      sorter: true
    },
    {
      title: t('myRequest.office'),
      dataIndex: 'officeDTO',
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
                <ListDropdown record={record} />
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
        totalElements={workingListData?.totalElements}
        totalPages={workingListData?.totalPages}
        columns={columns}
        dataSource={dataSource}
        loading={isFetching}
      />
      <Outlet />
    </>
  );
};

export default WorkingOnsites;
