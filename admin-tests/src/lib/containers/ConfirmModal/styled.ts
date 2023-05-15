import styled from "styled-components";

export const StyledConfirmModal = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 25px;

  svg {
    width: 80px !important;
    height: 80px !important;
  }

  p {
    font-weight: 500;
    color: ${({ theme }) => theme.strongBlue};
    margin-bottom: 0;
  }

  .user-ctrl {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 15px;

    button {
      height: 45px !important;
      padding: 0 40px !important;
    }
  }
`;
