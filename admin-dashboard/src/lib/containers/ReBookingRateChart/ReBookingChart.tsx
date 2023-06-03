import React, { useEffect } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { abbreviateNumber } from "src/lib/utils";
import { StyledContainer } from "../PatientOverview/styled";
import { StyledReBookingChart } from "./styled";
import moment from "moment";
import { useGetReBookingRateByMonthsMutation } from "src/lib/services";

const ReBookingChart = () => {
  const monthDurations = Array(12)
    .fill(1)
    .map((_, index) => {
      const currentDay = moment();
      const previousDay = currentDay.subtract(index, "months");
      const previousMonth = [
        previousDay.startOf("month").valueOf(),
        previousDay.endOf("month").valueOf(),
      ];
      return previousMonth;
    });
  const [getReBookingRate, { data, isLoading }] =
    useGetReBookingRateByMonthsMutation();

  useEffect(() => {
    getReBookingRate(monthDurations);
  }, []);

  const newData = [...(data ?? [])].reverse().map((value, index) => {
    const now = moment();
    const previousDay = now.subtract(11 - index, "months");
    return {
      value: value * 100,
      month: previousDay.format("MMM YY"),
    };
  });

  return (
    <StyledReBookingChart>
      <div className="header">
        <p className="title">Re-Booking Rate</p>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          data={newData}
        >
          <Bar dataKey="value" fill="#23A9F9" />
          <XAxis tickLine={false} dataKey="month" />
          <YAxis tickLine={false} dataKey="value" />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </StyledReBookingChart>
  );
};

export default ReBookingChart;
