import Avatar from 'react-avatar';
import { useGetFileStoreQuery } from '../../../../services';

interface MyLeaveAvatarProps {
  image?: string;
  name: string;
  size?: string;
}

const MyLeaveAvatar = (props: MyLeaveAvatarProps) => {
  const { image, name, size = '32' } = props;

  const { data: imageData } = useGetFileStoreQuery(
    { subPath: image },
    {
      skip: !image
    }
  );

  return (
    <div>
      {image ? (
        <Avatar
          fgColor="#1b1f3b"
          color="#d8ddf2"
          size={size}
          maxInitials={1}
          name={name}
          src={imageData}
          round={true}
          alt={name}
        />
      ) : (
        <Avatar
          fgColor="#1b1f3b"
          color="#d8ddf2"
          size={size}
          maxInitials={1}
          name={name}
          round={true}
          alt={name}
        />
      )}
    </div>
  );
};

export default MyLeaveAvatar;
