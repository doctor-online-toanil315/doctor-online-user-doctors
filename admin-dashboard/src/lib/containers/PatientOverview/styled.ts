import styled from "styled-components";

export const StyledContainer = styled.div`
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

  .content {
  }
`;

export const StyledPatientOverview = styled.div`
  .patient-status {
    display: flex;
    flex-flow: row nowrap;
    align-items: start;
    justify-content: space-between;
    margin-bottom: 30px;

    .status-description {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 20px;

      .patient-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          width: 25px;
          height: 25px;
        }
      }

      &.old {
        .patient-icon {
          background-color: ${({ theme }) => `${theme.lightBlue}10`};

          svg {
            path {
              stroke: ${({ theme }) => theme.blue};
              opacity: 1;
            }
          }
        }
      }

      &.new {
        .patient-icon {
          background-color: ${({ theme }) => `${theme.lightOrange}10`};

          svg {
            path {
              stroke: ${({ theme }) => theme.orange};
            }
          }
        }
      }

      .info {
        p {
          font-weight: 600;
          font-size: 22px;
          line-height: 33px;
          margin-bottom: 4px;
        }

        span {
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          color: ${({ theme }) => theme.baseGray03};
        }
      }
    }

    .increase-number {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 6px;

      color: ${({ theme }) => theme.strongBlue};
      font-weight: 500;
      font-size: 16px;
    }
  }
`;
