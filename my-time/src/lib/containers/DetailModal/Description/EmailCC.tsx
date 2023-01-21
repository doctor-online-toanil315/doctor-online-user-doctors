import { Text } from '@nexthcm/components';
import { FC } from 'react';
import { useGetFileStoreQuery } from '../../../services/FileApp';
import { getFirstLetter } from '../../../utils/name';
import { ImageEmailCC, ImageNameEmailCC, StyledEmailCC } from './styles';

interface IEmailCC {
  image?: string;
  name: string;
}

const EmailCC: FC<IEmailCC> = ({ image, name }) => {
  const { data: dataImg } = useGetFileStoreQuery(
    { subPath: image },
    {
      skip: !image
    }
  );

  return (
    <StyledEmailCC>
      {image ? (
        <ImageEmailCC src={dataImg} />
      ) : (
        <ImageNameEmailCC>{getFirstLetter(name)}</ImageNameEmailCC>
      )}

      <Text>{name}</Text>
    </StyledEmailCC>
  );
};

export default EmailCC;
