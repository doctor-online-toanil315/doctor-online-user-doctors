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
import {
  useGetAllAppointmentsQuery,
  useGetAllIncomeQuery,
  useGetAllPatientsQuery,
  useGetDoctorsQuery,
} from "src/lib/services";
import { abbreviateNumber } from "src/lib/utils";

const AdminOverview = () => {
  const { data: appointments } = useGetAllAppointmentsQuery({
    page: 1,
    size: 10,
  });
  const { data: doctors } = useGetDoctorsQuery({
    page: 1,
    size: 10,
  });
  const { data: patients } = useGetAllPatientsQuery({
    page: 1,
    size: 10,
  });
  const { data: income } = useGetAllIncomeQuery();

  return (
    <StyledAdminOverview>
      <div className="overview-item purple">
        <div className="icon">
          <CalendarIcon />
        </div>
        <div className="data">
          <p>Appointments</p>
          <h2>{abbreviateNumber(appointments?.totalItems ?? 0)}</h2>
        </div>
      </div>
      <div className="overview-item red">
        <div className="icon">
          <RoundedPersonIcon />
        </div>
        <div className="data">
          <p>Patients</p>
          <h2>{abbreviateNumber(patients?.totalItems ?? 0)}</h2>
        </div>
      </div>
      <div className="overview-item blue">
        <div className="icon">
          <PeopleIcon />
        </div>
        <div className="data">
          <p>Doctors</p>
          <h2>{abbreviateNumber(doctors?.totalItems ?? 0)}</h2>
        </div>
      </div>
      <div className="overview-item orange">
        <div className="icon">
          <PaymentIcon />
        </div>
        <div className="data">
          <p>Income</p>
          <h2>${abbreviateNumber(income ?? 0)}</h2>
        </div>
      </div>
    </StyledAdminOverview>
  );
};

export default AdminOverview;
