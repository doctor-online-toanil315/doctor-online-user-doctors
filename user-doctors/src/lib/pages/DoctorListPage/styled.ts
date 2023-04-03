import styled from "styled-components";

export const StyledDoctorListContainer = styled.div`
  .container {
    display: flex;
    flex-flow: row nowrap;
    gap: 40px;

    margin-top: 40px;
  }

  .back-to-home {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: ${({ theme }) => theme.baseGray03};

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 10px;

    margin-bottom: 30px;

    cursor: pointer;
  }

  .total-result {
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    color: ${({ theme }) => theme.primaryText};
    margin-bottom: 4px;
  }

  .advertisement {
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: ${({ theme }) => theme.baseGray03};

    display: flex;
    align-items: center;
  }
`;
