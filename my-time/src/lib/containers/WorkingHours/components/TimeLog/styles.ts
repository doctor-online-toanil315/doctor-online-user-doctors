import styled from 'styled-components';

export const Container = styled.div`
  .upload-container {
    display: flex;
    align-items: flex-end;
    gap: 16px;

    a {
      margin: auto;
    }
  }

  .btn {
    justify-content: center;
    position: relative;
    width: 44px;
    margin: 0 auto;
    border-radius: 10px;
    height: 44px;
    &:hover {
      cursor: pointer;
      background-color: #dfe3f3;
    }
    &:active {
      background-color: #d8ddf2;
    }
    svg {
      path {
        fill: #526ed3;
      }
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .data-container {
    .list-data {
      width: 16px;
      height: 16px;
      border-radius: 999px;
      display: inline-block;
    }
    display: flex;
    gap: 8px;
    align-items: center;
    margin: 0;
    font-size: 15px;
    line-height: 24px;
  }

  .table.table-data {
    margin: 16px 0;

    .ant-table-cell {
      padding: 10px 6px;
    }

    thead {
      th {
        line-height: 24px;
        color: #50596c;
        font-weight: 700;
      }
    }

    tbody {
      .ant-table-placeholder {
        background-color: unset;
        td {
          color: #50596c;
        }
      }

      tr {
        &:hover > td {
          background: inherit;
        }
      }

      td {
        line-height: 24px;
        color: #fff;
      }

      td:nth-child(2) {
        font-weight: 700;
        color: #3b82f6;
      }
    }

    .edited-row {
      background-color: rgb(74 222 128);
    }
    .conflicts-row {
      background-color: rgb(248 113 113);
    }
    .duplicated-row {
      background-color: rgb(250 204 21);
    }
    .incorrect-row {
      background-color: rgb(251 146 60);
    }
    .isDataNotFound-row {
      background-color: rgb(156 163 175);
    }
  }
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  font-size: 13px;
  justify-content: flex-start;
  line-height: 19.5px;
  gap: 16px;
  margin-bottom: 20px;

  .title-timelog {
    font-size: 36px !important;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 32px;
  gap: 12px;
  display: flex;
  .ant-btn.ant-btn[disabled],
  .ant-btn.ant-btn[disabled]:hover,
  .ant-btn.ant-btn[disabled]:active {
    cursor: default;
    color: ${(props) => props.theme.secondaryText};
    background: #074abd;
    opacity: 0.5;
    svg {
      path {
        fill: ${(props) => props.theme.secondaryText};
      }
    }
  }
`;
