import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { StyledDetailWorkingDays, StyledContainer } from './styles';
import { useTranslation } from 'react-i18next';

interface DetailProps {
  dataTotalWorkingDay: any;
  isLoadingTotalWorkingDay: boolean;
}

const DetailWorkingDays = ({ dataTotalWorkingDay, isLoadingTotalWorkingDay }: DetailProps) => {
  const { t } = useTranslation();
  return (
    <StyledDetailWorkingDays>
      <Spin
        spinning={isLoadingTotalWorkingDay}
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        <StyledContainer>
          <div className="title">{t('yourWorkingDaysUntilToday')}</div>
          <div>
            <span className="days">{dataTotalWorkingDay?.data?.workingDay?.toFixed(1)}</span>
            <span className="total-days">/{dataTotalWorkingDay?.data?.currentTotalWorkingDay}</span>
          </div>
          <div className="footer">
            {t('totalWorkingDaysThisMonth')}:{' '}
            <strong>{dataTotalWorkingDay?.data?.totalWorkingDay}</strong>
          </div>
        </StyledContainer>
      </Spin>
    </StyledDetailWorkingDays>
  );
};

export default DetailWorkingDays;
