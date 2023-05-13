import styled from "styled-components";

export const StyledLogConsultationContainer = styled.div`
  h1 {
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    color: ${({ theme }) => theme.primaryText};
    margin-bottom: 20px;
  }

  button {
    height: 50px !important;
    padding: 0 40px !important;
  }

  .container {
    padding: 20px 15px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;

    h2 {
      font-weight: 600;
      font-size: 16px;
      line-height: 26px;
      color: ${({ theme }) => theme.primaryText};
      margin-bottom: 10px;
    }
  }

  .user-ctrl {
    display: flex;
    justify-content: flex-end;
  }

  .consultation-container {
    display: flex;
    flex-flow: row nowrap;
    gap: 30px;

    .right {
      width: 30%;
    }

    .left {
      flex: 1;
    }

    .patient-information {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      height: fit-content;

      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        margin-bottom: 10px;
      }

      .patient-name {
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: ${({ theme }) => theme.primaryText};
        margin-bottom: 0;
      }

      .age-and-gender {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: ${({ theme }) => theme.baseGray03};
        margin-bottom: 15px;
      }

      .line {
        width: 100%;
        height: 1px;
        background-color: ${({ theme }) => theme.lightGray};
        margin-bottom: 15px;
      }

      .information-group {
        width: 100%;
        margin-bottom: 15px;

        label {
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          color: ${({ theme }) => theme.baseGray03};
        }

        p {
          font-weight: 500;
          font-size: 14px;
          line-height: 22px;
          color: ${({ theme }) => theme.primaryText};
          margin-bottom: 0;
        }
      }

      .patient-status {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;

        .status-item {
          width: calc(50% - 10px);
          padding: 12px;
          margin-bottom: 20px;
          border-radius: 6px;
          border-left: 3px solid transparent;

          p {
            font-weight: 500;
            font-size: 14px;
            line-height: 22px;
            color: ${({ theme }) => theme.primaryText};
          }

          span {
            font-weight: 500;
            font-size: 14px;
            line-height: 18px;
          }

          &.red {
            background-color: ${({ theme }) => `${theme.red}10`};
            border-color: ${({ theme }) => theme.red};

            span {
              color: ${({ theme }) => theme.red};
            }
          }

          &.purple {
            background-color: ${({ theme }) => `${theme.strongBlue}10`};
            border-color: ${({ theme }) => theme.strongBlue};

            span {
              color: ${({ theme }) => theme.strongBlue};
            }
          }

          &.blue {
            background-color: ${({ theme }) => `${theme.lightBlue}10`};
            border-color: ${({ theme }) => theme.lightBlue};

            span {
              color: ${({ theme }) => theme.lightBlue};
            }
          }

          &.orange {
            background-color: ${({ theme }) => `${theme.lightOrange}10`};
            border-color: ${({ theme }) => theme.lightOrange};

            span {
              color: ${({ theme }) => theme.lightOrange};
            }
          }
        }
      }
    }
  }
`;

export const StyledPrescriptionContainer = styled.div`
  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h3 {
      font-weight: 600;
      font-size: 16px;
      line-height: 26px;
      color: ${({ theme }) => theme.primaryText};
      margin-bottom: 0;
    }

    button {
      height: 45px !important;
      padding: 0 25px !important;
      display: flex;
      align-items: center;

      svg {
        top: unset;
      }
    }
  }
`;
