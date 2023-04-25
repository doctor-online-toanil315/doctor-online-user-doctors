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
`;

export const StyledEventContent = styled.div<{
  color: string;
  isDisable: boolean;
}>`
  width: 100%;
  height: 100%;
  padding: 10px;
  border-left: 3px solid ${({ theme, color }) => `${theme[color]}`};
  background-color: ${({ theme, color }) => `${theme[color]}10`};
  position: relative;
  /* pointer-events: ${({ isDisable }) => (isDisable ? "none" : "unset")}; */

  h4 {
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: ${({ theme }) => theme.primaryText};
  }

  p {
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: ${({ theme }) => theme.baseGray03};
  }

  .user-ctrl {
    position: absolute;
    top: 5px;
    right: 5px;
  }
`;

export const StyledAppointmentOption = styled.div`
  padding: 5px 10px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;

  svg {
    width: 18px;
    path {
      fill: ${({ theme }) => theme.strongBlue};
    }
  }
`;
