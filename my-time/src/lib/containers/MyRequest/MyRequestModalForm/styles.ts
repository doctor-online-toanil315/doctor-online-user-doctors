import styled from 'styled-components';

export const StyledModalForm = styled.div`
  .title {
    font-weight: 700;
    margin-top: 0 !important;
    font-size: 28px !important;
  }

  .group-control {
    margin-top: 20px;

    .required-mark {
      color: red;
    }

    strong {
      font-size: 13px;
    }

    .date-range {
      justify-content: space-between;
      flex-wrap: nowrap;
      margin-bottom: 16px;

      button {
        margin-left: 16px;
      }

      & > div {
        flex: 1;
        width: 100%;
      }

      &__button-add {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: unset !important;
        width: unset !important;
        height: 55px;
      }

      &__picker {
        flex: 1;

        .ant-typography {
          display: inline-block;
          width: 100% !important;
          text-align: left;
          color: red;
          font-size: 13px;
          line-height: 20px;
        }
      }
    }

    .button-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      width: 32px;
      height: 32px;

      svg {
        top: unset;
        right: unset;

        path {
          fill: white;
        }
      }

      &.ant-btn[disabled] {
        background-color: #074abd;
      }
    }

    .select-type,
    .select-office {
      .option-check-icon {
        span {
          display: none;
        }
      }
    }

    .select-email {
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
    }

    .option-check-box {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .option-check-icon {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      span {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .group-button {
    margin-top: 32px;

    button {
      margin-right: 12px;
    }
  }
`;
