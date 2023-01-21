import styled from 'styled-components';

export const StyledMyLeaveFilter = styled.div`
  .ant-row {
    .ant-col-8 {
      max-width: unset;

      & > div {
        min-width: 300px;
      }
    }
  }

  .select-status {
    .select-status__label {
      /* margin-top: 2px;
      margin-bottom: 0;
      padding-right: 8px; */

      /* &::after {
        content: ', ';
        position: absolute;
        top: 0;
        right: 0;
      } */
    }

    .ant-select-selector {
      .ant-select-selection-overflow {
        margin-top: 18px;
        margin-left: 8px;

        .ant-select-selection-search {
          margin-left: 0;

          input {
            padding-top: 4px !important;
          }
        }

        .ant-select-selection-overflow-item {
          .ant-select-selection-item {
            background-color: #ffffff;
            border: none;
            margin: 0 !important;
            margin-top: 10px;
            padding: 0;

            .ant-select-selection-item-remove {
              display: none;
            }

            .ant-select-selection-item-content {
              margin: 0;
            }
          }
        }
      }
      /*
      &::after {
        content: '';
      } */
    }
  }
  #demo-select-status {
    .ant-select-selector {
      .ant-select-selection-item-content {
        /* margin-left: 4px; */
        &::before {
          content: ',';
          position: absolute;
          top: 0px;
          left: 0px;
        }
      }

      .ant-select-selection-overflow-item:first-child {
        .ant-select-selection-item {
          margin-left: 0px !important;
          .ant-select-selection-item-content {
            &::before {
              content: '' !important;
            }
          }
        }
      }
    }
  }
`;
