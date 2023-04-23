import React from "react";
import { StyledUpdateStatusAppointmentModal } from "./styles";
import {
  Button,
  DangerIcon,
  OptionType,
  Select,
  openNotification,
} from "doctor-online-components";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModal, yup } from "doctor-online-common";
import {
  APPOINTMENT_STATUS,
  ReasonDeclinedOptionEnum,
} from "src/lib/constants";
import { AppointmentType } from "src/lib/types";
import { useUpdateAppointmentMutation } from "src/lib/services";
import { StyledModal } from "../RescheduleModal/styled";

interface Props {
  modal: ReturnType<typeof useModal>;
  appointment: AppointmentType | null;
}

const DeclineModal = ({ modal, appointment }: Props) => {
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {
      reasonDeclined: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        reasonDeclined: yup.string().required(t("common:form.required")),
      })
    ),
  });
  const [updateAppointmentStatus, { isLoading }] =
    useUpdateAppointmentMutation();

  const reasonDeclinedOptions: OptionType[] = [
    {
      key: ReasonDeclinedOptionEnum.DOCTOR_NOT_AVAILABLE,
      value: ReasonDeclinedOptionEnum.DOCTOR_NOT_AVAILABLE,
      label: ReasonDeclinedOptionEnum.DOCTOR_NOT_AVAILABLE,
      render: () => ReasonDeclinedOptionEnum.DOCTOR_NOT_AVAILABLE,
    },
  ];

  const onSubmit = ({ reasonDeclined }: { reasonDeclined: string }) => {
    if (appointment) {
      updateAppointmentStatus({
        id: appointment?.id,
        reasonDeclined: reasonDeclined ?? "",
        startTime: appointment?.startTime,
        endTime: appointment?.endTime,
        reasonForAppointment: appointment?.reasonForAppointment,
        status: APPOINTMENT_STATUS.DECLINED,
      })
        .unwrap()
        .then((value) => {
          modal.handleClose();
          openNotification({
            type: "success",
            message: t("declineSuccess"),
          });
        });
    }
  };

  return (
    <StyledModal>
      <div className="header">
        <h2>{t("areUSure")}</h2>
      </div>
      <StyledUpdateStatusAppointmentModal>
        <div className="danger">
          <DangerIcon />
          <p>{t("cancel")}</p>
        </div>
        <FormProvider {...form}>
          <Select
            name="reasonDeclined"
            placeholder={t("selectReasonDecline")}
            options={reasonDeclinedOptions}
          />
        </FormProvider>
        <div className="user-ctrl">
          <Button onClick={modal.handleClose} border="outline">
            No
          </Button>
          <Button loading={isLoading} onClick={form.handleSubmit(onSubmit)}>
            Yes
          </Button>
        </div>
      </StyledUpdateStatusAppointmentModal>
    </StyledModal>
  );
};

export default DeclineModal;
