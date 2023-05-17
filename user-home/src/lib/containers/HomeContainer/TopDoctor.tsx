import { Col, Row } from "antd";
import { ArrowRightIcon } from "doctor-online-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { useGetDoctorsQuery } from "src/lib/services";
import DoctorCard from "./DoctorCard";
import {
  StyledViewAll,
  Title,
  TopContainer,
  TopDoctorContainer,
} from "./styled";
import { forceNavigate } from "src/lib/utils";

const TopDoctor = () => {
  const { t } = useTranslation();
  const { data: doctors } = useGetDoctorsQuery({
    page: 1,
    size: 4,
    search: "",
  });

  return (
    <TopDoctorContainer>
      <TopContainer>
        <Title>{t("topDoctor")}</Title>
        <StyledViewAll className="view-all">
          {t("viewAll")}
          <ArrowRightIcon />
        </StyledViewAll>
      </TopContainer>
      <Row className="row-antd" gutter={[25, 25]}>
        {doctors?.data.map((doctor) => {
          return (
            <Col
              key={doctor.doctorId}
              span={12}
              onClick={() => forceNavigate(`user-doctors/${doctor.doctorId}`)}
            >
              <DoctorCard doctorItem={doctor} />
            </Col>
          );
        })}
      </Row>
    </TopDoctorContainer>
  );
};

export default TopDoctor;
