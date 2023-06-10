import { MoreVertIcon, Table } from "doctor-online-components";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { APPOINTMENT_STATUS, PATIENT_STATUS_ENUM } from "src/lib/constants";
import { useGetMeQuery, useGetPatientOfDoctorQuery } from "src/lib/services";
import { PatientType } from "src/lib/types";
import {
  PatientStatusTag,
  StyledDoctorReviewsContainer,
  StyledRecentPatient,
  StyledRecentPatientName,
  Title,
} from "./styled";
import { useParams } from "react-router-dom";

const DoctorPatients = () => {
  const { t } = useTranslation();
  const tableInstance = Table.useTable();
  const { doctorId } = useParams();
  const { data: patients, isLoading: getPatientLoading } =
    useGetPatientOfDoctorQuery(
      {
        doctorId: doctorId ?? "",
        page: 1,
        size: 10,
      },
      { skip: !doctorId }
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
  ];

  return (
    <StyledDoctorReviewsContainer>
      <div className="header">
        <Title>Recent Patients</Title>
      </div>
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
    </StyledDoctorReviewsContainer>
  );
};

export default DoctorPatients;
