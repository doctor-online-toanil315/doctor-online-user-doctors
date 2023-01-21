import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';

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

const FilterContainer = () => {
  const date = new Date();
  const firstDay = moment(new Date(date.getFullYear(), date.getMonth(), 1)).format('DD/MM/YYYY');
  const lastDay = moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format('DD/MM/YYYY');
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<ParamsDate>({});

  useEffect(() => {
    if (searchParams.get('dates')) {
      setSearchParams(searchParams);
    } else {
      searchParams.set('dates', encodeURI(`${firstDay} - ${lastDay}`));
    }
    searchParams.set('filterType', 'MY_TEAM');
    setSearchParams(searchParams);
  }, []);

  useEffect(() => {
    searchParams.get('dates')
      ? setParams((prev) => ({
          ...prev,
          fromDate: moment(searchParams.get('dates')?.split('%20-%20')[0], 'DD/MM/YYYY').format(
            'x'
          ),
          toDate: moment(searchParams.get('dates')?.split('%20-%20')[1], 'DD/MM/YYYY').format('x')
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
