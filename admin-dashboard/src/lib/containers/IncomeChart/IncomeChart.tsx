import React, { useEffect } from "react";
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
import moment from "moment";
import { useGetIncomeByMonthsMutation } from "src/lib/services";

const IncomeChart = () => {
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
  const [getIncomeByMonths, { data, isLoading }] =
    useGetIncomeByMonthsMutation();

  useEffect(() => {
    getIncomeByMonths(monthDurations);
  }, []);

  const newData = [...(data ?? [])].reverse().map((income, index) => {
    const now = moment();
    const previousDay = now.subtract(11 - index, "months");
    return {
      income,
      month: previousDay.format("MMM YYYY"),
    };
  });

  return (
    <StyledIncomeChart>
      <div style={{ textAlign: "center" }}>
        <p className="title">This month earnings:</p>
        <p className="number">${formatNumber(newData.at(-1)?.income)}</p>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={newData}
          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Tooltip cursor={false} />
          <defs>
            <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8e86f0" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#796EFF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            animationBegin={800}
            animationDuration={2000}
            type="monotone"
            dataKey="income"
            stroke="#796EFF"
            fillOpacity={1}
            fill="url(#income)"
            strokeWidth={3}
          />

          <XAxis tickLine={false} dataKey="month" />
          <YAxis
            tickFormatter={abbreviateNumber}
            tickLine={false}
            dataKey="income"
          />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </StyledIncomeChart>
  );
};

export default IncomeChart;
