import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StyledListAppointmentContainer } from "./styled";
import {
  CheckIcon,
  ClockIcon,
  CloseIcon,
  EyeIcon,
  LongArrowLeftIcon,
  LongArrowRightIcon,
  Modal,
  PaperIcon,
  PhoneIcon,
  Tooltip,
} from "doctor-online-components";
import { APPOINTMENT_STATUS, CHANGE_DATE_ACTION_ENUM } from "src/lib/constants";
import {
  useGetAppointmentByDoctorQuery,
  useGetMeQuery,
} from "src/lib/services";
import { RescheduleModal } from "../RescheduleModal";
import { useModal } from "doctor-online-common";
import { AppointmentType } from "src/lib/types";
import { useTranslation } from "react-i18next";
import { DeclineModal } from "../DeclineModal";
import { ConfirmModal } from "../ConfirmModal";
import DoctorNotFoundImg from "src/lib/assets/doctor-not-found.png";

const ListAppointmentContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentType | null>(null);
  const { from, to } = Object.fromEntries(searchParams.entries());
  const { data: currentUserLogin } = useGetMeQuery();
  const { data: appointments } = useGetAppointmentByDoctorQuery(
    {
      doctorId: currentUserLogin?.data.doctor?.id ?? "",
      page: 1,
      size: 999,
      from,
      to,
    },
    {
      skip: !currentUserLogin?.data.doctor?.id || !from || !to,
      refetchOnMountOrArgChange: true,
    }
  );
  const rescheduleModal = useModal();
  const declineModal = useModal();
  const confirmModal = useModal();

  useEffect(() => {
    if (selectedDate) {
      const from = moment(selectedDate).startOf("date").valueOf();
      const to = moment(selectedDate).endOf("date").valueOf();

      searchParams.delete("from");
      searchParams.delete("to");
      searchParams.append("from", from.toString());
      searchParams.append("to", to.toString());
      setSearchParams(searchParams);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(from ? Number(from) : Date.now());
    }
  }, []);

  const handleSelectedDateChange = (action: CHANGE_DATE_ACTION_ENUM) => {
    return () => {
      if (action === CHANGE_DATE_ACTION_ENUM.INCREASE) {
        setSelectedDate(moment(selectedDate).add(1, "day").valueOf());
      } else {
        setSelectedDate(moment(selectedDate).subtract(1, "day").valueOf());
      }
    };
  };

  const handleOpenModal = (
    appointment: AppointmentType,
    modal: ReturnType<typeof useModal>
  ) => {
    setSelectedAppointment(appointment);
    modal.handleOpen();
  };

  const renderAppointmentList = () => {
    return appointments?.data.map((appointment) => {
      return (
        <div
          className={`appointment-item ${
            appointment.status === APPOINTMENT_STATUS.DECLINED ? "inactive" : ""
          }`}
          key={appointment.id}
        >
          <div className="user-infos">
            <img
              src={
                appointment.user.avatar ??
                "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
              }
              alt="user avatar"
            />
            <div className="infos">
              <h3>{`${appointment.user.firstName} ${appointment.user.lastName}`}</h3>
              <p>
                <ClockIcon />{" "}
                {moment(Number(appointment.startTime)).format(
                  "LT, MMM DD, YYYY"
                )}
              </p>
              <p>
                <PaperIcon /> {appointment.reasonForAppointment}
              </p>
            </div>
          </div>
          <div className="left">
            <div className="user-ctrl">
              <div
                className="action"
                onClick={() => handleOpenModal(appointment, rescheduleModal)}
              >
                <ClockIcon />
                Reschedule
              </div>
              {appointment.status !== APPOINTMENT_STATUS.DECLINED &&
                appointment.status !== APPOINTMENT_STATUS.DONE && (
                  <div
                    className="action red"
                    onClick={() => handleOpenModal(appointment, declineModal)}
                  >
                    <CloseIcon />
                    Decline
                  </div>
                )}
              {appointment.status === APPOINTMENT_STATUS.WAITING && (
                <div
                  className="action orange"
                  onClick={() => handleOpenModal(appointment, confirmModal)}
                >
                  <CheckIcon /> Confirm
                </div>
              )}
              {appointment.status === APPOINTMENT_STATUS.CONFIRMED && (
                <div className="action purple">
                  <PhoneIcon /> Start Video Call
                </div>
              )}
              <Tooltip title="View detail">
                <div
                  className="action blue"
                  onClick={() => navigate(`/${appointment.id}`)}
                >
                  <EyeIcon style={{ width: 20 }} />
                </div>
              </Tooltip>
            </div>
            <p
              className={`status ${
                appointment.status === APPOINTMENT_STATUS.WAITING
                  ? "orange"
                  : appointment.status === APPOINTMENT_STATUS.DECLINED
                  ? "red"
                  : "purple"
              }`}
            >
              {appointment.status === APPOINTMENT_STATUS.WAITING
                ? t("waitingResponse")
                : appointment.status === APPOINTMENT_STATUS.DECLINED
                ? t("appointmentIsCanceled")
                : t("confirmed")}
              <span
                className={`dot ${
                  appointment.status === APPOINTMENT_STATUS.WAITING
                    ? "orange"
                    : appointment.status === APPOINTMENT_STATUS.DECLINED
                    ? "red"
                    : "purple"
                }`}
              ></span>
            </p>
            <p className="price">
              {currentUserLogin?.data.doctor?.price} <CheckIcon />
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <StyledListAppointmentContainer>
      <div className="header">
        {moment(selectedDate).format("MMM DD, YYYY")}
        <div className="user-ctrl">
          <div
            className="action next"
            onClick={handleSelectedDateChange(CHANGE_DATE_ACTION_ENUM.DECREASE)}
          >
            <LongArrowLeftIcon width={16} />
          </div>
          <div
            className="action prev"
            onClick={handleSelectedDateChange(CHANGE_DATE_ACTION_ENUM.INCREASE)}
          >
            <LongArrowRightIcon width={16} />
          </div>
        </div>
      </div>
      <div className="appointment-list">
        {appointments?.data.length ? (
          renderAppointmentList()
        ) : (
          <div className="empty">
            <img src={DoctorNotFoundImg} alt="not found appointments" />
            <p>
              No appointments on {moment(selectedDate).format("MMM DD, YYYY")}
            </p>
          </div>
        )}
      </div>
      <Modal
        width={500}
        open={rescheduleModal.isOpen}
        onCancel={rescheduleModal.handleClose}
        destroyOnClose
      >
        <RescheduleModal
          modal={rescheduleModal}
          appointment={selectedAppointment}
        />
      </Modal>
      <Modal
        width={450}
        open={declineModal.isOpen}
        onCancel={declineModal.handleClose}
        destroyOnClose
      >
        <DeclineModal modal={declineModal} appointment={selectedAppointment} />
      </Modal>
      <Modal
        width={400}
        open={confirmModal.isOpen}
        onCancel={confirmModal.handleClose}
        destroyOnClose
      >
        <ConfirmModal modal={confirmModal} appointment={selectedAppointment} />
      </Modal>
    </StyledListAppointmentContainer>
  );
};

export default ListAppointmentContainer;
