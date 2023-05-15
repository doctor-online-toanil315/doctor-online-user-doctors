import React, { useState } from "react";
import { Modal, NotificationIcon, Button } from "doctor-online-components";
import { Popover } from "antd";
import NotificationList from "./NotificationList";
import { NotificationType, UserType } from "src/types";
import useSocket from "src/hooks/useSocket";
import { useGetMeQuery } from "src/services";
import { StyledReceiveCallRequest } from "./styled";
import { useModal } from "doctor-online-common";

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

  useSocket(handleEvent, handleReceiveCallRequest);

  return (
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
  );
};

export default Notification;
