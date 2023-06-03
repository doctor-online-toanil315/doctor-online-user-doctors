import React from "react";
import { AdminOverview } from "../AdminOverview";
import { Col, Row } from "antd";
import IncomeChart from "../IncomeChart/IncomeChart";
import { PatientOverview } from "../PatientOverview";
import { ReBookingChart } from "../ReBookingRateChart";
import { PatientChart } from "../PatientChart";
import { ListDoctorsContainer } from "../ListDoctorsContainer";

const AdminDashBoardContainer = () => {
  return (
    <div>
      <AdminOverview />
      <Row gutter={[30, 30]}>
        <Col span={18}>
          <PatientChart />
        </Col>
        <Col span={6}>
          <PatientOverview />
        </Col>
        <Col span={18}>
          <IncomeChart />
        </Col>
        <Col span={6}>
          <ReBookingChart />
        </Col>
        <Col span={24}>
          <ListDoctorsContainer />
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashBoardContainer;
