import { ColumnType } from "antd/lib/table";
import {
  AddIcon,
  Button,
  Modal,
  PlusIcon,
  Table,
} from "doctor-online-components";
import React from "react";
import { ConsultationTestType } from "src/lib/types";
import { StyledPrescriptionContainer } from "./styled";
import { useParams } from "react-router-dom";
import { useGetAppointmentByIdQuery } from "src/lib/services";
import { useModal } from "doctor-online-common";
import { AddLabTestModal } from "../AddLabTestModal";

const LabTestContainer = () => {
  const tableInstance = Table.useTable();
  const modal = useModal();
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
        <Button onClick={() => modal.handleOpen()}>
          <PlusIcon /> Add Test
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={appointmentById?.data.consultion.consultionTests}
        totalElements={
          appointmentById?.data.consultion.consultionTests.length ?? 0
        }
        totalPages={1}
        loading={isLoading}
        tableInstance={tableInstance}
      />
      <Modal
        destroyOnClose
        open={modal.isOpen}
        onCancel={modal.handleClose}
        width={710}
      >
        <AddLabTestModal
          consultationId={appointmentById?.data.consultion.id}
          handleClose={modal.handleClose}
        />
      </Modal>
    </StyledPrescriptionContainer>
  );
};

export default LabTestContainer;
