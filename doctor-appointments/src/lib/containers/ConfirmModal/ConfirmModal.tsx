import React from "react";
import { StyledModal } from "../RescheduleModal/styled";
import { useTranslation } from "react-i18next";
import { useModal } from "doctor-online-common";
import { AppointmentType } from "src/lib/types";
import moment from "moment";
import {
  Button,
  ClockIcon,
  Stethoscope,
  openNotification,
} from "doctor-online-components";
import { StyledConfirmModal } from "./styled";
import { useUpdateAppointmentMutation } from "src/lib/services";
import { APPOINTMENT_STATUS } from "src/lib/constants";

interface Props {
  modal: ReturnType<typeof useModal>;
  appointment: AppointmentType | null;
}

const ConfirmModal = ({ modal, appointment }: Props) => {
  const { t } = useTranslation();
  const [updateAppointmentStatus, { isLoading }] =
    useUpdateAppointmentMutation();

  const handleSubmit = () => {
    if (appointment) {
      updateAppointmentStatus({
        id: appointment?.id,
        reasonDeclined: appointment.reasonDeclined,
        startTime: appointment?.startTime,
        endTime: appointment?.endTime,
        reasonForAppointment: appointment?.reasonForAppointment,
        status: APPOINTMENT_STATUS.CONFIRMED,
      })
        .unwrap()
        .then((value) => {
          modal.handleClose();
          openNotification({
            type: "success",
            message: t("confirmSuccess"),
          });
        });
    }
  };

  return (
    <StyledModal>
      <div className="header">
        <h2>{t("confirmAppointment")}</h2>
      </div>
      <div className="body">
        <StyledConfirmModal>
          <h3>{t("timeAndDuration")}</h3>
          <p>
            <span className="icon blue">
              <ClockIcon />
            </span>
            {moment(Number(appointment?.startTime)).format("LT, MMM DD, YYYY")}
          </p>
          <p>
            <span className="icon purple">
              <Stethoscope />
            </span>
            {t("consultationTime")}
          </p>
          <div className="consultation-type">{t("videoConsulting")}</div>
          <Button loading={isLoading} onClick={handleSubmit}>
            Confirm
          </Button>
        </StyledConfirmModal>
      </div>
    </StyledModal>
  );
};

export default ConfirmModal;
