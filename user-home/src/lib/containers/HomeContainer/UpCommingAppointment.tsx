import { Col, Row } from "antd";
import {
  ArrowRightIcon,
  Button,
  CalendarIcon,
  ClockIcon,
} from "doctor-online-components";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useGetAppointmentByUserQuery, useGetMeQuery } from "src/lib/services";
import {
  AppointmentCard,
  Title,
  TopContainer,
  TopDoctorContainer,
} from "./styled";
import { useFormat } from "doctor-online-common";
import moment from "moment";

const UpComingAppointment = () => {
  const { t } = useTranslation();
  const formatDate = useFormat();
  const { data: currentUserLogin } = useGetMeQuery();
  const now = useRef<string>(String(Date.now()));
  const { data: appointments } = useGetAppointmentByUserQuery(
    {
      userId: currentUserLogin?.data.id ?? "",
      page: 1,
      size: 1,
      from: now.current,
    },
    {
      skip: !currentUserLogin?.data.id,
      refetchOnMountOrArgChange: true,
    }
  );

  const upcomingAppointment = appointments?.data[0];

  return upcomingAppointment ? (
    <TopDoctorContainer>
      <TopContainer>
        <Title>{t("upcomingAppointment")}</Title>
      </TopContainer>
      <AppointmentCard>
        <div className="doctor-infos">
          <img
            src={
              upcomingAppointment?.doctor.user.avatar ??
              "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
            }
            alt="doctor image"
          />
          <div>
            <h4>{`Dr.${upcomingAppointment?.doctor.user.firstName} ${upcomingAppointment?.doctor.user.lastName}`}</h4>
            <p>{upcomingAppointment?.doctor.specializeTitle}</p>
          </div>
        </div>
        <p className="date-time-appointment">
          <span>
            <CalendarIcon />{" "}
            {moment(Number(upcomingAppointment?.startTime)).format(formatDate)}
          </span>
          <span>
            <ClockIcon />
            11.00 - 12:00 AM
          </span>
        </p>
        <div className="user-controls">
          <Button border="outline">View</Button>
          <Button color="white">Call</Button>
        </div>
      </AppointmentCard>
    </TopDoctorContainer>
  ) : null;
};

export default UpComingAppointment;
