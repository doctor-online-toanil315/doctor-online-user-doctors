import styled, { css } from 'styled-components';

export const BtnWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: start;
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
`;
