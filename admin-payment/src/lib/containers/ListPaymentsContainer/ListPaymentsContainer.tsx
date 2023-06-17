import React, { useState } from "react";
import { StyledDoctorInfos, StyledMyAppointmentsContainer } from "./styled";
import { Modal, Table } from "doctor-online-components";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { ColumnType } from "antd/lib/table";
import { useGetAllAppointmentsQuery } from "src/lib/services";
import { useModal } from "doctor-online-common";
import { AppointmentType, LabTest, MedicineType } from "src/lib/types";
import { FORM_MODE_ENUM } from "src/lib/constants";
import { useTranslation } from "react-i18next";
import moment from "moment";
import PaymentModal from "../PaymentModal/PaymentModal";

const ListPaymentsContainer = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, size, search } = Object.fromEntries(searchParams.entries());
  const [appointment, setAppointment] = useState<AppointmentType | null>(null);
  const tableInstance = Table.useTable();
  const { data: medicines, isFetching } = useGetAllAppointmentsQuery(
    {
      page: page ? Number(page) + 1 : 1,
      size: size ? Number(size) : 10,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const modal = useModal();

  const columns: ColumnType<AppointmentType>[] = [
    {
      title: "Patient Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: (_, record) => (
        <StyledDoctorInfos>
          <img src={record.user.avatar ?? ""} alt="patient image" />
          <div className="infos">
            <p>{`${record.user.firstName} ${record.user.lastName}`}</p>
          </div>
        </StyledDoctorInfos>
      ),
    },
    {
      title: "Service Name",
      render: () => <div className="service-type">Video Consulting</div>,
    },
    {
      title: "Date",
      dataIndex: "startTime",
      key: "startTime",
      render: (_, record) =>
        moment(Number(record.startTime ?? 0)).format("MMM DD, YYYY"),
    },

    {
      title: "Amount",
      dataIndex: "price",
      key: "price",
      render: (_, record) => (
        <StyledDoctorInfos>
          <div className="infos">
            <p>{record.doctor.price.toLocaleString()} VND</p>
          </div>
        </StyledDoctorInfos>
      ),
    },
    {
      title: "Status",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (_, record) => (
        <div className="payment-status">
          <span className="dot"></span>
          Paid
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      width: "15%",
      render: (_, record) => (
        <div className="user-ctrl">
          <div
            className="action"
            onClick={() => {
              setAppointment(record);
              modal.handleOpen();
            }}
          >
            View
          </div>
        </div>
      ),
    },
  ];

  return (
    <StyledMyAppointmentsContainer>
      <h2>Payments</h2>
      <div className="container">
        <div className="appointment-list">
          <Table
            tableInstance={tableInstance}
            loading={isFetching}
            columns={columns}
            dataSource={medicines?.data}
            totalElements={medicines?.totalItems ?? 0}
            totalPages={medicines?.totalPages ?? 0}
          />
        </div>
      </div>
      <Modal
        width={800}
        destroyOnClose
        open={modal.isOpen}
        onCancel={modal.handleClose}
      >
        <PaymentModal
          appointment={appointment}
          handleClose={modal.handleClose}
        />
      </Modal>
    </StyledMyAppointmentsContainer>
  );
};

export default ListPaymentsContainer;
