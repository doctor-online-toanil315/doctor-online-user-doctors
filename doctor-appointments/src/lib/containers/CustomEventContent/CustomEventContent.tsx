import React from "react";
import { StyledAppointmentOption, StyledEventContent } from "./styled";
import moment from "moment";
import { APPOINTMENT_STATUS } from "src/lib/constants";
import {
  CheckIcon,
  CloseIcon,
  EditIcon,
  EyeIcon,
  MoreVertIcon,
  PhoneIcon,
} from "doctor-online-components";
import { Divider, Dropdown, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { AppointmentType } from "src/lib/types";

interface Props {
  eventInfo: any;
  handleConfirm: (eventId: string) => void;
  handleDecline: (eventId: string) => void;
  handleReschedule: (eventId: string) => void;
}

export default function CustomEventContent({
  eventInfo,
  handleConfirm,
  handleDecline,
  handleReschedule,
}: Props) {
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
        <p className="status">
          <span className={`dot ${color}`}></span>{" "}
          {appointment.status.toLowerCase()}
        </p>
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
