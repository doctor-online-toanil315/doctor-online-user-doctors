import React from "react";
import { NotificationIcon } from "doctor-online-components";
import { Popover } from "antd";
import NotificationList from "./NotificationList";
import { NotificationType } from "src/types";
import useSocket from "src/hooks/useSocket";

const Notification = () => {
  const handleEvent = (data: NotificationType) => {
    console.log("============receive: ", data);
  };

  useSocket(handleEvent);

  return (
    <Popover
      content={<NotificationList />}
      trigger={"click"}
      overlayStyle={{ width: 500 }}
      placement="bottomLeft"
      destroyTooltipOnHide
    >
      <NotificationIcon />
    </Popover>
  );
};

export default Notification;
