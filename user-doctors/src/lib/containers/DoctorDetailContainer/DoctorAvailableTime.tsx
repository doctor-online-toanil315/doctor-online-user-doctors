import { Calendar, DatePicker } from "antd";
import moment, { Moment } from "moment";
import React, { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  StyledCalendar,
  StyledDoctorAvailableTimeContainer,
  Title,
} from "./styled";

const DoctorAvailableTime = () => {
  const { t } = useTranslation();
  const form = useForm();
  const [currentDay, setCurrentDay] = useState<number>(Date.now());

  const handleCalendarChange = (value: Moment) => {
    setCurrentDay(value.valueOf());
  };

  const timeSlots = useMemo(() => {
    const startDay = moment(currentDay).startOf("days").valueOf();
    const startWorkingDay = moment(startDay).add(8, "hours").valueOf();
    const endWorkingDay = moment(startDay).add(17, "hours").valueOf();
    const minuteUnit = 1000 * 60 * 30;
    const timeSlotEvery30Minute = Array(
      (endWorkingDay - startWorkingDay) / minuteUnit
    )
      .fill(1)
      .map((timeSlot, index) => {
        return startWorkingDay + minuteUnit * index;
      });

    return timeSlotEvery30Minute;
  }, [currentDay]);

  console.log(timeSlots.map((timeSlot) => new Date(timeSlot)));

  return (
    <StyledDoctorAvailableTimeContainer>
      <Title>{t("availableTime")}</Title>
      <div className="content">
        <FormProvider {...form}>
          <StyledCalendar
            style={{ width: 350 }}
            fullscreen={false}
            onChange={handleCalendarChange}
          />
        </FormProvider>
        <div className="time-slot-panel">
          <h4>{t("timeSlot")}</h4>
          <ul className="time-slots">
            {timeSlots.map((timeSlot) => {
              return (
                <li className="time-slot-item" key={timeSlot}>{`${moment(
                  timeSlot
                ).format("LT")}`}</li>
              );
            })}
          </ul>
        </div>
      </div>
    </StyledDoctorAvailableTimeContainer>
  );
};

export default DoctorAvailableTime;
