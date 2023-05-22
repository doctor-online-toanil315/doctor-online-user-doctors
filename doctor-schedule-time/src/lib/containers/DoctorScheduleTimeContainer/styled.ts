import styled from "styled-components";

export const StyledWorkingTimeContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  h2 {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.primaryText};
    margin-bottom: 0;
  }

  .working-time-list {
    list-style-type: none;
    padding: 0;
    .working-time-item {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 28px;

      &:last-child {
        margin-bottom: 0;
      }

      .day {
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: ${({ theme }) => theme.baseGray03};
        white-space: nowrap;

        &.day {
          display: inline-block;
          width: 70px;
        }
      }

      .time-range {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 15px;

        .ant-input-affix-wrapper {
          height: 40px !important;
          width: 100px !important;
          padding: 0 5px 0 10px !important;
        }

        .container-input {
          position: relative;
          & > span {
            white-space: nowrap;
            position: absolute;
            bottom: -20px;
            left: 0;
          }
        }
      }

      .open {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 6px;
      }

      .user-ctrl {
        height: 50px !important;
        width: 100% !important;
        margin-top: 15px;

        span {
          color: white;
          font-size: 14px;
        }
      }
    }
  }
`;
export const StyledDoctorEventContainer = styled.div``;
export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.lightGray};
  margin: 20px 0;
`;
