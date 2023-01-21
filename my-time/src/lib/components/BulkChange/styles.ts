import styled from 'styled-components';

export const StyledBulkChange = styled.div`
  padding: 16px 24px;
  min-height: 100vh;

  span {
    &.font-bold {
      font-weight: bold;
    }

    &.center {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  h2 {
    &.ant-typography {
      font-size: 36px;
      font-weight: 700;
      line-height: 40px;
      margin: 0 0 16px;
      color: #1b1f3b;
    }
  }
`;
export const StyledContainer = styled.div`
  margin-top: 32px;

  .ant-table-cell {
    .center {
      text-align: center;
    }

    padding: 10px 6px;
    color: ${(props) => props.theme.baseGray03} !important;

    .ant-typography {
      color: ${(props) => props.theme.baseGray03} !important;
    }
  }

  .group-status {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 16px;

    .status {
      font-size: 16px;
      line-height: 24px;
      font-weight: 600;
    }

    .ant-radio-group {
      display: flex;

      .ant-radio-button-wrapper {
        padding: 0 1.5rem;
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${(props) => props.theme.secondaryText};

        &:hover {
          background-color: ${(props) => props.theme.baseGray02};
        }

        &:before {
          display: none;
        }

        &.ant-radio-button-wrapper-checked {
          border: 2px solid ${(props) => props.theme.strongBlue};
        }

        &:first-child {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }

        &:last-child {
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }
    }
  }
`;
export const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;

  button {
    &:first-child {
      &:hover {
        background-color: #1a4ca1;
      }
    }

    &:last-child {
      margin-left: 12px;
      border-color: ${(props) => props.theme.deepGray};
      color: ${(props) => props.theme.textDefault};
      border-width: 1px;

      &:hover {
        border-color: ${(props) => props.theme.strongGray};
      }
    }
  }
`;
export const StyledGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 1rem;
  line-height: 1.5rem;
`;
