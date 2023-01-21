import { FC } from 'react';
import { useGetHistoryQuery } from '../../../services/MyTimeApp';
import ItemHistory from './ItemHistory';

interface IHistory {
  id?: string;
  type?: number;
}

const History: FC<IHistory> = ({ id, type }) => {
  const { data } = useGetHistoryQuery({ objectId: id, type }, { skip: !id });

  return (
    <>
      {data?.data?.map((item, index) => (
        <ItemHistory
          key={index}
          avatar={item?.author?.avatar}
          fullName={item?.author?.fullName}
          time={item?.time}
          from={item?.from}
          to={item?.to}
          type={item?.type}
        />
      ))}
    </>
  );
};

export default History;
