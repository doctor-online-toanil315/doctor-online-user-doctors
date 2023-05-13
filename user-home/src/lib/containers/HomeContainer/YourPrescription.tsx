import { Col, Collapse, Row } from "antd";
import { ArrowRightIcon } from "doctor-online-components";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  PrescriptionDetail,
  PrescriptionItemContainer,
  StyledViewAll,
  Title,
  TopContainer,
  TopDoctorContainer,
} from "./styled";
import { useGetAppointmentByUserQuery, useGetMeQuery } from "src/lib/services";
import { AppointmentType, PrescriptionType } from "src/lib/types";

const { Panel } = Collapse;

const YourPrescription = () => {
  const { t } = useTranslation();
  const { data: currentUserLogin } = useGetMeQuery();
  const { data: appointments } = useGetAppointmentByUserQuery(
    {
      page: 1,
      size: 10,
      userId: currentUserLogin?.data.id ?? "",
    },
    {
      skip: !currentUserLogin?.data.id,
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <TopDoctorContainer>
      <TopContainer>
        <Title>{t("yourPrescription")}</Title>
        <StyledViewAll>
          {t("viewAll")}
          <ArrowRightIcon />
        </StyledViewAll>
      </TopContainer>
      <Row gutter={[30, 10]}>
        {appointments?.data.map((appointment) => {
          return (
            appointment.consultion?.prescriptions && (
              <Col key={appointment.id} span={24}>
                <PrescriptionItem appointment={appointment} />
              </Col>
            )
          );
        })}
      </Row>
    </TopDoctorContainer>
  );
};

interface PrescriptionItemProps {
  appointment: AppointmentType;
}

const PrescriptionItem = ({ appointment }: PrescriptionItemProps) => {
  return (
    <PrescriptionItemContainer>
      <Collapse className="prescription-item">
        <Panel
          header={`Prescription given by doctor ${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`}
          key={appointment.id}
        >
          {appointment.consultion.prescriptions?.map((prescription) => {
            return (
              <div key={prescription.id}>
                <PrescriptionDetail>
                  <p>{prescription.medicine.name}</p>
                  <span>
                    Dosage: {prescription.dosage} times daily - When:{" "}
                    {prescription.when} - Quantity: {prescription.quantity}
                  </span>
                </PrescriptionDetail>
              </div>
            );
          })}
        </Panel>
      </Collapse>
    </PrescriptionItemContainer>
  );
};

export default YourPrescription;
