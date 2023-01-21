import { Text } from '@nexthcm/components';
import moment from 'moment';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetFileStoreQuery } from '../../../services/FileApp';
import { getFirstLetter } from '../../../utils/name';
import { AvatarItem, ImageNameItem } from '../styles';
import { StyledItemHistory } from './styles';

interface IItemHistory {
  avatar?: string;
  fullName: string;
  time?: number;
  from?: string;
  to?: any;
  type?: string;
}

const ItemHistory: FC<IItemHistory> = ({ avatar, fullName, time, from, to, type }) => {
  const { t, i18n } = useTranslation();

  const { data: dataImg } = useGetFileStoreQuery(
    { subPath: avatar },
    {
      skip: !avatar
    }
  );

  return (
    <StyledItemHistory>
      {avatar ? (
        <AvatarItem src={dataImg} />
      ) : (
        <ImageNameItem>{getFirstLetter(fullName)}</ImageNameItem>
      )}
      <Text style={{ lineHeight: '24px', paddingLeft: '4px' }}>
        <Text style={{ fontSize: '15px' }} color="#526ed3">
          {fullName}
        </Text>
        <Text>
          {' '}
          {type === 'Change Status'
            ? !from
              ? t('submitRequest')
              : t('changeRequest')
            : t('changeEscalation')}
          {' - '}
        </Text>

        {type === 'Change Status' ? (
          <Text strong> {!!from && to} </Text>
        ) : (
          <Text style={{ fontSize: '15px' }} color="#526ed3">
            {to?.fullName}
          </Text>
        )}
        <Text color="#59738d"> {moment(time).locale(i18n.language).format('lll')}</Text>
      </Text>
    </StyledItemHistory>
  );
};

export default ItemHistory;
