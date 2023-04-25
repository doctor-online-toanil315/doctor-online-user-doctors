import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  StyledAppointmentOption,
  StyledEventContent,
  StyledWeekAppointment,
} from "./styled";
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
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  CloseIcon,
  EditIcon,
  EyeIcon,
  LongArrowLeftIcon,
  LongArrowRightIcon,
  Modal,
  MoreVertIcon,
  PhoneIcon,
} from "doctor-online-components";
import { Divider, Dropdown, Tooltip } from "antd";
import { RescheduleModal } from "../RescheduleModal";
import { DeclineModal } from "../DeclineModal";
import { ConfirmModal } from "../ConfirmModal";

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
          console.log(appointment);
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

function CustomEventContent({
  eventInfo,
  handleConfirm,
  handleDecline,
  handleReschedule,
}: any) {
  const navigate = useNavigate();
  const appointment: AppointmentType = eventInfo.event.extendedProps;
  const color =
    appointment.status === APPOINTMENT_STATUS.CONFIRMED
      ? "strongBlue"
      : appointment.status === APPOINTMENT_STATUS.WAITING
      ? "lightOrange"
      : "red";

  const shouldShowAction = !(
    appointment.status === APPOINTMENT_STATUS.DECLINED ||
    moment(eventInfo.event.start).valueOf() < Date.now()
  );

  const menu = [
    {
      key: "1",
      label: (
        <div onClick={() => navigate(eventInfo.event.title)}>
          <StyledAppointmentOption>
            <EyeIcon />
            View Detail
          </StyledAppointmentOption>
        </div>
      ),
    },
    {
      key: "5",
      label: appointment.status === APPOINTMENT_STATUS.WAITING && (
        <div onClick={() => handleReschedule(eventInfo.event.title)}>
          <StyledAppointmentOption>
            <EditIcon />
            Reschedule
          </StyledAppointmentOption>
        </div>
      ),
    },
    {
      key: "2",
      label: appointment.status === APPOINTMENT_STATUS.WAITING && (
        <div onClick={() => handleConfirm(eventInfo.event.title)}>
          <StyledAppointmentOption>
            <CheckIcon />
            Confirm
          </StyledAppointmentOption>
        </div>
      ),
    },
    {
      key: "3",
      label: appointment.status === APPOINTMENT_STATUS.CONFIRMED && (
        <div>
          <StyledAppointmentOption>
            <PhoneIcon />
            Start Video Call
          </StyledAppointmentOption>
        </div>
      ),
    },
    {
      key: "4",
      label: appointment.status === APPOINTMENT_STATUS.WAITING && (
        <div onClick={() => handleDecline(eventInfo.event.title)}>
          <StyledAppointmentOption>
            <CloseIcon />
            Decline
          </StyledAppointmentOption>
        </div>
      ),
    },
  ];

  return (
    <Tooltip
      title={
        !shouldShowAction ? "This Appointment Request cant process now!" : null
      }
    >
      <StyledEventContent
        color={color}
        isDisable={
          appointment.status === APPOINTMENT_STATUS.DECLINED ||
          moment(eventInfo.event.start).valueOf() < Date.now()
        }
      >
        <h4>{`${appointment.user.firstName} ${appointment.user.lastName}`}</h4>
        <p>{eventInfo.timeText}</p>
        <div className="user-ctrl">
          {shouldShowAction ? (
            <Dropdown
              trigger={["click"]}
              menu={{ items: menu }}
              dropdownRender={(menu) => (
                <div>
                  {React.cloneElement(menu as React.ReactElement)}
                  <Divider style={{ margin: 8 }} />
                </div>
              )}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
            >
              <MoreVertIcon />
            </Dropdown>
          ) : (
            <MoreVertIcon />
          )}
        </div>
      </StyledEventContent>
    </Tooltip>
  );
}

export default WeekAppointmentContainer;
