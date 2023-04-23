import styled from "styled-components";

export const StyledModal = styled.div`
  .header {
    padding: 10px 0;
    border-bottom: 1px solid ${({ theme }) => theme.lightGray};
    margin-bottom: 15px;

    h2 {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.1px;
      text-transform: capitalize;
      color: ${({ theme }) => theme.primaryText};
    }
  }

  .body {
    display: flex;
    flex-flow: column nowrap;
    gap: 15px;

    .appointment-time {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;

      .time {
        width: 45%;
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
    }

    .time-slots {
      list-style-type: none;
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      gap: 15px;

      h3 {
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 4px;
        color: ${({ theme }) => theme.primaryText};
      }

      .time-slot-item {
        display: block;

        padding: 4px 12px;
        border-radius: 8px;
        background: white;

        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: ${({ theme }) => theme.baseGray03};

        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

        cursor: pointer;

        &:hover {
          background: ${({ theme }) => theme.baseGray02};
        }

        &.inactive {
          text-decoration-line: line-through;
          background: ${({ theme }) => theme.baseGray02};
          cursor: no-drop;
        }

        &.my-time-slot {
          background: ${({ theme }) => theme.strongBlue};
          color: white;
          cursor: no-drop;
        }
      }
    }

    .user-ctrl {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      margin-top: 10px;

      button {
        width: 45%;
        height: 45px;
      }
    }
  }
`;
