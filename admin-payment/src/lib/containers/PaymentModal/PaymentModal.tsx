import React from "react";
import { StyledPaymentModal } from "../ListPaymentsContainer/styled";
import { AppointmentType } from "src/lib/types";
import { Table } from "doctor-online-components";
import LogoImg from "src/lib/assets/logo.png";
import moment from "moment";

interface Props {
  handleClose: () => void;
  appointment: AppointmentType | null;
}

const PaymentModal = ({ handleClose, appointment }: Props) => {
  const tableInstance = Table.useTable({});

  const columns = [
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      render: () => "Video Consulting",
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
      render: () => 1,
    },
    {
      title: "Total",
      dataIndex: "Description",
      key: "Description",
      render: () => `${appointment?.doctor.price.toLocaleString()} VND`,
    },
  ];

  return (
    <StyledPaymentModal>
      <div className="header">
        <div className="left">
          <img src={LogoImg} alt="logo" />
          <p>0905012305</p>
        </div>
        <div className="right">
          <p className="bold">Date</p>
          <p>
            {moment(Number(appointment?.startTime ?? 0)).format("MMM DD, YYYY")}
          </p>
        </div>
      </div>
      <div className="body">
        <div className="payment-infos">
          <div className="left">
            <h3>Bill From</h3>
            <p className="bold">
              Dr.{" "}
              {`${appointment?.doctor.user.firstName} ${appointment?.doctor.user.lastName}`}
            </p>
            <p>{appointment?.doctor.user.address}</p>
          </div>
          <div className="right">
            <h3>Bill To</h3>
            <p className="bold">
              {`${appointment?.user.firstName} ${appointment?.user.lastName}`}
            </p>
            <p>{appointment?.user.address}</p>
          </div>
        </div>
        <div className="payment-description">
          <Table
            tableInstance={tableInstance}
            showPagination={false}
            loading={false}
            totalPages={1}
            totalElements={1}
            columns={columns}
            dataSource={[appointment]}
          ></Table>
        </div>
        <div className="payment-summary">
          <div className="right">
            <div className="total">
              <span>Total:</span>
              <span className="bold">
                {appointment?.doctor.price.toLocaleString()} VND
              </span>
            </div>
          </div>
        </div>
      </div>
    </StyledPaymentModal>
  );
};

export default PaymentModal;
