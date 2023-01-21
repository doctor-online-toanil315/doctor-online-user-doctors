import { useEffect } from 'react';
import { useGetHistoryQuery } from '../../../../../services';
import { MyLeaveHistoryItem } from '../MyLeaveHistoryItem';

interface MyLeaveHistoryProps {
  id?: string;
  type?: number;
}

const MyLeaveHistoryList = (props: MyLeaveHistoryProps) => {
  const { id, type } = props;

  const { data: historyData } = useGetHistoryQuery({ objectId: id, type }, { skip: !id });

  return (
    <div>
      {historyData?.data?.map((item, index) => (
        <MyLeaveHistoryItem
          key={index}
          avatar={item?.author?.avatar}
          fullName={item?.author?.fullName}
          time={item?.time}
          from={item?.from}
          to={item?.to}
          type={item?.type}
        />
      ))}
    </div>
  );
};

export default MyLeaveHistoryList;
