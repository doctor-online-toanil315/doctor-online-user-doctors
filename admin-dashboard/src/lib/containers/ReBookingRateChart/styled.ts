import styled from "styled-components";

export const StyledReBookingChart = styled.div`
  height: 350px;
  padding: 15px 25px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    .title {
      font-weight: 600;
      font-size: 18px;
      line-height: 28px;
      color: ${({ theme }) => theme.primaryText};
    }

    .suffix-section {
      .view-all {
        font-size: 14px;
        line-height: 22px;
        color: ${({ theme }) => theme.strongBlue};

        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;

        svg {
          width: 14px;
          fill: ${({ theme }) => theme.strongBlue};
          stroke: ${({ theme }) => theme.strongBlue};
        }
      }
    }
  }

  .recharts-responsive-container {
    width: calc(100% + 30px) !important;
    transform: translateX(-30px);
  }
`;
