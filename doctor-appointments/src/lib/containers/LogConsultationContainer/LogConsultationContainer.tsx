import { Col, Row } from "antd";
import {
  Button,
  CalendarIcon,
  ClockIcon,
  HomeIcon,
  Input,
  PersonIcon,
  openNotification,
} from "doctor-online-components";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useAddConsultationMutation,
  useGetAppointmentByIdQuery,
  useUpdateConsultationMutation,
} from "src/lib/services";
import { StyledLogConsultationContainer } from "./styled";
import PrescriptionContainer from "./PrescriptionContainer";
import LabTestContainer from "./LabTestContainer";
import moment from "moment";
import { useFormat, yup } from "doctor-online-common";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

const LogConsultationContainer = () => {
  const { t } = useTranslation();
  const { appointmentId } = useParams();
  const format = useFormat();
  const { data: appointmentById } = useGetAppointmentByIdQuery(
    appointmentId ?? "",
    {
      skip: !appointmentId,
      refetchOnMountOrArgChange: true,
    }
  );
  const appointmentForm = useForm();
  const consultationForm = useForm({
    defaultValues: {
      causeOfIllness: "",
      notes: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        causeOfIllness: yup.string().required(t("common:form.required")),
        notes: yup.string().required(t("common:form.required")),
      })
    ),
  });

  useEffect(() => {
    if (appointmentById) {
      const doctor = appointmentById.data.doctor;
      const user = appointmentById.data.user;
      appointmentForm.reset({
        doctorName: `Dr.${doctor.user.firstName} ${doctor.user.lastName}`,
        consultationType: "Video Consulting",
        patientName: `${user.firstName} ${user.lastName}`,
        location: `${user.address}`,
        startTime: moment(Number(appointmentById.data.startTime)).format("LT"),
        dateOfConsultation: moment(
          Number(appointmentById.data.startTime)
        ).format(format),
        reasonForAppointment: appointmentById.data.reasonForAppointment,
      });

      if (appointmentById.data.consultion) {
        const consultation = appointmentById.data.consultion;
        consultationForm.reset({
          causeOfIllness: consultation.causeOfIllness,
          notes: consultation.notes,
        });
      }
    }
  }, [appointmentById]);
  const [addConsultation, { isLoading: addConsultationLoading }] =
    useAddConsultationMutation();

  const [updateConsultation, { isLoading: updateConsultationLoading }] =
    useUpdateConsultationMutation();

  const onSubmit = ({
    causeOfIllness,
    notes,
  }: {
    causeOfIllness: string;
    notes: string;
  }) => {
    if (!appointmentById?.data.consultion) {
      addConsultation({
        appointmentId: appointmentId ?? "",
        causeOfIllness,
        notes,
      })
        .unwrap()
        .then((value) => {
          openNotification({
            type: "success",
            message: t("addConsultationSuccess"),
          });
        });
    } else {
      updateConsultation({
        consultionId: appointmentById.data.consultion.id,
        causeOfIllness,
        notes,
      })
        .unwrap()
        .then((value) => {
          openNotification({
            type: "success",
            message: t("updateConsultationSuccess"),
          });
        });
    }
  };

  return (
    <StyledLogConsultationContainer>
      <h1>Log New Consultation</h1>
      <div className="consultation-container">
        <div className="left">
          <div className="container">
            <h2>Appointment Information:</h2>
            <FormProvider {...appointmentForm}>
              <Row gutter={[30, 30]}>
                <Col span={12}>
                  <Input
                    name="doctorName"
                    label="Healthcare Provider"
                    readOnly
                    suffix={<PersonIcon />}
                  />
                </Col>
                <Col span={12}>
                  <Input
                    name="consultationType"
                    label="Consultation Type"
                    readOnly
                  />
                </Col>
                <Col span={12}>
                  <Input
                    name="patientName"
                    label="Patient Name"
                    readOnly
                    suffix={<PersonIcon />}
                  />
                </Col>
                <Col span={12}>
                  <Input
                    name="location"
                    label="Location"
                    readOnly
                    suffix={<HomeIcon />}
                  />
                </Col>
                <Col span={12}>
                  <Input
                    name="startTime"
                    label="Start Time"
                    readOnly
                    suffix={<ClockIcon />}
                  />
                </Col>
                <Col span={12}>
                  <Input
                    name="dateOfConsultation"
                    label="Date of Consultation"
                    readOnly
                    suffix={<CalendarIcon />}
                  />
                </Col>
                <Col span={24}>
                  <Input
                    type="textarea"
                    name="reasonForAppointment"
                    label="Reason For Appointment"
                    readOnly
                  />
                </Col>
              </Row>
            </FormProvider>
          </div>
          <div className="container">
            <h2>Doctor Consultation:</h2>
            <FormProvider {...consultationForm}>
              <Row gutter={[30, 30]}>
                <Col span={24}>
                  <Input
                    placeholder="Enter cause of illness..."
                    type="textarea"
                    name="causeOfIllness"
                    label="Cause of Illness"
                    required
                  />
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="Enter notes..."
                    type="textarea"
                    name="notes"
                    label="Notes"
                    required
                  />
                </Col>
                <Col span={24}>
                  <div className="user-ctrl">
                    <Button
                      loading={
                        addConsultationLoading || updateConsultationLoading
                      }
                      onClick={consultationForm.handleSubmit(onSubmit)}
                    >
                      {appointmentById?.data.consultion ? "Update" : "Save"}
                    </Button>
                  </div>
                </Col>
              </Row>
            </FormProvider>
          </div>
        </div>
        <div className="right container patient-information">
          <img
            src={
              appointmentById?.data.user.avatar ??
              "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
            }
            alt="user avatar"
          />
          <p className="patient-name">{`${appointmentById?.data.user.firstName} ${appointmentById?.data.user.lastName}`}</p>
          <span className="age-and-gender">{`${moment().diff(
            Number(appointmentById?.data.user.birthday),
            "years",
            false
          )} Years, ${appointmentById?.data.user.gender}`}</span>
          <div className="line"></div>
          <div className="information-group">
            <label>Email</label>
            <p>{appointmentById?.data.user.email}</p>
          </div>
          <div className="information-group">
            <label>Phone</label>
            <p>{appointmentById?.data.user.phoneNumber}</p>
          </div>
          <div className="information-group">
            <label>Date of Birth</label>
            <p>
              {moment(Number(appointmentById?.data.user.birthday)).format(
                format
              )}
            </p>
          </div>
          <div className="line"></div>
          <div className="patient-status">
            <div className="status-item red">
              <p>Blood Pressure</p>
              <span>141/90 mmhg</span>
            </div>
            <div className="status-item purple">
              <p>Body Temperature</p>
              <span>33°C</span>
            </div>
            <div className="status-item blue">
              <p>Body Weight</p>
              <span>78kg</span>
            </div>
            <div className="status-item orange">
              <p>Body Height</p>
              <span>1.75m</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <PrescriptionContainer />
      </div>
      <div className="container">
        <LabTestContainer />
      </div>
    </StyledLogConsultationContainer>
  );
};

export default LogConsultationContainer;
