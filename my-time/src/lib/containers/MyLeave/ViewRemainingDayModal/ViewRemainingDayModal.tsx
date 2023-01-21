import { RootState, useCommonSelector, useFormat } from '@nexthcm/common';
import { DateRangePicker, Text, Title } from '@nexthcm/components';
import moment, { Moment } from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetRemainingEntitlementByUserIdQuery, useGetUserByIdQuery } from '../../../services';
import { RemainingEntitlementType } from '../../../types/remainingEntitlement';
import { StyledEntitlementItem, StyledModal } from './styles';
import { LoadingOutlined } from '@ant-design/icons';
import { Popover, Spin } from 'antd';

const ViewRemainingDayModal = () => {
  const { t } = useTranslation();
  const { userId, fullName } = useCommonSelector((state: RootState) => state.user.user);
  const formatDate = useFormat();

  const [dateRange, setDateRange] = useState<{ fromDate: number; toDate: number }>({
    fromDate: moment().startOf('month').valueOf(),
    toDate: moment().endOf('month').valueOf()
  });

  const { data: user } = useGetUserByIdQuery(
    { id: userId },
    { skip: !userId, refetchOnMountOrArgChange: true }
  );

  const { data: remainingEntitlements, isFetching } = useGetRemainingEntitlementByUserIdQuery(
    {
      userId,
      fromDate: dateRange.fromDate,
      toDate: dateRange.toDate
    },
    {
      skip: !userId,
      refetchOnMountOrArgChange: true
    }
  );

  const handleOnChangeDateRange = (value: Moment[]) => {
    setDateRange({
      fromDate: value[0].valueOf(),
      toDate: value[1].valueOf()
    });
  };

  const renderLeaveEntitlement = () => {
    return remainingEntitlements?.data?.map((remainingItem: RemainingEntitlementType) => {
      return (
        <div key={remainingItem.leaveTypeId}>
          <StyledEntitlementItem>
            <Text className="leave-name">{remainingItem.leaveTypeName}</Text>
            <div className="remaining-days">
              <div>{remainingItem.remainingEntitlement}</div>
              {remainingItem.hasAvailableLeave && (
                <Popover
                  overlayInnerStyle={{ borderRadius: 10 }}
                  content={t('myTime.myLeave.availableLeave')}
                >
                  <div
                    className={`available-leave ${
                      remainingItem.availableLeave >= 0 ? 'green' : 'red'
                    }`}
                  >
                    {remainingItem.availableLeave}
                  </div>
                </Popover>
              )}
            </div>
          </StyledEntitlementItem>
        </div>
      );
    });
  };

  return (
    <StyledModal>
      <Title className="title">{t('myTime.myLeave.viewRemainingDayTitle')}</Title>
      <div className="employee-informations grid-col-3 grid-gap-30">
        <div className="information-item">
          <Title type="secondary" className="sub-title">
            {t('modal.cifNumber')}:
          </Title>
          <Text className="text">{user?.data?.cif}</Text>
        </div>
        <div className="information-item">
          <Title type="secondary" className="sub-title">
            {t('modal.name')}:
          </Title>
          <Text className="text">{fullName}</Text>
        </div>
      </div>
      <div>
        <Title type="secondary" className="sub-title">
          {t('modal.dateRange')}
        </Title>
        <DateRangePicker
          format={formatDate}
          label={t('myTime.myLeave.groupControl.placeholder.dateRange')}
          name="dateRange"
          onChange={(value) => {
            handleOnChangeDateRange(value);
          }}
          value={[moment(new Date(dateRange.fromDate)), moment(new Date(dateRange.toDate))]}
          allowClear={false}
        />
      </div>
      <div>
        <Title type="secondary" className="sub-title">
          {t('myTime.myLeave.viewRemainingDayTitle')}
        </Title>
        <Spin
          className="loading"
          spinning={isFetching}
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        >
          <div className="grid-col-3 grid-gap-y-10 grid-gap-x-30">{renderLeaveEntitlement()}</div>
        </Spin>
      </div>
    </StyledModal>
  );
};

export default ViewRemainingDayModal;
