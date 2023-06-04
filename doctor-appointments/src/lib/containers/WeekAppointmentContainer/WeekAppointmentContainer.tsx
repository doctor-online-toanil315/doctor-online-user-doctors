import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyledWeekAppointment } from "./styled";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppointmentType } from "src/lib/types";
import {
  useGetAppointmentByDoctorQuery,
  useGetMeQuery,
} from "src/lib/services";
import { useModal } from "doctor-online-common";
import moment from "moment";
import { APPOINTMENT_STATUS, CHANGE_DATE_ACTION_ENUM } from "src/lib/constants";
import {
  LongArrowLeftIcon,
  LongArrowRightIcon,
  Modal,
} from "doctor-online-components";
import { Divider, Dropdown, Tooltip } from "antd";
import { RescheduleModal } from "../RescheduleModal";
import { DeclineModal } from "../DeclineModal";
import { ConfirmModal } from "../ConfirmModal";
import CustomEventContent from "../CustomEventContent/CustomEventContent";

const WeekAppointmentContainer = () => {
  const calendarRef = useRef<FullCalendar>(null!);
  const { t } = useTranslation();
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
      const from = moment(selectedDate).startOf("weeks").valueOf();
      const to = moment(selectedDate).endOf("weeks").valueOf();

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
      const calendarApi = calendarRef.current.getApi();
      if (action === CHANGE_DATE_ACTION_ENUM.INCREASE) {
        setSelectedDate(moment(selectedDate).add(1, "weeks").valueOf());
        calendarApi.next();
      } else {
        setSelectedDate(moment(selectedDate).subtract(1, "weeks").valueOf());
        calendarApi.prev();
      }
    };
  };

  const handleOpenModal = (
    appointmentId: string,
    modal: ReturnType<typeof useModal>
  ) => {
    const appointment = appointments?.data.find(
      (appointment) => appointment.id === appointmentId
    );
    if (appointment) {
      setSelectedAppointment(appointment);
      modal.handleOpen();
    }
  };

  const handleOpenConfirm = (appointmentId: string) => {
    handleOpenModal(appointmentId, confirmModal);
  };

  const handleOpenDecline = (appointmentId: string) => {
    handleOpenModal(appointmentId, declineModal);
  };

  const handleOpenReSchedule = (appointmentId: string) => {
    handleOpenModal(appointmentId, rescheduleModal);
  };

  return (
    <StyledWeekAppointment>
      <div className="header">
        {`${moment(selectedDate).startOf("weeks").format("DD")} - ${moment(
          selectedDate
        )
          .endOf("weeks")
          .format("DD MMM, YYYY")}`}
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
      <div className="calendar">
        <FullCalendar
          plugins={[timeGridPlugin]}
          weekends={true}
          initialView="timeGridWeek"
          slotDuration="00:30:00"
          slotLabelFormat={{
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }}
          slotLabelInterval="00:30:00"
          slotMinTime="07:00"
          slotMaxTime="18:00"
          headerToolbar={{
            left: "",
            center: "",
            right: "",
          }}
          ref={calendarRef}
          initialDate={new Date(Number(from ?? Date.now()))}
          events={appointments?.data.map((appointment) => {
            return {
              title: appointment.id,
              start: Number(appointment.startTime),
              end: Number(appointment.endTime),
              ...appointment,
            };
          })}
          eventContent={(eventInfo) => (
            <CustomEventContent
              eventInfo={eventInfo}
              handleConfirm={handleOpenConfirm}
              handleDecline={handleOpenDecline}
              handleReschedule={handleOpenReSchedule}
            />
          )}
          expandRows={true}
        />
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
    </StyledWeekAppointment>
  );
};

export default WeekAppointmentContainer;
