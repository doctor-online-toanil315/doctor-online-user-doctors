import { useFormat } from '@nexthcm/common';
import moment from 'moment';

const useFormatTime = () => {
  const formatFromDateTime = useFormat('MM/DD/YYYY 00:00:00:000', 'DD/MM/YYYY 00:00:00:000');
  const formatToDateTime = useFormat('MM/DD/YYYY 23:59:59:999', 'DD/MM/YYYY 23:59:59:999');
  const formatDate = useFormat('MM/DD/YYYY', 'DD/MM/YYYY');

  const formatTimestampToDateTime = (date: string) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US');
    return formattedDate;
  };

  const formatTimestampToDate = (timestamp: number, langFormat: string | null) => {
    return langFormat === 'en'
      ? `${moment(timestamp).format('MM/DD/YYYY')}`
      : `${moment(timestamp).format('DD/MM/YYYY')}`;
  };

  const formatFromDateToTimestamp = (date: any) => {
    const timestamp = new Date(moment(date).format(formatFromDateTime)).getTime();
    return timestamp;
  };

  const formatToDateToTimestamp = (date: any) => {
    const timestamp = new Date(moment(date).format(formatToDateTime)).getTime();
    return timestamp;
  };

  const formatDateToTimestamp = (date: any, timeFormat: string) => {
    const convertedDate = moment(date, 'DD/MM/YYYY');
    const newDate = moment(convertedDate).format('MM/DD/YYYY');
    const formattedDate = Date.parse(`${newDate} ${timeFormat}`);

    return formattedDate;
  };

  return {
    formatTimestampToDateTime,
    formatTimestampToDate,
    formatFromDateToTimestamp,
    formatToDateToTimestamp,
    formatDateToTimestamp
  };
};

export default useFormatTime;
