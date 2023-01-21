import React, { useEffect, useState } from "react";
import {
  StyledNotification,
  StyledNotifications,
  StyledPopover,
} from "./styles";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";
import {
  getToken,
  RootState,
  saveClient,
  useCommonDispatch,
  useCommonSelector,
  useDeleteNotificationMutation,
  usePutNotificationMutation,
} from "@nexthcm/common";
import { isNotEmptyArray, sendMessage, sendMessageInit } from "../../utils";
import { NotificationItem, Notifications, NotificationType } from "../../types";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import { BellIcon, Button } from "@nexthcm/components";
import { Badge } from "antd";
import { Client } from "@stomp/stompjs";

const Notification = () => {
  const [activeTab, setActiveTab] = useState<string>("1");
  const { user } = useCommonSelector((state: RootState) => state.user);
  const { client } = useCommonSelector((state: RootState) => state.webSocket);
  const [notifications, setNotifications] = useState<Notifications | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [putNotifications] = usePutNotificationMutation();
  const [deleteNotifications] = useDeleteNotificationMutation();
  const navigate = useNavigate();

  const dispatch = useCommonDispatch();

  const audio = new Audio("../../assets/notification.mp3");
  const token = getToken();

  useEffect(() => {
    audio.load();
  }, []);

  useEffect(() => {
    const client = new Client();
    client.configure({
      brokerURL: process.env["SOCKET_URL"],
      heartbeatIncoming: 0,
      heartbeatOutgoing: 20000,
      reconnectDelay: 2000,
    });
    if (token) {
      client.configure({
        connectHeaders: {
          access_token: token,
        },
      });
      client.activate();
      dispatch(saveClient({ client }));
    } else {
      client.deactivate();
    }
  }, [token]);

  useEffect(() => {
    if (client.connected) {
      sendMessageInit(client, user.userId);
    }
  }, [client, user]);

  useEffect(() => {
    if (client.connected) {
      client.subscribe(
        `/user/${user.userId}/queue/private-notifications`,
        (message) => {
          if (message.body) {
            const bodyRes: Notifications = JSON.parse(message.body);
            bodyRes.data.data.items.map((item) => {
              if (item.notifySetting?.notifyOnHCM && !bodyRes.turnOff) {
                const promise = audio.play();
                if (promise) {
                  promise.then(() => true).catch(() => false);
                }
              }
            });
            setIsLoading(false);
            setNotifications(JSON.parse(message.body));
          }
        }
      );
    } else {
      setNotifications(null);
    }
  }, [client.connected, user.userId]);

  const onChangeTabs = (key: string) => {
    setActiveTab(key);
    setIsLoading(true);
    sendMessage("type");
  };

  const onChangeSwitch = () => {
    setIsLoading(true);
    sendMessage("status");
  };

  const onMarkRead = (id: string) => {
    putNotifications({ body: [id], url: "/notification-mobile" })
      .unwrap()
      .then(() => {
        setIsLoading(true);
        sendMessage("default");
      });
  };

  const onMarkAllRead = () => {
    putNotifications({ body: [user.userId], url: "/notification-mobile/users" })
      .unwrap()
      .then(() => {
        setIsLoading(true);

        sendMessage("default");
      });
  };

  const onRemoveNotification = (id: string) => {
    deleteNotifications({ body: [id], url: "/notification-mobile" })
      .unwrap()
      .then(() => {
        setIsLoading(true);
        sendMessage("default");
      });
  };

  const onLoadMore = debounce(() => {
    if (notifications?.data.data.hasNext) {
      setIsLoading(true);
      sendMessage("more");
    }
  }, 500);

  const toPageNotification = ({
    type,
    targetId,
    notificationId,
  }: NotificationItem) => {
    switch (type) {
      case NotificationType.OverviewMe:
        navigateUrl("/overview/me", notificationId);
        break;
      case NotificationType.SeatMap:
        navigateUrl(
          `/seat-maps${targetId ? `/${targetId}` : ""}`,
          notificationId
        );
        break;
      case NotificationType.KnowledgeBaseArticles:
        navigateUrl(
          `/knowledge-base/articles${targetId ? `/${targetId}` : ""}`,
          notificationId
        );
        break;
      case NotificationType.Tenants:
        navigateUrl(`/admin/tenants`, notificationId);
        break;
      case NotificationType.OfficesList:
        navigateUrl("/admin/offices/list", notificationId);
        break;
      case NotificationType.SeatMapEdit:
        navigateUrl(`/admin/seat-maps`, notificationId);
        break;
      case NotificationType.LeaveConfigLevelsApproval:
        navigateUrl("/admin/leave-configs/levels-approval", notificationId);
        break;
      case NotificationType.LeaveConfigType:
        navigateUrl("/admin/leave-configs/types", notificationId);
        break;
      case NotificationType.LeaveConfigEntitlements:
        navigateUrl("/admin/leave-configs/entitlements", notificationId);
        break;
      case NotificationType.Permission:
        navigateUrl(`/admin/permissions`, notificationId);
        break;
      case NotificationType.AdminWorkFromHome:
        navigateUrl(
          `/my-time/requests/work-from-home${targetId ? `/${targetId}` : ""}`,
          notificationId
        );
        break;
      case NotificationType.AdminLeave:
        navigateUrl(
          `/my-time/requests/leave${targetId ? `/${targetId}` : ""}`,
          notificationId
        );
        break;
      case NotificationType.ProfileGeneral:
        navigateUrl(`/profile/general`, notificationId);
        break;
      case NotificationType.AdminWorkingAfterHouse:
        navigateUrl(
          `/my-time/requests/working-after-hours${
            targetId ? `/${targetId}` : ""
          }`,
          notificationId
        );
        break;
      case NotificationType.AdminUpdateTimesheet:
        navigateUrl(
          `/my-time/requests/update-timesheet${targetId ? `/${targetId}` : ""}`,
          notificationId
        );
        break;
      case NotificationType.AdminWorkingOnsite:
        navigateUrl(
          `/my-time/requests/working-onsite${targetId ? `/${targetId}` : ""}`,
          notificationId
        );
        break;
      case NotificationType.EmployeeWorkFromHome:
        navigateUrl(
          `/my-time/my-requests/work-from-home${
            targetId ? `/${targetId}` : ""
          }`,
          notificationId
        );
        break;
      case NotificationType.EmployeeLeave:
        navigateUrl(
          `/my-time/my-leave${targetId ? `/${targetId}` : ""}`,
          notificationId
        );
        break;
      case NotificationType.EmployeeWorkingAfterHouse:
        navigateUrl(
          `/my-time/my-requests/working-after-hours${
            targetId ? `/${targetId}` : ""
          }`,
          notificationId
        );
        break;
      case NotificationType.EmployeeUpdateTimesheet:
        navigateUrl(
          `/my-time/my-requests/update-timesheet${
            targetId ? `/${targetId}` : ""
          }`,
          notificationId
        );
        break;
      case NotificationType.EmployeeWorkingOnsite:
        navigateUrl(
          `/my-time/my-requests/working-onsite${
            targetId ? `/${targetId}` : ""
          }`,
          notificationId
        );
        break;
      case NotificationType.WorkingTimesConfiguration:
        navigateUrl(`overview/me`, notificationId);
        break;
      case NotificationType.NotificationAdHoc:
        navigateUrl(`admin/notifications/management`, notificationId);
        break;
      default:
        throw new Error("Type Notification Invalid");
    }
  };
  const navigateUrl = (url: string, notificationId: string) => {
    setVisible(false);
    navigate(url);
    onMarkRead(notificationId);
  };

  return (
    <StyledNotifications>
      <StyledPopover
        placement="bottomRight"
        overlayClassName="styled-header-popover"
        content={
          <Scrollbars
            style={{
              maxHeight: 610,
              height: isNotEmptyArray(notifications?.data.data.items)
                ? "calc(100vh - 56px)"
                : "200px",
              width: 500,
            }}
            renderTrackVertical={(props) => (
              <div {...props} className="track-vertical" />
            )}
            renderThumbVertical={(props) => (
              <div {...props} className="thumb-vertical" />
            )}
          >
            <StyledNotification>
              <section>
                <Header setOpen={setVisible} turnOff={notifications?.turnOff} />
                <Content
                  onChangeTabs={onChangeTabs}
                  onChangeSwitch={onChangeSwitch}
                  activeTab={activeTab}
                  dataList={notifications?.data?.data.items}
                  onMarkRead={onMarkRead}
                  onRemoveNotification={onRemoveNotification}
                  onLoadMore={onLoadMore}
                  toPageNotification={toPageNotification}
                  visible={visible}
                  hasMore={notifications?.data.data.hasNext}
                  isLoading={isLoading}
                />
                <Footer
                  setVisible={setVisible}
                  onMarkAllRead={onMarkAllRead}
                  tabsContent={activeTab}
                />
              </section>
            </StyledNotification>
          </Scrollbars>
        }
        trigger="click"
        visible={visible}
        id="list"
        onVisibleChange={(newOpen: boolean) => {
          if (newOpen) {
            sendMessageInit(client, user.userId);
          }
          setVisible(newOpen);
        }}
      >
        <Button border="borderless">
          <Badge count={notifications?.unReadCount}>
            <BellIcon width={30} height={30} />
          </Badge>
        </Button>
      </StyledPopover>
    </StyledNotifications>
  );
};

export default React.memo(Notification);
