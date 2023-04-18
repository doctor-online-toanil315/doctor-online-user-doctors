import styled from "styled-components";

export const StyledDoctorOverview = styled.div`
  margin-top: 30px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  .overview-item {
    width: 25%;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 20px;

    &.purple {
      background-color: ${({ theme }) => theme.strongBlue};
    }

    &.red {
      background-color: ${({ theme }) => theme.red};
    }

    &.orange {
      background-color: ${({ theme }) => theme.orange};
    }

    &.blue {
      background-color: ${({ theme }) => theme.blue};
    }

    .icon {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      position: relative;
      background-color: rgba(255, 255, 255, 0.18);

      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        width: 28px;
        height: 28px;

        path {
          stroke: white;
        }
      }
    }

    .data {
      h2 {
        font-weight: 700;
        font-size: 24px;
        line-height: 36px;
        color: white;
        margin-bottom: 0;
      }

      p {
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        color: ${({ theme }) => theme.lightGray};
      }
    }
  }
`;
