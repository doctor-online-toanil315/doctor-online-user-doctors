import styled from "styled-components";

export const StyledPatientOverview = styled.div`
  padding: 15px 20px;

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
    }
  }
`;
