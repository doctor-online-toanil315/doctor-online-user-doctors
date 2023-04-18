import React from "react";
import { useGetMeQuery } from "src/lib/services";
import { DoctorOverview } from "../DoctorOverview";
import { StyledDashBoardContainer, WelcomeSection } from "./styled";
import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";
import { AppointmentRequest } from "../AppointmentRequest";
import PatientOverview from "../PatientOverview/PatientOverview";
import { GenderOverview } from "../GenderOverview";
import { TodayAppointment } from "../TodayAppointment";
import { RecentPatient } from "../RecentPatient";

const DashBoardContainer = () => {
  const { t } = useTranslation();
  const { data: currentUserLogin } = useGetMeQuery();

  return (
    <StyledDashBoardContainer>
      <WelcomeSection>
        <h2>
          Welcome, Dr.{" "}
          {`${currentUserLogin?.data.firstName} ${currentUserLogin?.data.lastName}`}
        </h2>
        <p>{t("haveANiceDay")}</p>
      </WelcomeSection>
      <DoctorOverview />
      <Row
        style={{ width: "calc(100% + 40px)", marginTop: 40 }}
        gutter={[40, 40]}
      >
        <Col style={{ height: 573 }} span={9}>
          <AppointmentRequest />
        </Col>
        <Col span={6}>
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <PatientOverview />
            </Col>
            <Col span={24}>
              <GenderOverview />
            </Col>
          </Row>
        </Col>
        <Col style={{ height: 573 }} span={9}>
          <TodayAppointment />
        </Col>
        <Col span={24}>
          <RecentPatient />
        </Col>
      </Row>
    </StyledDashBoardContainer>
  );
};

export default DashBoardContainer;
