import { LongArrowLeftIcon, VerifyIcon } from "doctor-online-components";
import React from "react";
import { FilterDoctor } from "src/lib/containers";
import { DoctorListContainer } from "src/lib/containers/DoctorListContainer";
import { StyledDoctorListContainer } from "./styled";

const DoctorListPage = () => {
  return (
    <StyledDoctorListContainer>
      <p className="total-result">156 matches found</p>
      <span className="advertisement">
        <VerifyIcon />
        Book appointments with minimum wait-time & verified doctor details
      </span>
      <div className="container">
        <FilterDoctor />
        <DoctorListContainer />
      </div>
    </StyledDoctorListContainer>
  );
};

export default DoctorListPage;
