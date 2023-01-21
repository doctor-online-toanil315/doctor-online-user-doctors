import React from 'react';
import {
  StyledBoxShadow,
  StyledFirstGrid,
  StyledSecondGrid,
  StyledTimeIn,
  StyledTimeOut,
  StyledTimePanel,
  StyledWorkingTimeToday
} from './styles';
import FingerLogo from '../../../../assets/finger-white.png';
import { formatDate } from '../../../../utils/utils';
import { useTranslation } from 'react-i18next';

interface DetailProps {
  dataWorkingHour: any;
}

const TimePanel = ({ dataWorkingHour }: DetailProps) => {
  const { t } = useTranslation();
  return (
    <StyledTimePanel>
      <StyledFirstGrid>
        <img src={FingerLogo} alt="" />
        <StyledWorkingTimeToday>
          <div>{t('workedTimeToday')}</div>
          <div>
            {dataWorkingHour?.data?.items.length > 0 &&
            dataWorkingHour?.data?.items[0].totalWorkingTime
              ? formatDate(dataWorkingHour?.data?.items[0].totalWorkingTime * 1000, 'HH:mm', true)
              : '-:-'}
          </div>
        </StyledWorkingTimeToday>
      </StyledFirstGrid>

      <StyledSecondGrid>
        <StyledTimeIn>
          <div>{t('timeIn')}</div>
          <div>
            {dataWorkingHour?.data?.items.length > 0 && dataWorkingHour?.data?.items[0].inTime
              ? formatDate(dataWorkingHour?.data?.items[0].inTime * 1000, 'HH:mm', true)
              : '-:-'}
          </div>
        </StyledTimeIn>
        <StyledTimeOut>
          <div>{t('timeOut')}</div>
          <div>
            {dataWorkingHour?.data?.items.length > 0 && dataWorkingHour?.data?.items[0].outTime
              ? formatDate(dataWorkingHour?.data?.items[0].outTime * 1000, 'HH:mm', true)
              : '-:-'}
          </div>
        </StyledTimeOut>
      </StyledSecondGrid>
      <StyledBoxShadow></StyledBoxShadow>
    </StyledTimePanel>
  );
};

export default TimePanel;
