import styled from "styled-components";

export const StyledTodayAppointment = styled.div`
  height: 100%;
  padding: 10px;
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  justify-content: space-between;

  .appointments {
    display: flex;
    flex-flow: column nowrap;
    gap: 20px;

    height: 80%;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 8px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: ${({ theme }) => theme.baseGray03};
    }
  }

  .doctor-free {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 15px;

    img {
      width: 50%;
      object-fit: cover;
    }

    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: ${({ theme }) => theme.strongBlue};
    }
  }
`;

export const StyledTodayAppointmentItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;

  .user-info {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    gap: 15px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .information {
      p {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: ${({ theme }) => theme.primaryText};
        margin-bottom: 0;
      }

      span {
        font-weight: 400;
        font-size: 12px;
        line-height: 22px;
        color: ${({ theme }) => theme.baseGray03};
      }
    }
  }

  .appointment-time {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.strongBlue};
  }
`;
