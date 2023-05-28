import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Tooltip,
  Area,
  XAxis,
  YAxis,
} from "recharts";
import { abbreviateNumber, formatNumber } from "src/lib/utils";
import { StyledIncomeChart } from "./styled";

const data = [
  {
    month: 1,
    revenue: 100000,
  },
  {
    month: 2,
    revenue: 70000,
  },
  {
    month: 3,
    revenue: 650000,
  },
  {
    month: 4,
    revenue: 500000,
  },
  {
    month: 5,
    revenue: 120000,
  },
  {
    month: 6,
    revenue: 180000,
  },
  {
    month: 7,
    revenue: 550000,
  },
  {
    month: 8,
    revenue: 590000,
  },
  {
    month: 9,
    revenue: 700000,
  },
  {
    month: 10,
    revenue: 670000,
  },
  {
    month: 11,
    revenue: 900000,
  },
  {
    month: 12,
    revenue: 800000,
  },
];

const IncomeChart = () => {
  return (
    <StyledIncomeChart>
      <div style={{ textAlign: "center" }}>
        <p className="title">This month earnings:</p>
        <p className="number">${formatNumber(10000000)}</p>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={data}
          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Tooltip cursor={false} />
          <defs>
            <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8e86f0" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#796EFF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            animationBegin={800}
            animationDuration={2000}
            type="monotone"
            dataKey="revenue"
            stroke="#796EFF"
            fillOpacity={1}
            fill="url(#fillColor)"
            strokeWidth={3}
          />

          <XAxis tickLine={false} dataKey="month" />
          <YAxis
            tickFormatter={abbreviateNumber}
            tickLine={false}
            dataKey="revenue"
          />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </StyledIncomeChart>
  );
};

export default IncomeChart;
