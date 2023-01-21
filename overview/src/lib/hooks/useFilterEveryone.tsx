import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface ParamsDate {
  year?: string;
  month?: string;
  filterType?: string;
}

const FilterEveryone = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<ParamsDate>({});

  useEffect(() => {
    if (searchParams.get('year')) {
      setSearchParams(searchParams);
    } else if (searchParams.get('month')) {
      setSearchParams(searchParams);
    } else {
      searchParams.set('year', currentYear.toString());
      searchParams.set('month', currentMonth.toString());
    }
    searchParams.set('filterType', 'MY_TEAM');
    setSearchParams(searchParams);
  }, []);

  useEffect(() => {
    searchParams.get('year')
      ? setParams((prev) => ({
          ...prev,
          year: searchParams.get('year') ?? ''
        }))
      : setParams((prev) => {
          delete prev.year;
          return { ...prev };
        });
    searchParams.get('month')
      ? setParams((prev) => ({
          ...prev,
          month: searchParams.get('month') ?? ''
        }))
      : setParams((prev) => {
          delete prev.month;
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
  }, [searchParams]);

  return { params, setParams };
};

export default FilterEveryone;
