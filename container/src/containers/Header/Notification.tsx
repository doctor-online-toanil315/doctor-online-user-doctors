import React, { useState } from "react";
import { Modal, NotificationIcon, Button } from "doctor-online-components";
import { Popover, notification } from "antd";
import NotificationList from "./NotificationList";
import { AppointmentType, NotificationType, UserType } from "src/types";
import useSocket from "src/hooks/useSocket";
import { useGetMeQuery } from "src/services";
import {
  StyledReceiveCallRequest,
  StyledReminderDescription,
  StyledReminderLogo,
} from "./styled";
import { useModal } from "doctor-online-common";
import LogoPrimary from "../../assets/logo.png";
import BotImg from "src/assets/chat-bot.png";
import moment from "moment";

const Notification = () => {
  const [fromUser, setFromUser] = useState<UserType | null>(null);
  const { data: currentUserLogin } = useGetMeQuery();
  const modal = useModal();

  const handleReceiveCallRequest = ({ from }: { from: UserType }) => {
    console.log("==================handleReceiveCallRequest");
    setFromUser(from);
    modal.handleOpen();
  };

  const handleEvent = (data: NotificationType) => {
    console.log("============receive: ", data);
  };

  const handleReminder = (appointment: AppointmentType) => {
    const key = String(Date.now());
    notification.open({
      message: (
        <StyledReminderLogo>
          <img src={LogoPrimary} alt="logo" />
        </StyledReminderLogo>
      ),
      description: (
        <StyledReminderDescription>
          <div className="bot">
            <img src={BotImg} alt="bot image" />
          </div>
          <div className="content">
            <h3>
              Meeting with Dr. {appointment.doctor.user.firstName}{" "}
              {appointment.doctor.user.lastName}
            </h3>
            <p>
              You have an appointment with doctor at{" "}
              {moment(Number(appointment.startTime)).format(
                "HH:mm, MM/DD/YYYY"
              )}
            </p>
            <div className="user-ctrl">
              <Button border="outline" onClick={() => notification.close(key)}>
                Cancel
              </Button>
              <Button onClick={() => notification.close(key)}>OK</Button>
            </div>
          </div>
        </StyledReminderDescription>
      ),
      key,
      duration: 30,
      placement: "bottomRight",
    });
  };

  useSocket(handleEvent, handleReceiveCallRequest, handleReminder);

  return (
    <>
      <Popover
        content={<NotificationList />}
        trigger={"click"}
        overlayStyle={{ width: 500 }}
        placement="bottomLeft"
        destroyTooltipOnHide
      >
        <NotificationIcon />
        <Modal open={modal.isOpen} onCancel={modal.handleClose} width={450}>
          <StyledReceiveCallRequest>
            <img
              src={
                fromUser?.avatar ??
                "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
              }
              alt="user avatar"
            />
            <p>{`${fromUser?.firstName} ${fromUser?.lastName} is calling you!`}</p>
            <Button
              onClick={() => {
                window.open(
                  `/video-consulting?to=${currentUserLogin?.data.id}&from=${fromUser?.id}`
                );
                modal.handleClose();
                setFromUser(null);
              }}
            >
              Join Now
            </Button>
          </StyledReceiveCallRequest>
        </Modal>
      </Popover>
    </>
  );
};

export default Notification;
