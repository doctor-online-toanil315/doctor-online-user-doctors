import styled from "styled-components";

export const StyledAppointmentDetail = styled.div`
  .back {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 10px;
    margin-top: 20px;

    font-weight: 400;
    font-size: 14px;
    color: ${({ theme }) => theme.baseGray03};

    margin-bottom: 15px;
    cursor: pointer;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    a {
      font-weight: 500;
      font-size: 14px;
      color: ${({ theme }) => theme.strongBlue};
      font-style: italic;
    }
  }

  h1 {
    font-weight: 700;
    font-size: 22px;
    line-height: 40px;
    color: ${({ theme }) => theme.primaryText};
  }

  .body {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    gap: 20px;

    .left {
      width: 65%;

      .user-ctrl {
        margin-top: 30px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        gap: 15px;

        button {
          height: 50px !important;
        }

        .orange {
          background-color: ${({ theme }) => theme.lightOrange};
        }
      }
    }

    .right {
      height: 570px;
      width: 30%;
      background-color: white;
      padding: 30px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }
  }
`;
export const StyledAppointmentForm = styled.div``;
export const StyledWorkingHour = styled.div`
  .header {
    padding-bottom: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.lightGray};
    margin-bottom: 20px;

    display: flex;
    flex-flow: row nowrap;
    gap: 15px;

    .icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.grayBlue};

      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        path {
          fill: ${({ theme }) => theme.strongBlue};
        }
      }
    }

    h4 {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: ${({ theme }) => theme.primaryText};
      margin-bottom: 0;
    }

    p {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: ${({ theme }) => theme.baseGray03};
      margin-bottom: 0;
    }
  }

  .working-time {
    margin-top: 20px;
    list-style-type: none;

    .working-time-item {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      margin-bottom: 15px;

      span {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: ${({ theme }) => theme.baseGray03};

        &.bold {
          font-weight: 500;
          color: ${({ theme }) => theme.primaryText};
        }
      }

      .time {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 15px;

        span {
          padding: 6px 14px;
          border: 1px solid ${({ theme }) => theme.lightGray};
          border-radius: 4px;
          letter-spacing: 0.5px;
        }
      }
    }
  }
`;
