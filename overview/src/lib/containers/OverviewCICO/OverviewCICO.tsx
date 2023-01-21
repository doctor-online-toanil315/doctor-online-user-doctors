import React from 'react';
import { StyledOverviewCICO, StyledHead } from './styles';
import { useTranslation } from 'react-i18next';
import { RootState, useCommonSelector } from '@nexthcm/common';
import { useGetEmployeeQuery } from '../../services';
import { CICOPanel } from './components/CICOPanel';
import HiLogo from '../../assets/hi.png';

const OverviewCICO = () => {
  const { t } = useTranslation();
  const { user } = useCommonSelector((state: RootState) => state.user);
  return (
    <StyledOverviewCICO>
      <StyledHead>
        <p>{t(getWish())},</p>
        <p>
          {t('welcomeBack')}, <span>{user?.fullName}</span>
          <img src={HiLogo} alt="" />
        </p>
      </StyledHead>
      <CICOPanel />
    </StyledOverviewCICO>
  );
};
const getWish = () => {
  const day = new Date();
  const hr = day.getHours();
  if (hr >= 5 && hr < 12) {
    return 'goodMorning';
  } else if (hr >= 12 && hr < 17) {
    return 'goodAfternoon';
  } else if (hr >= 17 && hr < 22) {
    return 'goodEvening';
  } else {
    return 'goodNight';
  }
};
export default OverviewCICO;
