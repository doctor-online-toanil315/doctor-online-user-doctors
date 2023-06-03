import styled from "styled-components";

export const StyledPatientChart = styled.div`
  width: 100%;
  height: 350px;
  padding: 5px 20px 5px 0;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.lightGray};
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  .title {
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: ${({ theme }) => theme.baseGray03};
    margin-bottom: 0;
  }

  .number {
    font-weight: 600;
    font-size: 16px;
    line-height: 28px;
    color: ${({ theme }) => theme.strongBlue};
    margin-bottom: 0;
  }
`;
