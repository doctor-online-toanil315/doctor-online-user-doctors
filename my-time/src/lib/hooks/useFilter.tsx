import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
import useFormatTime from './useFormatTime';

interface ParamsDate {
  fromDate?: string;
  toDate?: string;
  createFrom?: string;
  createTo?: string;
  changeFrom?: string;
  changeTo?: string;
  wfStateId?: string;
  filterType?: string;
}

const dateFormat = 'DD.MM.YYYY';

const FilterContainer = () => {
  const date = new Date();
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<ParamsDate>({});
  const { formatDateToTimestamp } = useFormatTime();

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
      searchParams.set('filterType', 'MY_TEAM');
      setSearchParams(searchParams);
    }
  }, []);

  useEffect(() => {
    searchParams.get('dates')
      ? setParams((prev) => ({
          ...prev,
          // fromDate: moment(searchParams.get('dates')?.split('%20-%20')[0], 'DD/MM/YYYY').format(
          //   'x'
          // ),
          // toDate: moment(searchParams.get('dates')?.split('%20-%20')[1], 'DD/MM/YYYY').format('x')
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
    searchParams.get('createDates')
      ? setParams((prev) => ({
          ...prev,
          createFrom: moment(
            searchParams.get('createDates')?.split('%20-%20')[0],
            'DD/MM/YYYY'
          ).format('x'),
          createTo: moment(
            searchParams.get('createDates')?.split('%20-%20')[1],
            'DD/MM/YYYY'
          ).format('x')
        }))
      : setParams((prev) => {
          delete prev.createFrom;
          delete prev.createTo;
          return { ...prev };
        });
    searchParams.get('changeDates')
      ? setParams((prev) => ({
          ...prev,
          changeFrom: moment(
            searchParams.get('changeDates')?.split('%20-%20')[0],
            'DD/MM/YYYY'
          ).format('x'),
          changeTo: moment(
            searchParams.get('changeDates')?.split('%20-%20')[1],
            'DD/MM/YYYY'
          ).format('x')
        }))
      : setParams((prev) => {
          delete prev.changeFrom;
          delete prev.changeTo;
          return { ...prev };
        });
    searchParams.get('filterType')
      ? setParams((prev) => ({
          ...prev,
          filterType: searchParams.get('filterType') ?? ''
        }))
      : setParams((prev) => {
          delete prev.filterType;
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

export default FilterContainer;
