import styled from "styled-components";

export const StyledAppointmentRequest = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;
`;

export const StyledAppointmentRequestItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;

  padding: 10px;

  .user-request {
    display: flex;
    align-items: center;
    gap: 20px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .user-infos {
      p {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: ${({ theme }) => theme.primaryText};
        margin-bottom: 4px;
      }

      span {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: ${({ theme }) => theme.baseGray03};
      }
    }
  }

  .user-ctrl {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 15px;

    .action {
      width: 22px;
      height: 22px;
      border: 2px solid ${({ theme }) => theme.strongBlue};
      border-radius: 6px;

      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      svg {
        width: 12px;
        height: 12px;
      }

      &.purple {
        border-color: ${({ theme }) => theme.strongBlue};

        svg {
          stroke: ${({ theme }) => theme.strongBlue};
          fill: ${({ theme }) => theme.strongBlue};
        }
      }

      &.red {
        border-color: ${({ theme }) => theme.red};

        svg {
          path {
            stroke: ${({ theme }) => theme.red};
            fill: ${({ theme }) => theme.red};
          }
        }
      }
    }
  }

  .appointment-status {
    padding: 8px 16px;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    border-radius: 5px;
    text-transform: capitalize;

    &.confirmed {
      color: ${({ theme }) => theme.strongBlue};
      background-color: ${({ theme }) => `${theme.strongBlue}10`};
    }

    &.declined {
      color: ${({ theme }) => theme.red};
      background-color: ${({ theme }) => `${theme.red}10`};
    }
  }
`;

export const StyledUpdateStatusAppointmentModal = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;
  margin-top: 15px;

  .danger {
    padding: 12px 15px;
    background-color: ${({ theme }) => `${theme.orange}10`};
    color: ${({ theme }) => theme.orange};
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    border-radius: 10px;

    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    gap: 20px;

    svg {
      width: 30px;
      height: 30px;
    }

    p {
      margin-bottom: 0;
    }
  }

  .user-ctrl {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    button {
      height: 40px;
      padding: 0 50px;
    }
  }
`;
