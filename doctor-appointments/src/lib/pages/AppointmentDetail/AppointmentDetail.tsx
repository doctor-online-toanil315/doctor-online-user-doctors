import {
  Button,
  ClockIcon,
  DatePicker,
  Input,
  LongArrowLeftIcon,
  PersonIcon,
  PhoneIcon,
  Stethoscope,
} from "doctor-online-components";
import { Col, Row } from "antd";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { theme, useFormat } from "doctor-online-common";
import { useGetAppointmentByIdQuery } from "src/lib/services";
import {
  StyledAppointmentDetail,
  StyledAppointmentForm,
  StyledWorkingHour,
} from "./styled";
import moment from "moment";
import { APPOINTMENT_STATUS } from "src/lib/constants";
import { forceChangeUrl } from "src/lib/utils";

const AppointmentDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const format = useFormat();
  const { data: appointmentById } = useGetAppointmentByIdQuery(
    appointmentId ?? "",
    {
      skip: !appointmentId,
      refetchOnMountOrArgChange: true,
    }
  );
  const form = useForm();
  const workingTimes = useMemo(() => {
    return [
      {
        id: 1,
        day: "Monday",
        startTime: "08:00 AM",
        endTime: "05:00 PM",
      },
      {
        id: 2,
        day: "Tuesday",
        startTime: "08:00 AM",
        endTime: "05:00 PM",
      },
      {
        id: 3,
        day: "Wednesday",
        startTime: "08:00 AM",
        endTime: "05:00 PM",
      },
      {
        id: 4,
        day: "Thursday",
        startTime: "08:00 AM",
        endTime: "05:00 PM",
      },
      {
        id: 5,
        day: "Friday",
        startTime: "08:00 AM",
        endTime: "05:00 PM",
      },
      {
        id: 6,
        day: "Saturday",
        startTime: "08:00 AM",
        endTime: "05:00 PM",
      },
      {
        id: 7,
        day: "Sunday",
        isClosed: true,
      },
    ];
  }, []);

  useEffect(() => {
    if (appointmentById?.data) {
      const appointment = appointmentById.data;
      form.reset({
        appointmentDate: moment(Number(appointment.startTime)),
        appointmentHour: `${moment(Number(appointment.startTime)).format(
          "LT"
        )} - ${moment(Number(appointment.endTime)).format("LT")}`,
        patientName: `${appointment.user.firstName} ${appointment.user.lastName}`,
        patientEmail: appointment.user.email,
        phoneNumber: appointment.user.phoneNumber,
        reasonForAppointment: appointment.reasonForAppointment,
      });
    }
  }, [appointmentById]);

  return (
    <StyledAppointmentDetail>
      <div onClick={() => navigate(-1)} className="back">
        <LongArrowLeftIcon /> Back
      </div>
      <div className="body">
        <div className="left">
          <h1>{t("appointmentDetail")}</h1>
          <StyledAppointmentForm>
            <FormProvider {...form}>
              <Row gutter={[30, 30]}>
                <Col span={12}>
                  <DatePicker
                    label={t("appointmentDate")}
                    name="appointmentDate"
                    format={format}
                    required
                  />
                </Col>
                <Col span={12}>
                  <Input
                    label={t("appointmentHour")}
                    name="appointmentHour"
                    suffix={<ClockIcon />}
                    required
                    readOnly
                  />
                </Col>
                <Col span={24}>
                  <Input
                    label={t("patientName")}
                    name="patientName"
                    suffix={<PersonIcon />}
                    required
                    readOnly
                  />
                </Col>
                <Col span={12}>
                  <Input
                    label={t("patientEmail")}
                    name="patientEmail"
                    required
                    readOnly
                  />
                </Col>
                <Col span={12}>
                  <Input
                    label={t("patientPhoneNumber")}
                    name="phoneNumber"
                    required
                    readOnly
                  />
                </Col>
                <Col span={24}>
                  <Input
                    type="textarea"
                    label={t("reasonForAppointment")}
                    name="reasonForAppointment"
                    required
                    readOnly
                  />
                </Col>
              </Row>
              <div className="user-ctrl">
                <Button onClick={() => navigate(-1)} border="outline">
                  Cancel
                </Button>
                {appointmentById?.data.status ===
                  APPOINTMENT_STATUS.CONFIRMED && (
                  <Button
                    onClick={() =>
                      window.open(
                        `/video-consulting?to=${appointmentById.data.user.id}&from=${appointmentById.data.doctor.user.id}`
                      )
                    }
                  >
                    Start Video Call
                  </Button>
                )}
                {appointmentById?.data.status ===
                  APPOINTMENT_STATUS.CONFIRMED && (
                  <Button
                    className="orange"
                    onClick={() => navigate("consultation")}
                  >
                    Log Consultation
                  </Button>
                )}
              </div>
            </FormProvider>
          </StyledAppointmentForm>
        </div>
        <div className="right">
          <StyledWorkingHour>
            <div className="header">
              <span className="icon">
                <Stethoscope />
              </span>
              <div>
                <h4>{t("serviceDuration")}</h4>
                <p>{t("consultationTime")}</p>
              </div>
            </div>
            <div>
              <h3>{t("consultingTimings")}</h3>
              <ul className="working-time">
                {workingTimes.map((workingTime) => {
                  return (
                    <li className="working-time-item" key={workingTime.id}>
                      <span className="bold">{workingTime.day}</span>
                      <div className="time">
                        {!workingTime.isClosed ? (
                          <>
                            <span>{workingTime.startTime}</span>
                            To
                            <span>{workingTime.endTime}</span>
                          </>
                        ) : (
                          <span className="bold">Closed</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </StyledWorkingHour>
        </div>
      </div>
    </StyledAppointmentDetail>
  );
};

export default AppointmentDetail;
