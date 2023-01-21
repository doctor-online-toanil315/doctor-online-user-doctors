import { useGetFileStoreQuery } from '../../services';
import randomColor from '../../utils/randomColor';
import { StyledAvatar } from './styles';

interface CustomizedAvatarProps {
  id: string;
  image?: string;
  name: string;
  size?: string;
  round?: boolean;
}

const CustomizedAvatar = (props: CustomizedAvatarProps) => {
  const { id, image, name, size = '32', round = false } = props;
  const { data: imageData, isLoading } = useGetFileStoreQuery(
    { subPath: image },
    {
      skip: !image
    }
  );

  return (
    <div>
      {image ? (
        <StyledAvatar
          fgColor="#1b1f3b"
          color={isLoading ? '#d8ddf2' : randomColor({ id })}
          size={size}
          maxInitials={1}
          name={name}
          src={imageData}
          round={round}
          alt={name}
        />
      ) : (
        <StyledAvatar
          fgColor="#1b1f3b"
          color={isLoading ? '#d8ddf2' : randomColor({ id })}
          size={size}
          maxInitials={1}
          name={name}
          round={round}
          alt={name}
        />
      )}
    </div>
  );
};

export default CustomizedAvatar;
