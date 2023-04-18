import {
  CalendarIcon,
  PaperIcon,
  RoundedPersonIcon,
  VideoIcon,
} from "doctor-online-components";
import React from "react";
import { StyledDoctorOverview } from "./styled";

const DoctorOverview = () => {
  return (
    <StyledDoctorOverview>
      <div className="overview-item purple">
        <div className="icon">
          <CalendarIcon />
        </div>
        <div className="data">
          <h2>24.4K</h2>
          <p>Appointments</p>
        </div>
      </div>
      <div className="overview-item red">
        <div className="icon">
          <RoundedPersonIcon />
        </div>
        <div className="data">
          <h2>166.3K</h2>
          <p>Appointments</p>
        </div>
      </div>
      <div className="overview-item blue">
        <div className="icon">
          <VideoIcon />
        </div>
        <div className="data">
          <h2>28.0K</h2>
          <p>Video Consulting</p>
        </div>
      </div>
      <div className="overview-item orange">
        <div className="icon">
          <PaperIcon />
        </div>
        <div className="data">
          <h2>24,4K</h2>
          <p>Consultation</p>
        </div>
      </div>
    </StyledDoctorOverview>
  );
};

export default DoctorOverview;
