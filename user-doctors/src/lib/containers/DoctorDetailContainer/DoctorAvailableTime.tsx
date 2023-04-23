import moment, { Moment } from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  StyledCalendar,
  StyledDoctorAvailableTimeContainer,
  Title,
} from "./styled";
import { useModal } from "doctor-online-common";
import AppointmentModal from "./AppointmentModal";
import { Modal } from "doctor-online-components";
import { AppointmentType, BaseAppointmentType } from "src/lib/types";
import {
  useGetAppointmentByDoctorQuery,
  useGetMeQuery,
  useLazyGetAppointmentByDoctorQuery,
} from "src/lib/services";
import { useParams } from "react-router-dom";

const DoctorAvailableTime = () => {
  const { t } = useTranslation();
  const form = useForm();
  const { doctorId } = useParams();
  const [currentDay, setCurrentDay] = useState<number>(Date.now());
  const [appointmentInfos, setAppointmentInfos] = useState<
    Partial<BaseAppointmentType>
  >({
    startTime: "0",
    endTime: "0",
  });
  const appointmentModal = useModal();
  const [getAppointmentByDoctor, { data: occupiedTimeSlot }] =
    useLazyGetAppointmentByDoctorQuery();
  const { data: currentUserLogin } = useGetMeQuery();

  const handleCalendarChange = (value: Moment) => {
    setCurrentDay(value.valueOf());
  };

  const startDay = moment(currentDay).startOf("days").valueOf();
  const startWorkingDay = moment(startDay).add(8, "hours").valueOf();
  const endWorkingDay = moment(startDay).add(17, "hours").valueOf();
  const occupiedTimeSlotByStartTime:
    | Record<string, AppointmentType>
    | undefined = occupiedTimeSlot?.data.reduce((result, current) => {
    return {
      ...result,
      [current.startTime]: current,
    };
  }, {});

  useEffect(() => {
    getAppointmentByDoctor({
      size: 100,
      page: 1,
      doctorId: doctorId ?? "",
      from: String(startWorkingDay),
      to: String(endWorkingDay),
    });
  }, [startWorkingDay, endWorkingDay, doctorId]);

  const timeSlots = useMemo(() => {
    const minuteUnit = 1000 * 60 * 30;

    const timeSlotEvery30Minute = Array(
      (endWorkingDay - startWorkingDay) / minuteUnit
    )
      .fill(1)
      .map((timeSlot, index) => {
        return startWorkingDay + minuteUnit * index;
      });

    return timeSlotEvery30Minute;
  }, [currentDay, doctorId]);

  const handleChooseTimeSlot = (timeSlot: number) => {
    setAppointmentInfos({
      startTime: String(timeSlot),
      endTime: String(moment(timeSlot).add(30, "minutes").valueOf()),
    });

    appointmentModal.handleOpen();
  };

  return (
    <StyledDoctorAvailableTimeContainer>
      <Title>{t("availableTime")}</Title>
      <div className="content">
        <FormProvider {...form}>
          <StyledCalendar
            style={{ width: 400 }}
            fullscreen={false}
            onChange={handleCalendarChange}
            disabledDate={(date: Moment) => {
              return date.valueOf() < moment().subtract(1, "days").valueOf();
            }}
          />
        </FormProvider>
        <div className="time-slot-panel">
          <h4>{t("timeSlot")}</h4>
          <ul className="time-slots">
            {timeSlots.map((timeSlot) => {
              const isOccupied = Object.keys(
                occupiedTimeSlotByStartTime ?? {}
              )?.includes(String(timeSlot));

              const myTimeSlot =
                occupiedTimeSlotByStartTime?.[String(timeSlot)]?.user.id ===
                currentUserLogin?.data.id;

              return (
                <li
                  onClick={() => !isOccupied && handleChooseTimeSlot(timeSlot)}
                  className={`time-slot-item ${isOccupied ? "inactive" : ""} ${
                    myTimeSlot ? "my-time-slot" : ""
                  }`}
                  key={timeSlot}
                >{`${moment(timeSlot).format("LT")}`}</li>
              );
            })}
          </ul>
        </div>
      </div>
      <Modal
        bodyStyle={{ maxWidth: "80vw" }}
        open={appointmentModal.isOpen}
        destroyOnClose
        onCancel={appointmentModal.handleClose}
      >
        <AppointmentModal
          appointmentInfos={appointmentInfos}
          handleClose={appointmentModal.handleClose}
        />
      </Modal>
    </StyledDoctorAvailableTimeContainer>
  );
};

export default DoctorAvailableTime;
