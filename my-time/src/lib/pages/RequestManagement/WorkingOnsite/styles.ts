import { flexCenter, flexSpaceBetween } from '@nexthcm/common';
import { Modal } from '@nexthcm/components';
import { Drawer } from 'antd';
import styled, { StyledComponent } from 'styled-components';

export const StyledWorkingOnsite = styled.div`
  position: relative;

  .table {
    margin-top: 16px;

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
      padding-bottom: 40px;
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
          height: 77px;

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
          padding: 10px 6px;
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

    .table__cif {
      color: unset;
      letter-spacing: -0.3px;
      word-break: keep-all;
    }

    .table__name {
      color: unset;
      text-transform: uppercase;
      word-break: keep-all;
      font-size: 14px;
      font-weight: 700;
      line-height: 21px;
    }

    .table__dateRange {
      color: unset;
      text-transform: uppercase;
      word-break: keep-all;
      font-size: 14px;
      line-height: 21px;
    }

    .table__checkbox {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      width: 16px;
      height: 16px;

      & > .ant-checkbox {
        top: 0;
        width: inherit;
        height: inherit;

        .ant-checkbox-inner {
          width: inherit;
          height: inherit;
          border-radius: 4px;

          &::after {
            top: 50%;
            left: 25%;
            width: 6px;
            height: 9px;
          }
        }
      }

      & > span + span {
        display: block;
        width: inherit;
        height: inherit;

        .ant-checkbox-wrapper {
          display: unset;
          width: inherit;
          height: inherit;

          .ant-checkbox {
            top: 0;
            width: inherit;
            height: inherit;

            .ant-checkbox-inner {
              width: inherit;
              height: inherit;
              border-radius: 4px;

              &::after {
                top: 50%;
                left: 25%;
                width: 6px;
                height: 9px;
              }
            }
          }
        }
      }

      .ant-checkbox-disabled {
        display: none !important;
      }

      span {
        margin: 0;
      }
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
