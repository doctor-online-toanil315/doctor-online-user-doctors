import React, { useEffect, useState } from "react";
import {
  StyledNotificationItem,
  StyledNotificationListContainer,
} from "./styled";
import {
  useLazyGetNotificationsQuery,
  useSeenNotificationMutation,
} from "src/services";
import InfiniteScroll from "react-infinite-scroll-component";
import { NotificationType } from "src/types";
import DoctorFree from "src/assets/doctor-not-found.png";
import { Spin } from "antd";
import { NotificationContent } from "src/constants";
import moment from "moment";
import useSocket from "src/hooks/useSocket";

const NotificationList = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [getNotifications, { data, isFetching: getNotificationsLoading }] =
    useLazyGetNotificationsQuery();
  const [seenNotification] = useSeenNotificationMutation();

  const handleClickNotification = (notificationId: string) => {
    seenNotification(notificationId);
    const newNotifications = [...notifications];
    const notificationIndex = newNotifications.findIndex(
      (notification) => notification.id === notificationId
    );
    newNotifications[notificationIndex] = {
      ...newNotifications[notificationIndex],
      isSeen: true,
    };
    setNotifications(newNotifications);
  };

  const fetchNotifications = async () => {
    getNotifications({
      page: currentPage + 1,
      size: 6,
    })
      .unwrap()
      .then((notificationsResponse) => {
        setNotifications((prev) => [
          ...prev,
          ...(notificationsResponse.data ?? []),
        ]);
      });
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <StyledNotificationListContainer>
      <div className="header">
        <p>Notifications</p>
      </div>
      <Spin spinning={getNotificationsLoading}>
        <InfiniteScroll
          style={{ width: "100%" }}
          height={350}
          dataLength={notifications.length} //This is important field to render the next data
          next={fetchNotifications}
          hasMore={notifications.length < (data?.totalItems ?? 0)}
          loader={undefined}
        >
          {notifications.length === 0 ? (
            <div className="empty">
              <img src={DoctorFree} alt="doctor is free" />
              <p>No recent notifications have been sent to you</p>
            </div>
          ) : (
            notifications.map((notification) => {
              return (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  handleClick={handleClickNotification}
                />
              );
            })
          )}
        </InfiniteScroll>
      </Spin>
    </StyledNotificationListContainer>
  );
};

interface NotificationItemProps {
  notification: NotificationType;
  handleClick: (notificationId: string) => void;
}

export const NotificationItem = ({
  notification,
  handleClick,
}: NotificationItemProps) => {
  return (
    <div onClick={() => handleClick(notification.id)}>
      <StyledNotificationItem isSeen={notification.isSeen}>
        <div className="left">
          <img
            src={
              notification.from.avatar ??
              "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
            }
            alt="user avatar"
          />
          <div className="infos">
            <h3>{`${notification.from.firstName} ${notification.from.lastName}`}</h3>
            <p>
              {
                NotificationContent[
                  notification.content as keyof typeof NotificationContent
                ]
              }
            </p>
          </div>
        </div>
        <span>{moment(Number(notification.createAt)).fromNow()}</span>
      </StyledNotificationItem>
    </div>
  );
};

export default NotificationList;
