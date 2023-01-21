import styled from 'styled-components';

export const StyledForm = styled.div`
  display: flex;
  div {
    margin-right: 2px;
  }
  .form {
    .form-group {
      margin-bottom: 30px;
      display: flex;
    }

    .btn-add-form {
      margin-bottom: 60px;
    }

    .form-row {
      margin-top: 20px;
      position: relative;

      .title {
        margin-top: 30px;
      }

      &:first-child {
        margin: 0;
      }

      &.flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .w-100 {
        width: 100%;
      }

      .label {
        pointer-events: auto;
        margin-bottom: 4px;

        &.font-semibold {
          font-weight: 600;
        }

        &.required {
          &:after {
            content: '*';
            color: red;
          }
        }
      }

      .btn-delete {
        color: red;
        cursor: pointer;
      }

      .grid {
        display: grid;

        .col-span-2 {
          grid-column: span 2 / span 2;
        }

        .col-span-3 {
          grid-column: span 3 / span 3;
        }

        .col-span-4 {
          grid-column: span 4 / span 4;
        }

        .field {
          display: flex;
          min-height: 44px;
          justify-content: space-between;
          flex-direction: column;

          .ant-input-disabled {
            pointer-events: none;
          }
        }

        .btn {
          width: 32px;
          height: 32px;
          padding: 0;

          span {
            font-weight: bold;
          }
        }
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
        gap: 1rem;
      }

      .gap-30 {
        gap: 30px;
      }

      .gap-col-30 {
        column-gap: 30px;
      }
    }

    .block {
      display: block;
    }

    .ant-select-focus {
      .ant-select-selector {
        outline: 2px solid ${(props) => props.theme.strongBlue} !important;
      }
    }

    .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
      .ant-select-selector {
      border: none;
      outline: 2px solid ${(props) => props.theme.strongBlue} !important;
      box-shadow: none !important;
    }

    .ant-select-selector,
    .ant-picker {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      min-height: 56px;
      box-shadow: 0 2px 2px ${(props) => props.theme.boxShadowInput};
      color: ${(props) => props.theme.textDefault};
      background: ${(props) => props.theme.secondaryText};
      border: none !important;
      transition: outline-color 0.2s ease-in-out;
      outline: 1px solid ${(props) => props.theme.borderInput};

      &:hover {
        border: none !important;
        box-shadow: 0 2px 5px ${(props) => props.theme.boxShadowInputHover} !important;
      }

      &:focus-within {
        border: none !important;
        outline: 2px solid ${(props) => props.theme.strongBlue} !important;
      }

      .ant-select-selection-item,
      .ant-select-selection-search-input {
        margin-top: 0;

        input {
          height: 100% !important;
        }
      }
    }

    .ant-select-item-option {
      min-height: 44px;
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px 16px;
    }

    .ant-picker {
      &:focus-within {
        border: none !important;
        outline: 2px solid ${(props) => props.theme.strongBlue} !important;
      }
    }

    .ant-input,
    .ant-picker-input {
      &::placeholder {
        font-size: 15px;
      }
    }

    .border-bottom {
      border-bottom: 1px solid var(--deepGray);
    }

    .mt-0 {
      margin-top: 0;
    }

    .mt-30 {
      margin-top: 30px;
    }

    .mt-60 {
      margin-top: 60px;
    }

    .mb-60 {
      margin-bottom: 60px;
    }
  }

  .ant-input[disabled] {
    pointer-events: none;
  }

  .ant-input[disabled]:hover {
    border-color: #d9d9d9;
    border-right-width: 1px;
    box-shadow: none;
  }

  .ant-select-dropdown {
    box-shadow: 0 8px 16px rgb(0 0 0 / 16%);
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    padding: 8px 0;
    border: 1px solid #ededed;

    .rc-virtual-list-scrollbar {
      width: 6px !important;

      .rc-virtual-list-scrollbar-thumb {
        background: ${(props) => props.theme.scrollbar} !important;
        width: 4px !important;
        border-radius: 100px !important;
      }
    }

    .ant-select-item {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 44px;
      padding: 6px 16px;

      &.ant-select-item-option-selected {
        background-color: ${(props) => props.theme.softBlue};
      }
    }
  }

  .btn-group {
    .ant-btn {
      background-color: ${(props) => props.theme.softBlue};
      color: ${(props) => props.theme.activeBlue};
      padding: 0 28px;
      line-height: 57px;
      &.ant-btn[disabled],
      &.ant-btn[disabled]:hover,
      &.ant-btn[disabled]:active {
        color: ${(props) => props.theme.activeBlue};
        border-color: ${(props) => props.theme.softBlue};
        background: ${(props) => props.theme.softBlue};
        opacity: 0.6;
        box-shadow: none;
        text-shadow: none;
        cursor: default;
      }
      svg.eye-icon {
        top: 7px;
      }
    }
    path {
      fill: ${(props) => props.theme.activeBlue};
    }
  }
`;
