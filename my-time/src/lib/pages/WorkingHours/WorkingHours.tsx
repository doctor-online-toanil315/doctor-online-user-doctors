import React from 'react';
import { Title } from '@nexthcm/components';
import { StyledCICOPanel, StyledMain, StyledWorkingHours } from './styles';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { RootState, useCommonSelector, usePermission } from '@nexthcm/common';
import { useTranslation } from 'react-i18next';
import { useGetRequestManagementQuery, useGetTotalWorkingDayQuery } from '../../services';
import TimePanel from './components/TimePanel/TimePanel';
import { DetailWorkingDays } from './components/DeatailWorkingDays';
import { permissionMyTimeEnum } from '../../types/permisstions';
import { TabsWorkingHours } from '../../containers/TabsWorkingHours';
import { Outlet } from 'react-router-dom';

const WorkingHours = () => {
  const { user } = useCommonSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const now = convertToTimeStamp(new Date());
  const toDate = now + 24 * 60 * 60 * 1000 - 1;
  const { data: dataWorkingHour, isLoading: isWorkingHourLoading } = useGetRequestManagementQuery(
    {
      type: 'working-hours',
      params: {
        userId: user.userId,
        fromDate: now,
        toDate: toDate
      }
    },
    { skip: !user.userId, refetchOnMountOrArgChange: true }
  );
  const { data: dataTotalWorkingDay, isLoading: isLoadingTotalWorkingDay } =
    useGetTotalWorkingDayQuery({});
  const [isViewDetail] = usePermission([permissionMyTimeEnum.VIEW_WORKING_HOUR_DETAIL]);

  return (
    <StyledWorkingHours>
      <Title level={1}>{t('workingHours.title')}</Title>
      {isViewDetail && (
        <StyledMain>
          <Spin
            spinning={isWorkingHourLoading}
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
          >
            <StyledCICOPanel>
              <TimePanel dataWorkingHour={dataWorkingHour} />
              <DetailWorkingDays
                dataTotalWorkingDay={dataTotalWorkingDay}
                isLoadingTotalWorkingDay={isLoadingTotalWorkingDay}
              />
            </StyledCICOPanel>
          </Spin>
          <TabsWorkingHours />
          <Outlet />
        </StyledMain>
      )}
    </StyledWorkingHours>
  );
};
const convertToTimeStamp = (date: Date) => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};
export default WorkingHours;
