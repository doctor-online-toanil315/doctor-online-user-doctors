import { NextIcon, PrevIcon, Title } from '@nexthcm/components';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { StyledContainerChangeDate } from './styles';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

const ChangeDateTable = () => {
  const { i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentDate, setCurrentDate] = useState(moment(new Date()));

  useEffect(() => {
    if (searchParams.get('year')) {
      setCurrentDate(moment(`${searchParams.get('year')}-${+searchParams.get('month')! + 1}`));
    }
  }, [searchParams]);

  const handleNext = () => {
    const nextDate = moment(currentDate).add(1, 'M');
    setCurrentDate(nextDate);
    searchParams.set('year', nextDate.year().toString());
    searchParams.set('month', nextDate.month().toString());
    setSearchParams(searchParams);
  };

  const handlePrev = () => {
    const prevDate = moment(currentDate).subtract(1, 'M');
    setCurrentDate(prevDate);
    searchParams.set('year', prevDate.year().toString());
    searchParams.set('month', prevDate.month().toString());
    setSearchParams(searchParams);
  };

  return (
    <StyledContainerChangeDate>
      <PrevIcon className="icon-change-date" onClick={handlePrev} />
      <Title
        level={4}
        style={{ pointerEvents: 'none', textTransform: 'capitalize' }}
      >{`${currentDate.format('MMMM')} ${currentDate.locale(i18n.language).format('YYYY')}`}</Title>
      <NextIcon className="icon-change-date" onClick={handleNext} />
    </StyledContainerChangeDate>
  );
};

export default ChangeDateTable;
