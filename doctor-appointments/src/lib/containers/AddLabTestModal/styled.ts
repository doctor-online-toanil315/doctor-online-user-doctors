import styled from "styled-components";

export const StyledAddTestModal = styled.div`
  .line {
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.lightGray};
    margin-bottom: 15px;
    margin-top: 15px;
  }

  h3 {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.1px;
    text-transform: capitalize;
    color: ${({ theme }) => theme.primaryText};
  }

  .form-group {
    h4 {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: ${({ theme }) => theme.primaryText};
      margin-bottom: 10px;
    }
  }

  .user-ctrl {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 25px;

    button {
      height: 50px !important;
      padding: 0 40px !important;
    }
  }
`;
