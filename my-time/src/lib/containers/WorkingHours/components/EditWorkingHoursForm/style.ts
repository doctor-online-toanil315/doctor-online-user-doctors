import styled, { css } from 'styled-components';

export const BtnWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  .ant-btn.ant-btn[disabled],
  .ant-btn.ant-btn[disabled]:hover,
  .ant-btn.ant-btn[disabled]:active {
    cursor: default;
    color: ${(props) => props.theme.secondaryText};
    background: ${(props) => props.theme.strongBlue};
    svg {
      path {
        fill: ${(props) => props.theme.secondaryText};
      }
    }
  }
`;

export const Container = styled.div`
  .title {
    margin: 0 0 16px 0 !important;
  }

  .text-label {
    display: block;
    font-size: 13px !important;
    margin-bottom: 4px;

    .required-mark {
      color: red;
    }
  }

  .date-range-container {
    .ant-picker-input {
      top: -10px !important;
    }

    .ant-picker-range-separator {
      position: relative;
      top: -10px !important;
    }
  }

  .select-status {
    border-radius: 8px !important;
  }

  .name-status {
    font-size: 13px;
    color: white;
    padding: 1px 7px;
    border-radius: 8px !important;
    display: flex;
    align-items: center;
  }
  .ant-select {
    .select-status {
      background-color: transparent !important;

      .name-status {
        color: black;
        font-size: 14px;
      }
    }
  }

  .ant-select-item-option-content {
    color: black !important;
  }

  .ant-select-selection-overflow {
    .ant-select-selection-item {
      background: #074abd;
      color: #fff;
      border-radius: 10px;
      justify-content: center;
      align-items: center;
      padding: 0 12px;
      height: 32px;

      .ant-select-selection-item-remove {
        color: #fff;
      }
    }
  }
`;

export const InputWrapper = styled.div`
  grid-template-columns: repeat(2, minmax(0, 1fr));
  display: grid;
  column-gap: 16px;
  margin-bottom: 30px;
  div {
    &:hover {
      svg {
        opacity: 0.7;
      }
    }
  }

  span {
    svg {
      opacity: 0.5;
    }

    left: unset;
    right: 16px;
  }

  input {
    padding-left: 16px;
  }

  label {
    left: 16px;
  }
`;

export const StyledOptionCheckbox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  .emailCC-select {
    font-size: 15px;
    line-height: 24px;
    font-weight: 400;
    color: #1b1f3b;
    .name-container {
      font-weight: 600 !important;
    }
  }
`;
