import styled from "styled-components";

export const StyledCreateBlogContainer = styled.div`
  .header {
    h1 {
      font-weight: 700;
      font-size: 22px;
      line-height: 33px;
      margin-bottom: 10px;
    }

    p {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: ${({ theme }) => theme.baseGray03};
    }
  }

  .create-form {
    margin-top: 25px;
    display: flex;
    flex-flow: column nowrap;
    gap: 25px;

    .user-ctrl {
      margin-top: 10px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      gap: 15px;

      button {
        height: 50px !important;
        padding: 0 50px !important;
      }
    }
  }
`;
