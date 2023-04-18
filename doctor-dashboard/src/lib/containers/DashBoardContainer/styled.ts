import styled from "styled-components";

export const StyledDashBoardContainer = styled.div``;
export const WelcomeSection = styled.div`
  margin: 20px 0;
  h2 {
    font-weight: 700;
    font-size: 22px;
    line-height: 33px;
    color: ${({ theme }) => theme.primaryText};
    margin-bottom: 4px;
  }

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: ${({ theme }) => theme.baseGray03};
  }
`;
