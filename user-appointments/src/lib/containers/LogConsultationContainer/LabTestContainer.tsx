import { ColumnType } from "antd/lib/table";
import { Table } from "doctor-online-components";
import React from "react";
import { ConsultationTestType } from "src/lib/types";
import { StyledPrescriptionContainer } from "./styled";
import { useParams } from "react-router-dom";
import { useGetAppointmentByIdQuery } from "src/lib/services";
import { useModal } from "doctor-online-common";

const LabTestContainer = () => {
  const tableInstance = Table.useTable();
  const { appointmentId } = useParams();
  const { data: appointmentById, isLoading } = useGetAppointmentByIdQuery(
    appointmentId ?? "",
    {
      skip: !appointmentId,
      refetchOnMountOrArgChange: true,
    }
  );

  const columns: ColumnType<ConsultationTestType>[] = [
    {
      title: "Test Name",
      dataIndex: "id",
      render: (_, record) => record.test.name,
    },
    {
      title: "Reason",
      dataIndex: "reason",
    },
    {
      title: "Priority",
      dataIndex: "priority",
    },
    {
      title: "Instruction",
      dataIndex: "notes",
    },
  ];

  return (
    <StyledPrescriptionContainer>
      <div className="header">
        <h3>Lab Test</h3>
      </div>
      <Table
        columns={columns}
        dataSource={appointmentById?.data.consultion?.consultionTests}
        totalElements={
          appointmentById?.data.consultion?.consultionTests.length ?? 0
        }
        totalPages={1}
        loading={isLoading}
        tableInstance={tableInstance}
      />
    </StyledPrescriptionContainer>
  );
};

export default LabTestContainer;
