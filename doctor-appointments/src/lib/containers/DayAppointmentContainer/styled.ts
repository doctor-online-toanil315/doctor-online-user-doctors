import styled from "styled-components";

export const StyledWeekAppointment = styled.div`
  .header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 20px;

    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: ${({ theme }) => theme.primaryText};

    .user-ctrl {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 10px;

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
  }

  .fc .fc-scrollgrid table {
  }

  .fc-view-harness {
    &.fc-view-harness-active {
      height: 2540px !important;
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
      padding: 30px 0;
    }
  }

  td {
    &.fc-timegrid-slot {
      height: 110px;
    }
  }

  .fc-v-event {
    background-color: unset;
    border: none;
  }

  .calendar {
    margin-top: 20px;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;
