import styled from "styled-components";

export const StyledAddDoctorModal = styled.div`
  padding: 10px 15px;

  h2 {
    font-weight: 500;
    font-size: 22px;
    line-height: 32px;
    color: ${({ theme }) => theme.primaryText};
    margin-bottom: 20px;
  }

  .user-ctrl {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    gap: 15px;
    margin-top: 20px;

    button {
      height: 50px !important;
      padding: 0 40px !important;
    }
  }
`;
