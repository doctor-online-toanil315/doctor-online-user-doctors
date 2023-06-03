import styled from "styled-components";

export const StyledExpandDoctor = styled.div`
  width: 100%;
  height: 350px;

  .header {
    h3 {
      width: 100%;
      text-align: center;
      font-weight: 700;
      font-size: 20px;
      line-height: 36px;
      color: ${({ theme }) => theme.strongBlue};
      margin-bottom: 15px;
    }
  }
`;
