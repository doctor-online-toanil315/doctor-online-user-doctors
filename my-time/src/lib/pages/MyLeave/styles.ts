import { flexCenter, flexSpaceBetween } from '@nexthcm/common';
import { Modal, Table } from '@nexthcm/components';
import { Drawer } from 'antd';
import styled, { StyledComponent } from 'styled-components';

export const StyledMyLeave = styled.div`
  position: relative;
`;

export const StyledTable: StyledComponent<any, any> = styled(Table)`
  &.table {
    margin-top: 0;

    .ant-table {
      border-radius: 12px;
    }

    .ant-spin-container {
      .ant-spin {
        .ant-spin-dot {
          display: none;
        }
      }
    }

    .ant-table-content {
      border-radius: 12px;

      thead {
        th {
          box-sizing: border-box;
          padding: 10px 6px;
          border-bottom: 1px solid #e7e9ed;
          color: #50596c;
        }
      }

      tbody {
        tr {
          height: 65px;

          &.ant-table-row-selected {
            td {
              background-color: unset;
            }

            &:hover {
              background-color: #fafafa;
            }
          }
        }

        td {
          padding: 10px 6px !important;
          border-bottom: 1px solid #e7e9ed;
          color: #50596c;

          & > .ant-checkbox-wrapper > .ant-checkbox {
            display: none;
          }
        }
      }
    }

    .ant-table-wrapper + div {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0;
      width: 100%;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }
  }
`;

export const StyledTableFunction = styled.div`
  ${flexSpaceBetween}
  justify-content: unset;
`;

export const StyledTableButton = styled.div`
  cursor: pointer;
  width: 44px;
  height: 44px;
  ${flexCenter};
  border-radius: 10px;
  transition: all 0.3s;

  svg {
    path {
      fill: ${(props) => props.theme.blue};
      transition: all 0.3s;
    }
  }

  &:hover {
    background: ${(props) => props.theme.softBlue};
    svg {
      path {
        fill: ${(props) => props.theme.blueHover};
      }
    }
  }
`;

export const StyledModal: StyledComponent<any, any> = styled(Modal)`
  &.modal-confirm {
    .modal-confirm__button {
      justify-content: center;
      margin-top: 20px;

      button {
        padding: 0 24px !important;
        height: 44px !important;

        &:first-child {
          margin-right: 24px;
        }
      }
    }

    .modal-confirm__status {
      margin-top: 0;
    }
  }
`;

export const StyledMyLeaveContainer = styled.div`
  margin-top: 24px;
  padding: 24px;
  box-shadow: 0 0 #0000, 0 0 #0000, 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${(props) => props.theme.secondaryText};
  border-radius: 10px;

  .ant-btn[disabled] {
    background: rgb(130, 154, 214) !important;
  }
`;
