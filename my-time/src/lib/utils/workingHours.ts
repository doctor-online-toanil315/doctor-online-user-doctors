import moment from 'moment';
import { i18n } from '@nexthcm/common';

export const formatDate = (date: number, format: string, utc?: boolean) => {
  return utc
    ? moment(date).locale(i18n.language).utc().format(format)
    : moment(date).locale(i18n.language).format(format);
};

export const formatDateWorkingHours = (date: number, ln: 'en' | 'vi') => {
  const dateVi = moment(date).locale(i18n.language).format('dddd[,] DD/MM/YYYY');
  return ln === 'en'
    ? moment(date).locale(i18n.language).format('dddd[,] MM/DD/YYYY')
    : dateVi.charAt(0).toUpperCase() + dateVi.slice(1);
};

export const formatTimeToTotalHours = (time: number) => {
  return time / 3600;
};

export const formatTimeToHours = (time: number) => {
  return moment(time).locale(i18n.language).format('HH:mm');
};

export const formatTimeToSeconds = (time: string) => {
  return moment(time, 'HH:mm').diff(moment().startOf('day'), 'seconds');
};

export const formatInTimeOutTime = (time: number) => {
  return moment.utc(time * 1000).format('HH:mm');
};

export const getWeeksInMonth = (year: number, month: number) => {
  const weeks: any = [],
    firstDate = new Date(year, month, 1),
    lastDate = new Date(year, month + 1, 0),
    numDays = lastDate.getDate();

  let dayOfWeekCounter = firstDate.getDay();

  for (let date = 1; date <= numDays; date++) {
    if (dayOfWeekCounter === 0 || weeks.length === 0) {
      weeks.push([]);
    }
    weeks[weeks.length - 1].push(date);
    dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
  }

  return weeks
    .filter((w) => !!w.length)
    .map((w) => ({
      start: w[0],
      end: w[w.length - 1],
      dates: w
    }));
};

export const newFromToDate = (year: number, month: number, week: number) => {
  const newYear = month === 0 ? year - 1 : year;
  const newMonth = month === 0 ? 12 : month;
  const weeks = getWeeksInMonth(newYear, newMonth);
  const newWeek = weeks[week - 1];

  const fromDate = new Date(newYear, newMonth, newWeek?.start).getTime();

  const formatToDate = moment(new Date(newYear, newMonth, newWeek?.end)).format(
    'ddd MMM D YYYY [23:59:59]'
  );
  const toDate = new Date(formatToDate).setMilliseconds(999);
  return { fromDate, toDate, weeks };
};

export const formatDateTimestamp = (date: any) => {
  const dateTimestamp = new Date(moment(date).format()).getTime();
  return dateTimestamp;
};

export const getFirstLastDay = (type: 'year' | 'month') => {
  const start = moment().startOf(type).format();
  const end = moment().endOf(type).format();
  const fromDate = formatDateTimestamp(start);
  const toDate = formatDateTimestamp(end);
  return { fromDate, toDate };
};

export const getCurrentDate = (currentMonth, currentYear) => {
  const startDate = moment([currentYear, currentMonth]).toDate().getTime();
  const endDate = moment(startDate).endOf('month').toDate().getTime();
  return [startDate, endDate];
};

export const getFirstLastDayOfYear = (year: number) => {
  const startDate = moment([year, 11]).startOf('year').toDate().getTime();
  const endDate = moment([year, 11]).endOf('year').toDate().getTime();
  return [startDate, endDate];
};

export const weekCount = (year: number, month_number: number) => {
  // Month_number is in the range 1..12
  const firstOfMonth = new Date(year, month_number - 1, 1);
  const lastOfMonth = new Date(year, month_number, 0);
  const used = firstOfMonth.getDay() + lastOfMonth.getDate();
  return Math.ceil(used / 7);
};
