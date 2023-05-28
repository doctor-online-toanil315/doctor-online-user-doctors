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
      render: () => `$${appointment?.doctor.price}`,
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
          <div className="left">
            <p className="bold">Payment Method</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              id="paypal"
            >
              <path
                fill="#139AD6"
                d="M49.2 28.2h-3.4c-.2 0-.4.2-.5.4l-1.4 8.8c0 .2.1.3.3.3H46c.2 0 .3-.1.3-.3l.4-2.5c0-.2.2-.4.5-.4h1.1c2.3 0 3.6-1.1 3.9-3.3.2-.9 0-1.7-.4-2.2-.6-.5-1.5-.8-2.6-.8m.4 3.3c-.2 1.2-1.1 1.2-2 1.2H47l.4-2.3c0-.1.1-.2.3-.2h.2c.6 0 1.2 0 1.5.4.2.1.2.4.2.9"
              ></path>
              <path
                fill="#263B80"
                d="M24.7 28.2h-3.4c-.2 0-.4.2-.5.4l-1.4 8.8c0 .2.1.3.3.3h1.6c.2 0 .4-.2.5-.4l.4-2.4c0-.2.2-.4.5-.4h1.1c2.3 0 3.6-1.1 3.9-3.3.2-.9 0-1.7-.4-2.2-.6-.5-1.4-.8-2.6-.8m.4 3.3c-.2 1.2-1.1 1.2-2 1.2h-.5l.4-2.3c0-.1.1-.2.3-.2h.2c.6 0 1.2 0 1.5.4.1.1.2.4.1.9M35 31.4h-1.6c-.1 0-.3.1-.3.2l-.1.5-.1-.2c-.4-.5-1.1-.7-1.9-.7-1.8 0-3.4 1.4-3.7 3.3-.2 1 .1 1.9.6 2.5.5.6 1.2.8 2.1.8 1.5 0 2.3-.9 2.3-.9l-.1.5c0 .2.1.3.3.3H34c.2 0 .4-.2.5-.4l.9-5.6c-.1-.1-.3-.3-.4-.3m-2.3 3.2c-.2.9-.9 1.6-1.9 1.6-.5 0-.9-.2-1.1-.4-.2-.3-.3-.7-.3-1.2.1-.9.9-1.6 1.8-1.6.5 0 .8.2 1.1.4.3.3.4.8.4 1.2"
              ></path>
              <path
                fill="#139AD6"
                d="M59.4 31.4h-1.6c-.1 0-.3.1-.3.2l-.1.5-.1-.2c-.4-.5-1.1-.7-1.9-.7-1.8 0-3.4 1.4-3.7 3.3-.2 1 .1 1.9.6 2.5.5.6 1.2.8 2.1.8 1.5 0 2.3-.9 2.3-.9l-.1.5c0 .2.1.3.3.3h1.5c.2 0 .4-.2.5-.4l.9-5.6c-.1-.1-.2-.3-.4-.3m-2.3 3.2c-.2.9-.9 1.6-1.9 1.6-.5 0-.9-.2-1.1-.4-.2-.3-.3-.7-.3-1.2.1-.9.9-1.6 1.8-1.6.5 0 .8.2 1.1.4.4.3.5.8.4 1.2"
              ></path>
              <path
                fill="#263B80"
                d="M43.7 31.4H42c-.2 0-.3.1-.4.2L39.4 35l-1-3.2c-.1-.2-.2-.3-.5-.3h-1.6c-.2 0-.3.2-.3.4l1.8 5.3-1.7 2.4c-.1.2 0 .5.2.5h1.6c.2 0 .3-.1.4-.2l5.5-7.9c.3-.3.1-.6-.1-.6"
              ></path>
              <path
                fill="#139AD6"
                d="m61.3 28.5-1.4 9c0 .2.1.3.3.3h1.4c.2 0 .4-.2.5-.4l1.4-8.8c0-.2-.1-.3-.3-.3h-1.6c-.1-.1-.2 0-.3.2"
              ></path>
              <path
                fill="#263B80"
                d="M12 25.2c-.7-.8-2-1.2-3.8-1.2h-5c-.3 0-.6.3-.7.6l-2 13.1c0 .3.2.5.4.5H4l.8-4.9v.2c.1-.3.4-.6.7-.6H7c2.9 0 5.1-1.2 5.8-4.5v-.3c-.1 0-.1 0 0 0 .1-1.3-.1-2.1-.8-2.9"
              ></path>
              <path
                fill="#139AD6"
                d="M12.7 28.1v.3c-.7 3.4-2.9 4.5-5.8 4.5H5.4c-.3 0-.6.3-.7.6l-1 6.1c0 .2.1.4.4.4h2.6c.3 0 .6-.2.6-.5v-.1l.5-3.1v-.2c0-.3.3-.5.6-.5h.4c2.5 0 4.5-1 5-4 .2-1.2.1-2.3-.5-3-.1-.2-.3-.4-.6-.5"
              ></path>
              <path
                fill="#232C65"
                d="M12 27.8c-.1 0-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.4-.1-.8-.1-1.3-.1H6.2c-.1 0-.2 0-.3.1-.2.1-.3.3-.3.5l-.8 5.2v.2c.1-.3.4-.6.7-.6H7c2.9 0 5.1-1.2 5.8-4.5 0-.1 0-.2.1-.3-.2-.1-.3-.2-.5-.2-.3-.1-.3-.1-.4-.1"
              ></path>
            </svg>
          </div>
          <div className="right">
            <div className="total">
              <span>Total:</span>
              <span className="bold">${appointment?.doctor.price}</span>
            </div>
          </div>
        </div>
      </div>
    </StyledPaymentModal>
  );
};

export default PaymentModal;
