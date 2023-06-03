import React, { useEffect } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DoctorType } from "src/lib/types/DoctorType";
import { StyledExpandDoctor } from "./styled";
import { theme } from "doctor-online-common";
import moment from "moment";
import { useGetPatientsOfDoctorByMonthsMutation } from "src/lib/services";

interface Props {
  record: DoctorType;
}

const PublishCourseDetail = ({ record }: Props) => {
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
  const [getPatients, { data, isLoading }] =
    useGetPatientsOfDoctorByMonthsMutation();

  useEffect(() => {
    getPatients({
      months: monthDurations,
      doctorId: record.doctorId,
    });
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
    <StyledExpandDoctor>
      <div className="header">
        <h3>Total Patients</h3>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          height={250}
          data={newData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis tickLine={false} dataKey="month" />
          <YAxis tickLine={false} dataKey="patients" />
          <Tooltip />
          <Line
            dataKey="patients"
            stroke={theme.strongBlue}
            strokeWidth={2}
            dot={{
              stroke: theme.strongBlue,
              strokeWidth: 5,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </StyledExpandDoctor>
  );
};

export default PublishCourseDetail;
