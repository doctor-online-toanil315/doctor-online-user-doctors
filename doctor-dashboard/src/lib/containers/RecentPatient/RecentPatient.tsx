import React from "react";
import { StyledContainer } from "../styled";
import { useTranslation } from "react-i18next";
import {
  PatientStatusTag,
  StyledRecentPatient,
  StyledRecentPatientName,
} from "./styled";
import { MoreVertIcon, Table } from "doctor-online-components";
import {
  useGetAppointmentByDoctorQuery,
  useGetMeQuery,
  useGetPatientOfDoctorQuery,
} from "src/lib/services";
import { AppointmentType, PatientType } from "src/lib/types";
import moment from "moment";
import { APPOINTMENT_STATUS, PATIENT_STATUS_ENUM } from "src/lib/constants";

const RecentPatient = () => {
  const { t } = useTranslation();
  const tableInstance = Table.useTable();
  const { data: currentUserLogin } = useGetMeQuery();
  const { data: patients, isLoading: getPatientLoading } =
    useGetPatientOfDoctorQuery(
      {
        doctorId: currentUserLogin?.data.doctor?.id ?? "",
        page: 1,
        size: 10,
      },
      { skip: !currentUserLogin?.data.doctor?.id }
    );

  const columns = [
    {
      title: "Patient Name",
      key: "id",
      render: (value: string, record: PatientType) => {
        return (
          <StyledRecentPatientName>
            <img
              src={
                record.avatar ??
                "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
              }
              alt="patient avatar"
            />

            <p>{`${record.firstName} ${record.lastName}`}</p>
          </StyledRecentPatientName>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "birthday",
      render: (value: string) => moment(Number(value)).format("MMM DD, YYYY"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Disease",
      dataIndex: "id",
      key: "id",
      render: (value: string, record: PatientType) => (
        <p>{record.appointments[0]?.reasonForAppointment}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "id",
      render: (value: string, record: PatientType) => (
        <PatientStatusTag
          color={`${
            record.appointments[0]?.status === APPOINTMENT_STATUS.DONE
              ? "green"
              : "strongBlue"
          }`}
        >
          {record.appointments[0]?.status === APPOINTMENT_STATUS.DONE
            ? PATIENT_STATUS_ENUM.DONE
            : PATIENT_STATUS_ENUM.IN_TREATMENT}
        </PatientStatusTag>
      ),
    },
    {
      title: "",
      dataIndex: "id",
      render: (value: string, record: PatientType) => {
        return <MoreVertIcon />;
      },
    },
  ];

  return (
    <StyledContainer>
      <div className="header">
        <p className="title">{t("recentPatient")}</p>
      </div>
      <div className="content">
        <StyledRecentPatient>
          <Table
            columns={columns}
            dataSource={patients?.data}
            totalElements={patients?.totalItems ?? 0}
            totalPages={patients?.totalPages ?? 0}
            loading={getPatientLoading}
            tableInstance={tableInstance}
          />
        </StyledRecentPatient>
      </div>
    </StyledContainer>
  );
};

export default RecentPatient;
