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
import { StyledPatientChart } from "./styled";
import moment from "moment";
import { useGetPatientByMonthsMutation } from "src/lib/services";

const PatientChart = () => {
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
  const [getPatientByMonths, { data, isLoading }] =
    useGetPatientByMonthsMutation();

  useEffect(() => {
    getPatientByMonths(monthDurations);
  }, []);

  const newData = [...(data ?? [])].reverse().map((patients, index) => {
    const now = moment();
    const previousDay = now.subtract(11 - index, "months");
    return {
      patients,
      month: previousDay.format("MMM YYYY"),
    };
  });

  return (
    <StyledPatientChart>
      <div style={{ textAlign: "center" }}>
        <p className="title">Patients this month:</p>
        <p className="number">{formatNumber(data?.at(-1))}</p>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={newData}
          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Tooltip cursor={false} />
          <defs>
            <linearGradient id="patient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#f5727f" stopOpacity={0.5} />
              <stop offset="90%" stopColor="#FF5263" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            animationBegin={800}
            animationDuration={2000}
            type="monotone"
            dataKey="patients"
            stroke="#FF5263"
            fillOpacity={1}
            fill="url(#patient)"
            strokeWidth={3}
          />

          <XAxis tickLine={false} dataKey="month" />
          <YAxis
            tickFormatter={abbreviateNumber}
            tickLine={false}
            dataKey="patients"
          />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </StyledPatientChart>
  );
};

export default PatientChart;
