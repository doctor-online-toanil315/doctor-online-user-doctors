import React, { useEffect, useRef, useState } from "react";
import { StyledPatientHistoryContainer } from "./styled";
import { Col, Row, Spin, Timeline } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetConsultationByUserQuery } from "src/lib/services";
import moment from "moment";
import {
  CalendarIcon,
  ClockIcon,
  Input,
  LongArrowLeftIcon,
} from "doctor-online-components";
import { AppointmentType, ConsultationType } from "src/lib/types";
import { FormProvider, useForm } from "react-hook-form";
import PrescriptionContainer from "../LogConsultationContainer/PrescriptionContainer";
import LabTestContainer from "../LogConsultationContainer/LabTestContainer";

const PatientHistoryContainer = () => {
  const { userId } = useParams();
  const { data, isLoading } = useGetConsultationByUserQuery(userId ?? "", {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });
  const [selectedConsultation, SetSelectedConsultation] = useState<
    (ConsultationType & { appointment: AppointmentType }) | null
  >(null);
  const navigate = useNavigate();

  const isFirstRunRef = useRef<boolean>(true);
  useEffect(() => {
    if (data && isFirstRunRef.current) {
      SetSelectedConsultation(data.data[0]);
      isFirstRunRef.current = false;
    }
  }, [data]);

  const form = useForm();

  return (
    <Spin spinning={isLoading}>
      <StyledPatientHistoryContainer>
        <div onClick={() => navigate(-1)} className="back">
          <LongArrowLeftIcon /> Back
        </div>
        <h1>Patient History</h1>
        <Row gutter={420}>
          <Col span={8}>
            <Timeline mode={"left"}>
              {data?.data.map((consultation) => {
                return (
                  <Timeline.Item
                    key={consultation.id}
                    label={moment(
                      Number(consultation.appointment.startTime ?? 0)
                    ).format("MMM DD, YY")}
                    dot={<CalendarIcon />}
                    className={`timeline-item ${
                      consultation.id === selectedConsultation?.id
                        ? "active"
                        : ""
                    }`}
                  >
                    <h3
                      className="timeline-title"
                      onClick={() => SetSelectedConsultation(consultation)}
                    >
                      Meet with{" "}
                      {consultation.appointment.doctor.specializeTitle}
                    </h3>
                    <p>Doctor's conclusion: {consultation.causeOfIllness}</p>
                  </Timeline.Item>
                );
              })}
            </Timeline>
          </Col>
          <Col span={16}>
            <h3>
              Meet with{" "}
              {selectedConsultation?.appointment.doctor.specializeTitle}
            </h3>
            <FormProvider {...form}>
              <Row gutter={[20, 30]}>
                <Col span={12}>
                  <Input
                    name="illReason"
                    value={selectedConsultation?.causeOfIllness}
                    label="Cause of Illness"
                    readOnly
                  />
                </Col>
                <Col span={12}>
                  <Input
                    name="startTime"
                    label="Start Time"
                    readOnly
                    suffix={<ClockIcon />}
                    value={moment(
                      Number(selectedConsultation?.appointment.startTime)
                    ).format("MMM DD, YYYY HH:MM")}
                  />
                </Col>
                <Col span={24}>
                  <Input
                    name="note"
                    value={selectedConsultation?.notes}
                    label="Note"
                    type="textarea"
                    readOnly
                  />
                </Col>
                <Col span={24}>
                  <div className="shadow">
                    <PrescriptionContainer
                      mode="view"
                      availableAppointmentId={
                        selectedConsultation?.appointment.id
                      }
                    />
                  </div>
                </Col>
                <Col span={24}>
                  <div className="shadow">
                    <LabTestContainer
                      mode="view"
                      availableAppointmentId={
                        selectedConsultation?.appointment.id
                      }
                    />
                  </div>
                </Col>
              </Row>
            </FormProvider>
          </Col>
        </Row>
      </StyledPatientHistoryContainer>
    </Spin>
  );
};

export default PatientHistoryContainer;
