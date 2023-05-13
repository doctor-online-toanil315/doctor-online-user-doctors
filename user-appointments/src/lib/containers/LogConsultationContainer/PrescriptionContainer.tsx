import { ColumnType } from "antd/lib/table";
import {
  AddIcon,
  Button,
  Modal,
  PlusIcon,
  Table,
} from "doctor-online-components";
import React from "react";
import { PrescriptionType } from "src/lib/types";
import { StyledPrescriptionContainer } from "./styled";
import { useModal } from "doctor-online-common";
import { useParams } from "react-router-dom";
import { useGetAppointmentByIdQuery } from "src/lib/services";

const PrescriptionContainer = () => {
  const tableInstance = Table.useTable();
  const { appointmentId } = useParams();
  const { data: appointmentById, isLoading } = useGetAppointmentByIdQuery(
    appointmentId ?? "",
    {
      skip: !appointmentId,
      refetchOnMountOrArgChange: true,
    }
  );

  const columns: ColumnType<PrescriptionType>[] = [
    {
      title: "Medication",
      dataIndex: "id",
      render: (_, record) => record.medicine.name,
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
      render: (value, record) => `${value} times daily`,
    },
    {
      title: "When",
      dataIndex: "when",
      render: (value, record) => value,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Note",
      dataIndex: "notes",
    },
  ];

  return (
    <StyledPrescriptionContainer>
      <div className="header">
        <h3>Prescription</h3>
      </div>
      <Table
        columns={columns}
        dataSource={appointmentById?.data.consultion?.prescriptions}
        totalElements={
          appointmentById?.data.consultion?.prescriptions.length ?? 0
        }
        totalPages={1}
        loading={isLoading}
        tableInstance={tableInstance}
      />
    </StyledPrescriptionContainer>
  );
};

export default PrescriptionContainer;
