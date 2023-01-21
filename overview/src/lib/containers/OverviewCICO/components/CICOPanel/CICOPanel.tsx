import React, { useState } from "react";
import { StyledCICO, StyledCICOPanel } from "./styles";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import TimePanel from "../TimePanel/TimePanel";
import CheckActions from "../CheckActions/CheckActions";
import DetailWorkingDays from "../DeatailWorkingDays/DetailWorkingDays";
import { getToken, RootState, useCommonSelector } from "@nexthcm/common";
import {
  useGetTotalWorkingDayMutation,
  useGetWorkingHoursQuery,
} from "../../../../services";

const CICOPanel = () => {
  const [showWorkingDays, setShowWorkingDays] = useState(false);
  const [
    getTotalWorkingDay,
    { data: dataTotalWorkingDay, isLoading: isLoadingTotalWorkingDay },
  ] = useGetTotalWorkingDayMutation();
  const { user } = useCommonSelector((state: RootState) => state.user);
  useCommonSelector((state: RootState) => console.log(state));
  const now = convertToTimeStamp(new Date());
  const fromDate = now - 24 * 60 * 60 * 1000;
  const toDate = now + 24 * 60 * 60 * 1000 - 1;
  const { data: dataWorkingHour, isLoading: isWorkingHourLoading } =
    useGetWorkingHoursQuery(
      { userId: user.userId, fromDate: fromDate, toDate: toDate },
      { skip: !user.userId, refetchOnMountOrArgChange: true }
    );

  return (
    <Spin
      spinning={isWorkingHourLoading}
      indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
    >
      <StyledCICOPanel>
        <div>
          <TimePanel dataWorkingHour={dataWorkingHour} />
          <StyledCICO>
            {!showWorkingDays && (
              <CheckActions
                setShowWorkingDays={setShowWorkingDays}
                getTotalWorkingDay={getTotalWorkingDay}
              />
            )}
            {showWorkingDays && (
              <DetailWorkingDays
                dataTotalWorkingDay={dataTotalWorkingDay}
                isLoadingTotalWorkingDay={isLoadingTotalWorkingDay}
              />
            )}
          </StyledCICO>
        </div>
      </StyledCICOPanel>
    </Spin>
  );
};
const convertToTimeStamp = (date: Date) => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};
export default CICOPanel;
