import moment from 'moment';

export const parsedTimeStampToDate = (timeStamp: number | string) => {
  return moment(+timeStamp).format('DD/MM/YYYY');
};
