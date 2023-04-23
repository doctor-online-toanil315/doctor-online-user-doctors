import styled from "styled-components";

export const StyledUpdateStatusAppointmentModal = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;

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
