import { Col, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useGetMeQuery } from "src/lib/services";
import RecentActivity from "./RecentActivity";
import { StyledHomeContainer } from "./styled";
import TopDoctor from "./TopDoctor";
import UpComingAppointment from "./UpCommingAppointment";
import YourPrescription from "./YourPrescription";

const HomeContainer = () => {
  const { t } = useTranslation();
  const { data } = useGetMeQuery();

  return (
    <StyledHomeContainer>
      <div className="welcome">
        <span>{t("welcome")}</span>
        <h2>{`${data?.data.firstName} ${data?.data.lastName}`}</h2>
      </div>
      <Row gutter={[30, 30]}>
        <Col span={17}>
          <TopDoctor />
        </Col>
        <Col span={7}>
          <YourPrescription />
        </Col>
        <Col span={17}>
          <RecentActivity />
        </Col>
        <Col span={7}>
          <Row gutter={[30, 30]}>
            <Col span={24}>
              <UpComingAppointment />
            </Col>
          </Row>
        </Col>
      </Row>
    </StyledHomeContainer>
  );
};

export default HomeContainer;
