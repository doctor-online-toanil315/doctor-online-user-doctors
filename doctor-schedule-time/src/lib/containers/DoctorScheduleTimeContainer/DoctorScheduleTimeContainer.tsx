import { Col, Row } from "antd";
import React from "react";
import DoctorEventContainer from "./DoctorEventContainer";
import WorkingTimeContainer from "./WorkingTimeContainer";
import { Title } from "./styled";

const DoctorScheduleTimeContainer = () => {
  return (
    <div>
      <Title>Schedule Timings</Title>
      <Row gutter={30}>
        <Col span={16}>
          <DoctorEventContainer />
        </Col>
        <Col span={8}>
          <WorkingTimeContainer />
        </Col>
      </Row>
    </div>
  );
};

export default DoctorScheduleTimeContainer;
