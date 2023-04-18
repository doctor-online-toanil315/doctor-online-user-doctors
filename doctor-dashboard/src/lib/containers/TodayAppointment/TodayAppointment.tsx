import React, { useEffect } from "react";
import { StyledContainer } from "../styled";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { DatePicker } from "doctor-online-components";
import { useFormat } from "doctor-online-common";
import { StyledTodayAppointment, StyledTodayAppointmentItem } from "./styles";
import moment from "moment";
import {
  useGetAppointmentByDoctorQuery,
  useGetMeQuery,
} from "src/lib/services";
import { APPOINTMENT_STATUS } from "src/lib/constants";
import { AppointmentType } from "src/lib/types";
import DoctorNotFoundImg from "src/lib/assets/doctor-not-found.png";

const TodayAppointment = () => {
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {
      today: Date.now(),
    },
  });
  const format = useFormat();
  const { data: currentUserLogin } = useGetMeQuery();
  const { data: appointments, refetch: refetchAppointments } =
    useGetAppointmentByDoctorQuery(
      {
        doctorId: currentUserLogin?.data.doctor?.id ?? "",
        page: 1,
        size: 100,
        status: APPOINTMENT_STATUS.CONFIRMED,
        from: String(moment(form.getValues("today")).startOf("day").valueOf()),
        to: String(moment(form.getValues("today")).endOf("day").valueOf()),
      },
      {
        skip: !currentUserLogin?.data.doctor?.id,
        refetchOnMountOrArgChange: true,
      }
    );

  useEffect(() => {
    refetchAppointments();
  }, [JSON.stringify(form.getValues())]);

  console.log(form.getValues());

  return (
    <StyledContainer>
      <div className="header">
        <p className="title">{t("todayAppointments")}</p>
      </div>
      <div className="content">
        <StyledTodayAppointment>
          <div className="appointments">
            {appointments?.data.length ? (
              appointments?.data.map((appointment) => {
                return (
                  <TodayAppointmentItem
                    key={appointment.id}
                    appointment={appointment}
                  />
                );
              })
            ) : (
              <div className="doctor-free">
                <img src={DoctorNotFoundImg} alt="doctor is free" />
                <p>No appointments available today.</p>
              </div>
            )}
          </div>
          <FormProvider {...form}>
            <DatePicker
              defaultValue={
                form.getValues("today")
                  ? moment(form.getValues("today"))
                  : undefined
              }
              onChange={(value) => {
                form.reset({
                  today: value?.valueOf() ?? Date.now(),
                });
              }}
              name="date"
              format={format}
              allowClear={false}
            />
          </FormProvider>
        </StyledTodayAppointment>
      </div>
    </StyledContainer>
  );
};

export interface TodayAppointmentItemProps {
  appointment: AppointmentType;
}

const TodayAppointmentItem = ({ appointment }: TodayAppointmentItemProps) => {
  return (
    <StyledTodayAppointmentItem>
      <div className="user-info">
        <img
          src={
            appointment.user.avatar ??
            "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
          }
          alt="user avatar"
        />
        <div className="information">
          <p>{`${appointment.user.firstName} ${appointment.user.lastName}`}</p>
          <span>
            {moment(Number(appointment.user.birthday)).format("DD MMMM YYYY")}
          </span>
        </div>
      </div>
      <span className="appointment-time">
        {Date.now() <= Number(appointment.endTime) &&
        Date.now() >= Number(appointment.startTime)
          ? "On going"
          : moment(Number(appointment.startTime)).format("LT")}
      </span>
    </StyledTodayAppointmentItem>
  );
};

export default TodayAppointment;
