import React from "react";
import { useTranslation } from "react-i18next";
import { AppointmentType, BaseAppointmentType } from "src/lib/types";
import { Line, StyledAppointmentModal } from "./styled";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormat, useModal, yup } from "doctor-online-common";
import { useParams } from "react-router-dom";
import {
  useAddAppointmentMutation,
  useGetDoctorByIdQuery,
  useGetMeQuery,
} from "src/lib/services";
import { Col, Row } from "antd";
import {
  Button,
  CalendarIcon,
  ClockIcon,
  Input,
  Modal,
} from "doctor-online-components";
import moment from "moment";
import SuccessFullModal from "./SuccessFullModal";
import { FileUpload } from "../FileUpload";

interface Props {
  handleClose: () => void;
  appointmentInfos: Partial<BaseAppointmentType>;
}

const AppointmentModal = ({ handleClose, appointmentInfos }: Props) => {
  const { doctorId } = useParams();
  const { t } = useTranslation();
  const [addAppointment, { isLoading }] = useAddAppointmentMutation();
  const { data: currentUserLogin } = useGetMeQuery();
  const { data: doctorById } = useGetDoctorByIdQuery(doctorId ?? "", {
    skip: !doctorId,
    refetchOnMountOrArgChange: true,
  });
  const format = useFormat();
  const successfullModal = useModal();

  const form = useForm({
    defaultValues: {
      reasonForAppointment: "",
      attachment: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        reasonForAppointment: yup.string().required(t("common:form.required")),
      })
    ),
  });

  const onSubmit = ({ reasonForAppointment }: Partial<BaseAppointmentType>) => {
    if (doctorId) {
      addAppointment({
        ...appointmentInfos,
        doctorId,
        reasonForAppointment,
      } as any)
        .unwrap()
        .then(() => {
          successfullModal.handleOpen();
        });
    }
  };

  return (
    <StyledAppointmentModal>
      <FormProvider {...form}>
        <div className="patient-infos">
          <h2>{t("patientDetails")}</h2>
          <h3>{t("provideInformation")}</h3>
          <Row gutter={[20, 30]}>
            <Col span={24}>
              <Input
                value={
                  String(currentUserLogin?.data.firstName) +
                  String(currentUserLogin?.data.lastName)
                }
                required
                name="fullName"
                readOnly
                label={t("fullName")}
              />
            </Col>
            <Col span={24}>
              <Input
                value={currentUserLogin?.data.phoneNumber}
                required
                name="phoneNumber"
                readOnly
                label={t("phoneNumber")}
              />
            </Col>
            <Col span={24}>
              <Input
                value={currentUserLogin?.data.email}
                required
                name="email"
                readOnly
                label={t("email")}
              />
            </Col>
            <Col span={24}>
              <Input
                required
                type="textarea"
                name="reasonForAppointment"
                label={t("reasonForAppointment")}
              />
            </Col>
            <Col span={24}>
              <FileUpload
                baseUrl={process.env.API_URL ?? ""}
                label="Add Attachment (Optional)"
                value={form.getValues("attachment")}
                name="attachment"
                error={{ message: form.formState.errors.attachment?.message }}
                onChange={(value) =>
                  form.setValue("attachment", value, { shouldValidate: true })
                }
              />
            </Col>
          </Row>
        </div>
        <div className="book-summary">
          <h2>{t("bookingSummary")}</h2>
          <Line />
          <p className="time-appointment">
            <span className="date">
              <CalendarIcon />
              On
              <span className="bold">
                {moment(Number(appointmentInfos.startTime)).format(format)}
              </span>
            </span>
            <span className="time">
              <ClockIcon />
              At
              <span className="bold">
                {moment(Number(appointmentInfos.startTime)).format("LT")}
              </span>
            </span>
          </p>
          <Line />
          <div className="doctor-infos">
            <img
              src={
                doctorById?.data.avatar ??
                "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
              }
              alt="doctor avatar"
            />
            <div className="infos">
              <h3>
                Dr.{" "}
                {`${doctorById?.data.user?.firstName} ${doctorById?.data.user?.lastName}`}
              </h3>
              <p>{doctorById?.data.specializeTitle}</p>
              <p>{doctorById?.data.yearOfExperience} Years Of Experience</p>
            </div>
          </div>
          <Line />
          <div className="payment">
            <h3>{t("payment")}</h3>
            <Line />
            <div className="payment-infos">
              <div>
                <p>
                  Name:{" "}
                  {`${currentUserLogin?.data.firstName} ${currentUserLogin?.data.lastName}`}
                </p>
                <p>Card No: 1234-5678-8901</p>
                <p>Cvv: 4321</p>
              </div>
              <h3>${doctorById?.data.price}</h3>
            </div>
          </div>
        </div>
      </FormProvider>
      <div className="user-ctrl">
        <Button loading={isLoading} onClick={form.handleSubmit(onSubmit)}>
          Confirm and Pay
        </Button>
      </div>
      <Modal
        width={500}
        onCancel={successfullModal.handleClose}
        open={successfullModal.isOpen}
      >
        <SuccessFullModal
          handleCancel={() => {
            handleClose();
            successfullModal.handleClose();
          }}
        />
      </Modal>
    </StyledAppointmentModal>
  );
};

export default AppointmentModal;
