import styled from "styled-components";

export const StyledWorkingTimeContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: white;

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
          width: 60px;
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
export const StyledDoctorEventContainer = styled.div`
  .header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 20px;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    background-color: white;

    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: ${({ theme }) => theme.primaryText};

    position: relative;

    .user-ctrl {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      gap: 20px;

      .action {
        padding: 5px;
        border-radius: 5px;
        background-color: ${({ theme }) => theme.baseGray02};
        transition: all 0.2s ease-out;
        cursor: pointer;

        &:hover {
          background-color: ${({ theme }) => theme.lightGray};
        }
      }
    }

    .add-event {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);

      button {
        height: 40px !important;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        background-color: ${({ theme }) => theme.lightOrange};
        svg {
          top: unset;
        }
      }
    }
  }

  .day-of-week {
    width: 100%;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 15px;
    margin-top: 10px;

    .day-item {
      flex: 1;
      padding: 14px 20px;
      border-radius: 6px;
      border: 1px solid ${({ theme }) => theme.lightGray};
      background-color: ${({ theme }) => theme.lightGray};

      font-weight: 500;
      font-size: 13px;
      line-height: 18px;
      color: ${({ theme }) => theme.baseGray03};
      text-align: center;
      text-transform: capitalize;
      cursor: pointer;
      transition: all 0.2s ease-out;

      &.active {
        color: white;
        background-color: ${({ theme }) => theme.strongBlue};
        border-color: ${({ theme }) => theme.strongBlue};
      }
    }
  }

  .list-events {
    width: 100%;
    margin-top: 15px;
    display: flex;
    flex-flow: row nowrap;
    gap: 15px;
    align-items: center;
    padding: 0;
    list-style-type: none;

    .event-item {
      padding: 8px 12px;
      display: flex;
      flex-flow: row nowrap;
      gap: 10px;
      background-color: white;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      border-radius: 10px;

      .icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          width: 20px !important;
          height: 20px !important;
        }

        &.purple {
          background-color: ${({ theme }) => `${theme.strongBlue}10`};
          svg {
            path {
              stroke: ${({ theme }) => theme.strongBlue};
            }
          }
        }

        &.red {
          background-color: ${({ theme }) => `${theme.red}10`};
          svg {
            path {
              stroke: ${({ theme }) => theme.red};
            }
          }
        }
      }

      h3 {
        text-transform: capitalize;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: ${({ theme }) => theme.primaryText};
        margin-bottom: 5px;
      }

      span {
        font-weight: 500;
        font-size: 12px;
        line-height: 22px;
        color: ${({ theme }) => theme.baseGray03};
      }
    }
  }

  .empty {
    margin-top: 40px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 20px;

    img {
      width: 350px;
    }

    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      color: ${({ theme }) => theme.strongBlue};
    }
  }
`;
export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.lightGray};
  margin: 20px 0;
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: ${({ theme }) => theme.primaryText};
  margin-bottom: 15px;
`;

export const StyledAddEventModal = styled.div`
  .time {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 10px;

    padding: 8px 15px;
    background-color: ${({ theme }) => theme.grayBlue};
    border-radius: 6px;

    color: ${({ theme }) => theme.baseGray03};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  .user-ctrl {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;

    gap: 15px;

    button {
      height: 50px !important;
      padding: 0 40px !important;
    }
  }
`;

export const StyledSelectTimeModal = styled.div`
  height: 650px;
  position: relative;

  .fc-timegrid-slots {
    & > table {
      width: 700px;
    }
  }

  .fc-view-harness {
    &.fc-view-harness-active {
      height: 620px !important;
    }
  }

  .fc-timegrid-cols {
    table {
      height: 620px !important;
    }
  }

  .fc-scroller {
    overflow-y: hidden !important;
  }

  .fc-col-header-cell-cushion {
    display: inline;
    padding: 4px 8px;
    border-radius: 6px;
    color: ${({ theme }) => theme.primaryText};
    line-height: 25px;
  }

  .fc-day-today {
    background-color: #fff !important;
    .fc-col-header-cell-cushion {
      background-color: ${({ theme }) => theme.strongBlue};
      color: white;
    }
  }

  tr {
    &.fc-scrollgrid-section {
      &:nth-child(2) {
        display: none;
      }
    }
    &.fc-scrollgrid-section.fc-scrollgrid-section-body {
      &:first-child {
        display: none !important;
      }
    }
  }

  div {
    &.fc-scrollgrid-sync-inner {
      padding: 10px 0;
    }
  }

  .fc-v-event {
    background-color: unset;
    border: none;
  }

  .fc-timegrid-col-events {
    margin: 0 1px 0 1px;

    /* .fc-timegrid-event-harness.fc-timegrid-event-harness-inset {
      inset: 556px 0% -670px;
    } */
  }
`;
