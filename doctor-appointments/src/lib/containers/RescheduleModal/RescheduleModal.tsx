import {
  Button,
  ClockIcon,
  DatePicker,
  Input,
  openNotification,
} from "doctor-online-components";
import { useFormat, useModal } from "doctor-online-common";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyledModal } from "./styled";
import moment, { Moment } from "moment";
import { AppointmentType, UpdateAppointmentStatus } from "src/lib/types";
import {
  useGetMeQuery,
  useLazyGetAppointmentByDoctorQuery,
  useUpdateAppointmentMutation,
} from "src/lib/services";

interface Props {
  modal: ReturnType<typeof useModal>;
  appointment: AppointmentType | null;
}

interface FormProps {
  startTime: number;
  endTime: number;
}

const RescheduleModal = ({ modal, appointment }: Props) => {
  const { t } = useTranslation();
  const [showTimeSlots, setShowTimeShot] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<number>(
    Number(appointment?.startTime)
  );
  const format = useFormat();
  const form = useForm({
    defaultValues: {
      startTime: Number(appointment?.startTime),
      endTime: Number(appointment?.endTime),
    },
  });
  const { data: currentUserLogin } = useGetMeQuery();
  const [getAppointmentByDoctor, { data: occupiedTimeSlot }] =
    useLazyGetAppointmentByDoctorQuery();
  const [updateAppointment] = useUpdateAppointmentMutation();
  const startDay = moment(Number(selectedDate)).startOf("days").valueOf();
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
  }, [selectedDate]);

  useEffect(() => {
    if (currentUserLogin?.data.doctor?.id) {
      getAppointmentByDoctor({
        size: 100,
        page: 1,
        doctorId: currentUserLogin?.data.doctor?.id,
        from: String(startWorkingDay),
        to: String(endWorkingDay),
      });
    }
  }, [startWorkingDay, endWorkingDay, currentUserLogin?.data.doctor?.id]);

  const handleCalendarChange = (value: Moment | null) => {
    setSelectedDate(value ? value.valueOf() : Date.now());
    setShowTimeShot(true);
  };

  const handleChooseTimeSlot = (timeSlot: number) => {
    form.setValue("startTime", timeSlot);
    form.setValue("endTime", moment(timeSlot).add(30, "minutes").valueOf());
    setShowTimeShot(false);
  };

  const onSubmit = (data: FormProps) => {
    updateAppointment({
      ...appointment,
      startTime: String(data.startTime),
      endTime: String(data.endTime),
    } as UpdateAppointmentStatus)
      .unwrap()
      .then((value) => {
        modal.handleClose();
        openNotification({
          type: "success",
          message: t("rescheduleSuccess"),
        });
      });
  };

  return (
    <StyledModal>
      <div className="header">
        <h2>{t("rescheduleAppointment")}</h2>
      </div>
      <div className="body">
        <FormProvider {...form}>
          <Input
            label={t("consultingType")}
            name="type"
            value={t("videoConsulting")}
            readOnly
          />
          <DatePicker
            label={t("selectTime")}
            allowClear={false}
            name="date"
            value={moment(selectedDate)}
            format={format}
            onChange={handleCalendarChange}
            disabledDate={(date: Moment) => {
              return date.valueOf() < moment().subtract(1, "days").valueOf();
            }}
          />
          {showTimeSlots && (
            <ul className="time-slots">
              <h3>{t("timeSlots")}:</h3>
              {timeSlots.map((timeSlot) => {
                const isOccupied = Object.keys(
                  occupiedTimeSlotByStartTime ?? {}
                )?.includes(String(timeSlot));

                const myTimeSlot =
                  occupiedTimeSlotByStartTime?.[String(timeSlot)]?.user.id ===
                  currentUserLogin?.data.id;

                return (
                  <li
                    onClick={() =>
                      !isOccupied && handleChooseTimeSlot(timeSlot)
                    }
                    className={`time-slot-item ${
                      isOccupied ? "inactive" : ""
                    } ${myTimeSlot ? "my-time-slot" : ""}`}
                    key={timeSlot}
                  >{`${moment(timeSlot).format("LT")}`}</li>
                );
              })}
            </ul>
          )}
          <div className="appointment-time">
            <div className="time start-time">
              <ClockIcon />
              {moment(Number(form.getValues("startTime"))).format("LT")}
            </div>
            <div className="time end-time">
              <ClockIcon />
              {moment(Number(form.getValues("endTime"))).format("LT")}
            </div>
          </div>
          <div className="user-ctrl">
            <Button border="outline" onClick={modal.handleClose}>
              Cancel
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)}>Confirm</Button>
          </div>
        </FormProvider>
      </div>
    </StyledModal>
  );
};

export default RescheduleModal;
