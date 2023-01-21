import styled from 'styled-components';

export const StyledNotifiSettings = styled.div`
  padding: 24px;
  background-color: #fff;
  margin-top: 24px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  border-radius: 12px;

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 16px;
  }

  table {
    margin-top: 24px;
    width: 100%;
    font-size: 16px;
    line-height: 24px;
    border-collapse: separate !important;
    text-indent: 0;
    border-color: inherit;
    border-spacing: 0;

    .tr-head {
      background-color: #fff;
      position: sticky;
      top: -24px;
      z-index: 10;
    }

    thead {
      tr {
        &:first-child {
          border-top-width: 1px;

          td {
            border-top-width: 1px;
          }

          td:first-child {
            border-top-left-radius: 8px;
          }
        }
      }
    }

    tr {
      border-width: 0;
      border-style: solid;
      border-color: #e5e7eb;

      &:first-child {
        td:last-child {
          border-top-right-radius: 8px;
        }
      }

      td {
        border-width: 0;
        border-style: solid;
        border-color: #e5e7eb;
        border-bottom-width: 1px;
        border-left-width: 1px;
        padding: 8px 12px;

        &.font-bold {
          font-weight: bold;
        }

        &.bg-neutral-200 {
          background-color: ${(props) => props.theme.baseGray};
        }

        &.center {
          text-align: center;
        }

        .ant-checkbox-wrapper {
          &.readOnly {
            .ant-checkbox-inner {
              opacity: 0.56;
            }
          }
        }

        &:last-child {
          border-right-width: 1px;
        }
      }
    }
  }
`;
