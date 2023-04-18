import React, { useRef, useState } from "react";
import {
  StyledAppointmentRequest,
  StyledAppointmentRequestItem,
  StyledUpdateStatusAppointmentModal,
} from "./styled";
import { StyledContainer } from "../styled";
import { useTranslation } from "react-i18next";
import {
  ArrowRightIcon,
  Button,
  CheckIcon,
  CloseIcon,
  DangerIcon,
  Modal,
  OptionType,
  Select,
  Tooltip,
} from "doctor-online-components";
import {
  useGetAppointmentByDoctorQuery,
  useGetMeQuery,
  useUpdateAppointmentMutation,
} from "src/lib/services";
import {
  APPOINTMENT_STATUS,
  ReasonDeclinedOptionEnum,
} from "src/lib/constants";
import { AppointmentType } from "src/lib/types";
import moment from "moment";
import { useModal, yup } from "doctor-online-common";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const AppointmentRequest = () => {
  const { t } = useTranslation();
  const { data: currentUserLogin } = useGetMeQuery();
  const now = useRef(Date.now());
  const { data: appointments } = useGetAppointmentByDoctorQuery(
    {
      doctorId: currentUserLogin?.data.doctor?.id ?? "",
      page: 1,
      size: 7,
      from: String(now.current),
    },
    { skip: !currentUserLogin?.data.doctor?.id }
  );

  return (
    <StyledContainer>
      <div className="header">
        <h3 className="title">{t("appointmentRequest")}</h3>
        <div className="suffix-section">
          <span className="view-all">
            {t("viewAll")} <ArrowRightIcon />
          </span>
        </div>
      </div>
      <div className="content">
        <StyledAppointmentRequest>
          {appointments?.data.map((appointment) => {
            return (
              <AppointmentRequestItem
                key={appointment.id}
                appointment={appointment}
              />
            );
          })}
        </StyledAppointmentRequest>
      </div>
    </StyledContainer>
  );
};

interface AppointmentRequestItemProps {
  appointment: AppointmentType;
}

const AppointmentRequestItem = ({
  appointment,
}: AppointmentRequestItemProps) => {
  const { t } = useTranslation();
  const [typeOfModal, setTypeOfModal] = useState<APPOINTMENT_STATUS>(
    APPOINTMENT_STATUS.CONFIRMED
  );
  const modal = useModal();
  const form = useForm({
    defaultValues: {
      reasonDeclined: "",
    },
    resolver:
      typeOfModal === APPOINTMENT_STATUS.DECLINED
        ? yupResolver(
            yup.object().shape({
              reasonDeclined: yup.string().required(t("common:form.required")),
            })
          )
        : undefined,
  });
  const [updateAppointmentStatus, { isLoading }] =
    useUpdateAppointmentMutation();

  const appointmentDate = `${moment(Number(appointment.startTime)).format(
    `DD MMMM YYYY HH:mm`
  )}`;

  const reasonDeclinedOptions: OptionType[] = [
    {
      key: ReasonDeclinedOptionEnum.DOCTOR_NOT_AVAILABLE,
      value: ReasonDeclinedOptionEnum.DOCTOR_NOT_AVAILABLE,
      label: ReasonDeclinedOptionEnum.DOCTOR_NOT_AVAILABLE,
      render: () => ReasonDeclinedOptionEnum.DOCTOR_NOT_AVAILABLE,
    },
  ];

  const onSubmit = ({ reasonDeclined }: { reasonDeclined: string }) => {
    updateAppointmentStatus({
      id: appointment.id,
      reasonDeclined: reasonDeclined ?? "",
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      reasonForAppointment: appointment.reasonForAppointment,
      status: typeOfModal,
    });
  };

  return (
    <StyledAppointmentRequestItem>
      <div className="user-request">
        <img
          src={
            appointment.user.avatar ??
            "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
          }
          alt="user avatar"
        />
        <div className="user-infos">
          <p>{`${appointment.user.firstName} ${appointment.user.lastName}`}</p>
          <span>
            {`${moment().diff(
              Number(appointment.user.birthday),
              "years",
              false
            )} ${appointment.user.gender ?? ""}, ${appointmentDate}`}
          </span>
        </div>
      </div>
      {appointment.status === APPOINTMENT_STATUS.WAITING ? (
        <div className="user-ctrl">
          <Tooltip title="Accept">
            <div
              className="action purple"
              onClick={() => {
                setTypeOfModal(APPOINTMENT_STATUS.CONFIRMED);
                modal.handleOpen();
              }}
            >
              <CheckIcon />
            </div>
          </Tooltip>
          <Tooltip title="Decline">
            <div
              className="action red"
              onClick={() => {
                setTypeOfModal(APPOINTMENT_STATUS.DECLINED);
                modal.handleOpen();
              }}
            >
              <CloseIcon />
            </div>
          </Tooltip>
        </div>
      ) : (
        <span
          className={`appointment-status ${appointment.status.toLowerCase()}`}
        >
          {appointment.status}
        </span>
      )}

      <Modal
        title={t("areUSure")}
        width={420}
        open={modal.isOpen}
        onCancel={modal.handleClose}
      >
        <StyledUpdateStatusAppointmentModal>
          <div className="danger">
            <DangerIcon />
            <p>
              {typeOfModal === APPOINTMENT_STATUS.CONFIRMED
                ? t("confirm")
                : t("cancel")}
            </p>
          </div>
          {typeOfModal === APPOINTMENT_STATUS.DECLINED && (
            <FormProvider {...form}>
              <Select
                name="reasonDeclined"
                placeholder={t("selectReasonDecline")}
                options={reasonDeclinedOptions}
              />
            </FormProvider>
          )}
          <div className="user-ctrl">
            <Button onClick={modal.handleClose} border="outline">
              No
            </Button>
            <Button loading={isLoading} onClick={form.handleSubmit(onSubmit)}>
              Yes
            </Button>
          </div>
        </StyledUpdateStatusAppointmentModal>
      </Modal>
    </StyledAppointmentRequestItem>
  );
};

export default AppointmentRequest;
