import styled from "styled-components";

export const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column nowrap;

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

  .content {
    flex: 1;
    padding: 10px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;
