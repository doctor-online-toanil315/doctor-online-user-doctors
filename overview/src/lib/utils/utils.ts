import moment from 'moment';
import { i18n } from '@nexthcm/common';

export const formatDate = (date: number, format: string, utc?: boolean) => {
  return utc
    ? moment(date).locale(i18n.language).utc().format(format)
    : moment(date).locale(i18n.language).format(format);
};
