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
  useAddAppointmentMutation,
  useGetDoctorEventsQuery,
  useGetDoctorWorkingTimeQuery,
  useGetMeQuery,
  useLazyGetAppointmentByDoctorQuery,
} from "src/lib/services";
import { useParams, useSearchParams } from "react-router-dom";
import SuccessFullModal from "./SuccessFullModal";

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

  const occupiedTimeSlotByStartTime:
    | Record<string, AppointmentType>
    | undefined = occupiedTimeSlot?.data.reduce((result, current) => {
    return {
      ...result,
      [current.startTime]: current,
    };
  }, {});
  const { data: workingTime } = useGetDoctorWorkingTimeQuery(doctorId ?? "", {
    skip: !doctorId,
  });
  const { data: events } = useGetDoctorEventsQuery(
    {
      from: moment(Number(currentDay)).startOf("day").valueOf(),
      to: moment(Number(currentDay)).endOf("day").valueOf(),
      id: doctorId ?? "",
    },
    {
      skip: !doctorId || !currentDay,
      refetchOnMountOrArgChange: true,
    }
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const { vnp_ResponseCode, vnp_OrderInfo } = Object.fromEntries(
    searchParams.entries()
  );
  const successfullModal = useModal();
  const [addAppointment, { isLoading }] = useAddAppointmentMutation();

  const dayNumber = new Date(currentDay).getDay();
  const [startHour, startMinute] =
    (dayNumber === 0
      ? workingTime?.data.sunFrom
      : dayNumber === 1
      ? workingTime?.data.monFrom
      : dayNumber === 2
      ? workingTime?.data.tueFrom
      : dayNumber === 3
      ? workingTime?.data.wedFrom
      : dayNumber === 4
      ? workingTime?.data.thuFrom
      : dayNumber === 5
      ? workingTime?.data.friFrom
      : workingTime?.data.satFrom
    )?.split(":") ?? [];
  const [endHour, endMinute] =
    (dayNumber === 0
      ? workingTime?.data.sunTo
      : dayNumber === 1
      ? workingTime?.data.monTo
      : dayNumber === 2
      ? workingTime?.data.tueTo
      : dayNumber === 3
      ? workingTime?.data.wedTo
      : dayNumber === 4
      ? workingTime?.data.thuTo
      : dayNumber === 5
      ? workingTime?.data.friTo
      : workingTime?.data.satTo
    )?.split(":") ?? [];
  const startDay = moment(currentDay).startOf("days").valueOf();
  const startWorkingDay = moment(startDay)
    .add(Number(startHour), "hours")
    .add(Number(startMinute), "minutes")
    .valueOf();
  const endWorkingDay = moment(startDay)
    .add(Number(endHour), "hours")
    .add(Number(endMinute), "minutes")
    .valueOf();

  useEffect(() => {
    getAppointmentByDoctor({
      size: 100,
      page: 1,
      doctorId: doctorId ?? "",
      from: String(startWorkingDay),
      to: String(endWorkingDay),
    });
  }, [startWorkingDay, endWorkingDay, doctorId]);

  useEffect(() => {
    if (vnp_ResponseCode === "00" && vnp_OrderInfo) {
      addAppointment(JSON.parse(vnp_OrderInfo))
        .unwrap()
        .then(() => {
          setSearchParams(new URLSearchParams());
          successfullModal.handleOpen();
        });
    }
  }, [searchParams]);

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
  }, [currentDay, doctorId, startHour, startMinute, endHour, endMinute]);

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
              let isOccupied = Object.keys(
                occupiedTimeSlotByStartTime ?? {}
              )?.includes(String(timeSlot));

              isOccupied = timeSlot < Date.now();
              const startTimeSlot = timeSlot;
              const endTimeSlot = startTimeSlot + 1000 * 60 * 30;

              events?.data.forEach((event) => {
                const eventFrom = Number(event.from ?? 0);
                const eventTo = Number(event.to ?? 0);
                if (eventFrom <= startTimeSlot && eventTo >= endTimeSlot) {
                  isOccupied = true;
                }

                if (
                  eventFrom <= startTimeSlot &&
                  eventTo > startTimeSlot &&
                  eventTo <= endTimeSlot
                ) {
                  isOccupied = true;
                }

                if (eventFrom >= startTimeSlot && eventTo <= endTimeSlot) {
                  isOccupied = true;
                }

                if (
                  eventFrom >= startTimeSlot &&
                  eventFrom < endTimeSlot &&
                  eventTo >= endTimeSlot
                ) {
                  isOccupied = true;
                }
              });

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
      <Modal
        width={500}
        onCancel={successfullModal.handleClose}
        open={successfullModal.isOpen}
      >
        <SuccessFullModal
          handleCancel={() => {
            successfullModal.handleClose();
          }}
        />
      </Modal>
    </StyledDoctorAvailableTimeContainer>
  );
};

export default DoctorAvailableTime;
