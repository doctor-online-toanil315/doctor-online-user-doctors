import { StyledButtonShow, StyledShowTextModal } from '../../pages/MyRequest/styled';
import { useState } from 'react';

const ShowTextModal = (record: any) => {
  const [isShowMore, setIsShowMore] = useState<boolean>(true);
  if (record?.record?.comment?.length < 75) {
    return <>{record?.record?.comment}</>;
  } else {
    return (
      <StyledShowTextModal>
        {isShowMore ? (
          <>
            {record?.record?.comment?.slice(0, 75)}
            <button
              className="btnShow"
              onClick={() => {
                setIsShowMore(false);
              }}
            >
              ...Show more
            </button>
          </>
        ) : (
          <>
            {record?.record?.comment}
            <button
              className="btnShow"
              onClick={() => {
                setIsShowMore(true);
              }}
            >
              Show less
            </button>
          </>
        )}
      </StyledShowTextModal>
    );
  }
};

export default ShowTextModal;
