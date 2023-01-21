import { StyledButtonShow } from '../../pages/MyRequest/styled';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ShowText = (record: any) => {
  const { t } = useTranslation();
  const records = record?.record;
  const [isShowMore, setIsShowMore] = useState<boolean>(true);
  if (records?.comment?.length < 240) {
    return <>{records?.comment}</>;
  } else {
    return (
      <StyledButtonShow>
        {isShowMore ? (
          <>
            {records?.comment?.slice(0, 239)}
            <button
              className="btnShow"
              onClick={() => {
                setIsShowMore(false);
              }}
            >
              {t('myTime.showMore')}
            </button>
          </>
        ) : (
          <>
            {records?.comment}
            <button
              className="btnShow"
              onClick={() => {
                setIsShowMore(true);
              }}
            >
              {t('myTime.showLess')}
            </button>
          </>
        )}
      </StyledButtonShow>
    );
  }
};

export default ShowText;
