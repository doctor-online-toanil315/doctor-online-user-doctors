import styled from "styled-components";

export const StyledMyAppointmentsContainer = styled.div`
  .ant-tabs-top {
    & > .ant-tabs-nav {
      &::before {
        border: 0;
      }
    }
  }

  .appointment-list {
    margin-top: 20px;
  }

  .tag {
    display: inline-block;
    padding: 6px 10px;
    font-weight: 500;
    font-size: 12px;
    border-radius: 6px;
    margin-right: 6px;
    margin-bottom: 6px;

    &.orange {
      background-color: ${({ theme }) => `${theme.lightOrange}15`};
      color: ${({ theme }) => theme.lightOrange};
    }

    &.purple {
      background-color: ${({ theme }) => `${theme.strongBlue}15`};
      color: ${({ theme }) => theme.strongBlue};
    }

    &.red {
      background-color: ${({ theme }) => `${theme.red}15`};
      color: ${({ theme }) => theme.red};
    }
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }

  .user-ctrl {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 15px;

    button {
      height: 50px !important;
    }

    .action {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 15px;

      padding: 7px 20px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      background-color: ${({ theme }) => `${theme.strongBlue}15`};
      color: ${({ theme }) => theme.strongBlue};
      cursor: pointer;
    }
  }

  .payment-status {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 6px;

    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.green};

    .dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.green};
    }
  }

  .service-type {
    display: inline-block;
    padding: 6px 10px;
    font-weight: 500;
    font-size: 12px;
    border-radius: 6px;
    margin-right: 6px;
    margin-bottom: 6px;
    background-color: ${({ theme }) => `${theme.lightBlue}15`};
    color: ${({ theme }) => theme.lightBlue};
  }
`;

export const StyledDoctorInfos = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 15px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .infos {
    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      color: ${({ theme }) => theme.primaryText};
      margin-bottom: 0;
    }

    span {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: ${({ theme }) => theme.baseGray03};
    }
  }
`;

export const StyledPaymentModal = styled.div`
  transform: translate(-24px, -24px);
  width: calc(100% + 48px);

  .header,
  .body {
    padding: 24px;
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    background-color: ${({ theme }) => theme.lightGray};
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;

    img {
      width: 65px;
      height: 28px;
      margin-bottom: 5px;
    }
  }

  p {
    margin-bottom: 5px;
    &.bold {
      font-weight: 700;
    }
  }

  h3 {
    margin-bottom: 5px;
  }

  .payment-infos,
  .payment-summary {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
  }

  .payment-description {
    margin: 25px 0;
  }

  .right {
    text-align: right;
    margin-left: auto;
  }

  .total {
    span {
      display: inline-block;
      &:first-child {
        font-size: 16px;
        font-weight: 500;
        min-width: 100px;
        text-align: left;
      }
      &.bold {
        font-size: 18px;
        font-weight: 700;
      }
    }
  }

  svg {
    transform: translateY(-16px);
  }

  .ant-table-thead {
    tr {
      th {
        background-color: #dee2e6 !important;

        &::before {
          width: 0 !important;
        }
      }
    }
  }
`;
