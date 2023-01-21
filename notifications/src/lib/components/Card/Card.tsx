import React from 'react';
import { Image } from '@nexthcm/components';
import { StyledCard } from './styles';
import { useGetFileQuery } from '@nexthcm/common';
import Logo from '../../assets/logo.png';

interface Props {
  url: string;
  name: string | null;
}

const Card = ({ url, name }: Props) => {
  const { data: dataImage } = useGetFileQuery(
    { subPath: url },
    { skip: !url, refetchOnMountOrArgChange: true }
  );
  return (
    <StyledCard>
      {url && dataImage && (
        <Image
          type="circle"
          src={URL.createObjectURL(dataImage)}
          width="48px"
        />
      )}
      {(!url || !dataImage) && name && (
        <span className="text-image">
          {name[0][0]}
          {name.split(' ')[name?.split(' ').length - 1][0]}
        </span>
      )}
      {(!url || !dataImage) && !name && <Image src={Logo} width="48px" />}
    </StyledCard>
  );
};

export default Card;
