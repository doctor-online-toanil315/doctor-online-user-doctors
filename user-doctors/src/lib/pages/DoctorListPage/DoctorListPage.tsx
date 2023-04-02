import React from "react";
import { Link } from "react-router-dom";
import { FilterDoctor } from "src/lib/containers";
import { DoctorListContainer } from "src/lib/containers/DoctorListContainer";
import { StyledDoctorListContainer } from "./styled";

const DoctorListPage = () => {
  return (
    <StyledDoctorListContainer>
      <FilterDoctor />
      <DoctorListContainer />
    </StyledDoctorListContainer>
  );
};

export default DoctorListPage;
