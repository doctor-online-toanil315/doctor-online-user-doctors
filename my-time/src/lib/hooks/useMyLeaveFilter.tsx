import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFormatTime from './useFormatTime';

interface Param {
  fromDate?: string;
  toDate?: string;
  wfStateId?: string;
}

const dateFormat = 'DD/MM/YYYY';

const useMyLeaveFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<Param>({});
  const { formatDateToTimestamp } = useFormatTime();
  const date = new Date();
  const firstDayFromUrl = searchParams.get('dates')?.slice(0, 10);
  const lastDayFromUrl = searchParams.get('dates')?.slice(-10);

  const firstDay = searchParams.get('dates')
    ? firstDayFromUrl
    : moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(dateFormat);
  const lastDay = searchParams.get('dates')
    ? lastDayFromUrl
    : moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format(dateFormat);

  useEffect(() => {
    if (
      (searchParams.get('dates') && searchParams.get('page') === '0') ||
      !searchParams.get('page')
    ) {
      searchParams.set('dates', encodeURI(`${firstDay} - ${lastDay}`));
      setSearchParams(searchParams);
    }
  }, []);

  useEffect(() => {
    searchParams.get('dates')
      ? setParams((prev) => ({
          ...prev,
          fromDate: String(
            formatDateToTimestamp(searchParams.get('dates')?.split('%20-%20')[0], '00:00:00:000')
          ),
          toDate: String(
            formatDateToTimestamp(searchParams.get('dates')?.split('%20-%20')[1], '23:59:59:999')
          )
        }))
      : setParams((prev) => {
          delete prev.fromDate;
          delete prev.toDate;
          return { ...prev };
        });
    searchParams.get('status')
      ? setParams((prev) => ({
          ...prev,
          wfStateId: searchParams.get('status') ?? ''
        }))
      : setParams((prev) => {
          delete prev.wfStateId;
          return { ...prev };
        });
  }, [searchParams]);

  return { params, setParams };
};

export default useMyLeaveFilter;
