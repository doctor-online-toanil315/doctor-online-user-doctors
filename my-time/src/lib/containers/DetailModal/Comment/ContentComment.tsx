import { Text } from '@nexthcm/components';
import moment from 'moment';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetFileStoreQuery } from '../../../services/FileApp';
import { getFirstLetter } from '../../../utils/name';
import { AvatarItem, ImageNameItem } from '../styles';
import { InfoComment, StyledContentComment } from './styles';

interface IItemComment {
  fullName: string;
  image?: string;
  time?: string;
  comment?: string;
}
const ContentComment: FC<IItemComment> = ({ fullName, image, time, comment }) => {
  const { i18n } = useTranslation();
  const { data: dataImg } = useGetFileStoreQuery(
    { subPath: image },
    {
      skip: !image
    }
  );

  return (
    <StyledContentComment>
      <InfoComment>
        {image ? (
          <AvatarItem src={dataImg} />
        ) : (
          <ImageNameItem>{getFirstLetter(fullName)}</ImageNameItem>
        )}
        <Text style={{ lineHeight: '24px', paddingLeft: '4px' }}>
          <Text style={{ fontSize: '15px' }} color="#526ed3">
            {fullName}
          </Text>
          <Text color="#59738d"> - {moment(time).locale(i18n.language).format('lll')}</Text>
        </Text>
      </InfoComment>
      <div>{comment}</div>
    </StyledContentComment>
  );
};

export default ContentComment;
