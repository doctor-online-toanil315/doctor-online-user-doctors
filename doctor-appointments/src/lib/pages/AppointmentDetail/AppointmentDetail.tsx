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
import {
  useGetAppointmentByIdQuery,
  useGetDoctorWorkingTimeQuery,
  useGetMeQuery,
} from "src/lib/services";
import {
  StyledAppointmentDetail,
  StyledAppointmentForm,
  StyledWorkingHour,
} from "./styled";
import moment from "moment";
import { APPOINTMENT_STATUS } from "src/lib/constants";
import { forceChangeUrl } from "src/lib/utils";
import { FileUpload } from "src/lib/containers/FileUpload";

const AppointmentDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const format = useFormat();
  const { data: currentUserLogin } = useGetMeQuery();
  const { data: appointmentById } = useGetAppointmentByIdQuery(
    appointmentId ?? "",
    {
      skip: !appointmentId,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: workingTime } = useGetDoctorWorkingTimeQuery(
    currentUserLogin?.data.doctor?.id ?? "",
    {
      skip: !currentUserLogin?.data.doctor?.id,
      refetchOnMountOrArgChange: true,
    }
  );
  const form = useForm();
  const workingTimes = useMemo(() => {
    return [
      {
        id: 1,
        day: "Monday",
        startTime: workingTime?.data.monFrom,
        endTime: workingTime?.data.monTo,
        isClosed: !workingTime?.data.isMonOpen,
      },
      {
        id: 2,
        day: "Tuesday",
        startTime: workingTime?.data.tueFrom,
        endTime: workingTime?.data.tueTo,
        isClosed: !workingTime?.data.isTueOpen,
      },
      {
        id: 3,
        day: "Wednesday",
        startTime: workingTime?.data.wedFrom,
        endTime: workingTime?.data.wedTo,
        isClosed: !workingTime?.data.isWedOpen,
      },
      {
        id: 4,
        day: "Thursday",
        startTime: workingTime?.data.thuFrom,
        endTime: workingTime?.data.thuTo,
        isClosed: !workingTime?.data.isThuOpen,
      },
      {
        id: 5,
        day: "Friday",
        startTime: workingTime?.data.friFrom,
        endTime: workingTime?.data.friTo,
        isClosed: !workingTime?.data.isFriOpen,
      },
      {
        id: 6,
        day: "Saturday",
        startTime: workingTime?.data.satFrom,
        endTime: workingTime?.data.satTo,
        isClosed: !workingTime?.data.isSatOpen,
      },
      {
        id: 7,
        day: "Sunday",
        startTime: workingTime?.data.sunFrom,
        endTime: workingTime?.data.sunTo,
        isClosed: !workingTime?.data.isSunOpen,
      },
    ];
  }, [workingTime]);

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
        attachment: appointment.attachment,
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
          <div className="title">
            <h1>{t("appointmentDetail")}</h1>
            <Link to={`history/${appointmentById?.data.user.id}`}>
              View patient history
            </Link>
          </div>
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
                <Col span={24}>
                  <FileUpload
                    baseUrl={process.env.API_URL ?? ""}
                    label="Attachment (Optional)"
                    value={form.getValues("attachment")}
                    name="attachment"
                    readonly
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
