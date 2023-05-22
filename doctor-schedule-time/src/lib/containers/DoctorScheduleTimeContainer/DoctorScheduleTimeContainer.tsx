import { Col, Row } from "antd";
import React from "react";
import DoctorEventContainer from "./DoctorEventContainer";
import WorkingTimeContainer from "./WorkingTimeContainer";

const DoctorScheduleTimeContainer = () => {
  return (
    <div>
      <h1>Schedule Timings</h1>
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
