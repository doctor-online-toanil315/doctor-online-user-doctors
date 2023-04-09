import { LongArrowLeftIcon } from "doctor-online-components";
import React from "react";
import { DoctorDetailContainer } from "src/lib/containers";
import { Container } from "./styled";
import { Link } from "react-router-dom";

const DoctorDetailPage = () => {
  return (
    <Container>
      <Link to="/list" className="back-to-home">
        <LongArrowLeftIcon />
        Back to home
      </Link>
      <DoctorDetailContainer />
    </Container>
  );
};

export default DoctorDetailPage;
