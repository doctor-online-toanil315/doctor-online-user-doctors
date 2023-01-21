import styled from 'styled-components';

export const FilterContainer = styled.div`
  .checkbox {
    height: 56px;
    line-height: 56px;

    .ant-checkbox-wrapper {
      .ant-checkbox + span {
        margin-top: 5px;
        line-height: 1;
      }
    }
  }

  .ant-select-selector {
    .ant-select-selection-overflow {
      .ant-select-selection-overflow-item {
        .ant-select-selection-item {
          background-color: #ffffff;
          border: none;
          margin: 0 !important;
          padding: 0;

          .ant-select-selection-item-remove {
            display: none;
          }

          .ant-select-selection-item-content {
            margin: 0;

            /* .select-label:before {
              content: ', ';
            } */
          }
        }
      }

      .ant-select-selection-overflow-item:first-child {
        .ant-select-selection-item {
          margin-left: 8px !important;

          /* .ant-select-selection-item-content {
            .select-label:before {
              content: '';
            }
          } */
        }
      }
    }
  }

  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background-color: #ffffff;
  }

  .select-option {
    padding: 2px 8px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
  }

  #demo-select-status {
    .ant-select-selector {
      .ant-select-selection-item-content {
        margin-left: 4px;
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

  .button {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }

  .grid {
    display: grid;
  }

  .col-span-2 {
    grid-column: span 2 / span 2;
  }

  .col-span-3 {
    grid-column: span 3 / span 3;
  }

  .col-span-4 {
    grid-column: span 4 / span 4;
  }

  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  .gap-4 {
    gap: 16px;
  }
`;
