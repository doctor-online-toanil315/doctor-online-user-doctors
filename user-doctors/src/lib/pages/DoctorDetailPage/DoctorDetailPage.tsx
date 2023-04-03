import { LongArrowLeftIcon } from "doctor-online-components";
import React from "react";
import { DoctorDetailContainer } from "src/lib/containers";
import { Container } from "./styled";

const DoctorDetailPage = () => {
  return (
    <Container>
      <p className="back-to-home">
        <LongArrowLeftIcon />
        Back to home
      </p>
      <DoctorDetailContainer />
    </Container>
  );
};

export default DoctorDetailPage;
