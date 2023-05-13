import {
  ROLE_ENUM,
  RootState,
  useCommonSelector,
  useFormat,
} from "doctor-online-common";
import { Col, Row } from "antd";
import { ArrowRightIcon, MoreHorizIcon } from "doctor-online-components";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { useGetNotificationsQuery } from "src/lib/services";
import { NotificationType } from "src/lib/types";
import {
  RecentActivityContainer,
  RecentActivityItemContainer,
  StyledViewAll,
  Title,
  TopContainer,
} from "./styled";
import { notificationContentMapper } from "src/lib/utils";

const RecentActivity = () => {
  const { t } = useTranslation();
  const { client } = useCommonSelector((state: RootState) => state.webSocket);
  const { data: notifications, isLoading } = useGetNotificationsQuery({
    page: 1,
    size: 4,
  });

  return (
    <RecentActivityContainer>
      <TopContainer>
        <Title>{t("recentActivity")}</Title>
        <StyledViewAll>
          {t("viewAll")}
          <ArrowRightIcon />
        </StyledViewAll>
      </TopContainer>
      <Row gutter={[30, 20]}>
        {notifications?.data.map((notificationItem) => {
          return (
            <Col key={notificationItem.id} span={24}>
              <RecentActivityItem notification={notificationItem} />
            </Col>
          );
        })}
      </Row>
    </RecentActivityContainer>
  );
};

interface RecentActivityItemProps {
  notification: NotificationType;
}

const RecentActivityItem = ({ notification }: RecentActivityItemProps) => {
  const formatDate = useFormat();

  return (
    <RecentActivityItemContainer>
      <div className="sender">
        <img
          src={
            notification.from.avatar ??
            "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
          }
          alt="doctor image"
        />
        <div className="infos">
          <h4>{`${notification.from.role === ROLE_ENUM.DOCTOR ? "Dr." : ""} ${
            notification.from.firstName
          } ${notification.from.lastName}`}</h4>
          <span>
            {moment(Number(notification.createAt)).format(formatDate)}
          </span>
        </div>
      </div>
      <p className="content">{notificationContentMapper(notification)}</p>
      <div className="user-controls">
        <MoreHorizIcon />
      </div>
    </RecentActivityItemContainer>
  );
};

export default RecentActivity;
