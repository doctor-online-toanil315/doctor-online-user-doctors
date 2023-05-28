import {
  CalendarIcon,
  PaperIcon,
  PaymentIcon,
  PeopleIcon,
  RoundedPersonIcon,
  VideoIcon,
} from "doctor-online-components";
import React from "react";
import { StyledAdminOverview } from "./styled";

const AdminOverview = () => {
  return (
    <StyledAdminOverview>
      <div className="overview-item purple">
        <div className="icon">
          <CalendarIcon />
        </div>
        <div className="data">
          <p>Appointments</p>
          <h2>24.4K</h2>
        </div>
      </div>
      <div className="overview-item red">
        <div className="icon">
          <RoundedPersonIcon />
        </div>
        <div className="data">
          <p>Patients</p>
          <h2>166.3K</h2>
        </div>
      </div>
      <div className="overview-item blue">
        <div className="icon">
          <PeopleIcon />
        </div>
        <div className="data">
          <p>Doctors</p>
          <h2>28.0K</h2>
        </div>
      </div>
      <div className="overview-item orange">
        <div className="icon">
          <PaymentIcon />
        </div>
        <div className="data">
          <p>Income</p>
          <h2>$24,4K</h2>
        </div>
      </div>
    </StyledAdminOverview>
  );
};

export default AdminOverview;
