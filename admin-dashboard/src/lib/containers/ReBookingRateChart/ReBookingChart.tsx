import React from "react";
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

const data = [
  {
    month: 1,
    value: 100,
  },
  {
    month: 2,
    value: 100,
  },
  {
    month: 3,
    value: 80,
  },
  {
    month: 4,
    value: 78,
  },
  {
    month: 5,
    value: 66,
  },
  {
    month: 6,
    value: 50,
  },
  {
    month: 7,
    value: 30,
  },
  {
    month: 8,
    value: 23,
  },
  {
    month: 9,
    value: 100,
  },
  {
    month: 10,
    value: 80,
  },
  {
    month: 11,
    value: 75,
  },
  {
    month: 12,
    value: 35,
  },
];

const ReBookingChart = () => {
  return (
    <StyledReBookingChart>
      <div className="header">
        <p className="title">Re-Booking Rate</p>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }} data={data}>
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
