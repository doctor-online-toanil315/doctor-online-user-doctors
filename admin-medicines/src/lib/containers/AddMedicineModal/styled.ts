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

  .action {
    cursor: pointer;
  }

  .medicine-image {
    display: block;
    width: 60%;
    object-fit: cover;
    margin: 0 auto;
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
