import { Modal } from '@nexthcm/components';
import styled, { StyledComponent } from 'styled-components';

export const StyledModalForm = styled.div`
  .title {
    font-weight: 700;
    margin-top: 0 !important;
    font-size: 36px !important;
  }

  .group-control {
    margin-top: 20px;

    strong {
      font-size: 13px !important;
    }

    .required-mark {
      color: red;
    }

    .assignee {
      align-items: center;

      & > div {
        margin-right: 8px;

        span {
          font-size: 15px;
        }
      }

      & > span {
        color: black;
        font-size: 15px;
      }
    }

    .date-range {
      justify-content: space-between;
      flex-wrap: nowrap;
      margin-bottom: 16px;

      strong {
        font-size: 13px;
      }

      button {
        margin-left: 16px;
      }

      & > div {
        flex: 1;
        width: 100%;
      }

      &__picker {
        flex: 1;
      }
    }

    .select-session-day,
    .select-duration,
    .select-partial-days {
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

export const StyledLeaveTypeCardList = styled.div`
  display: grid;
  gap: 13px 13px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-bottom: 4px;

  & + span {
    font-size: 13px;
    line-height: 20px;
    color: ${(props) => props.theme.red};
    display: inline-block;
    width: 100% !important;
    text-align: left;
  }
`;

export const StyledSelectWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  gap: 0 16px;

  .specify-time {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-row: 2/-1;
    grid-column: -4/-2;
    display: grid;
    column-gap: 16px;
    margin-top: 16px;
  }
`;

export const StyledModal: StyledComponent<any, any> = styled(Modal)`
  .ant-modal-body {
    .modal-confirm__icon {
      & > div {
        color: #f27474;
        border: 4px solid #f27474;

        svg {
          width: 34px;
          height: 34px;
        }
      }
    }

    .ant-typography {
      margin-bottom: 16px;
    }

    .leave-duplicated {
      position: relative;
      margin: 12px 24px 0;
      padding-left: 24px;
      text-align: left !important;
      font-size: 15px;

      strong {
        margin-left: 4px;
      }

      &::after {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        top: 8px;
        left: 0;
        border-radius: 100%;
        background-color: #2640b8;
      }
    }

    .group-button {
      justify-content: center;
      margin-top: 32px;
    }
  }
`;

export const ErrorMessageStyled = styled.span`
  font-size: 13px;
  line-height: 20px;
  color: ${(props) => props.theme.red};
  display: inline-block;
  width: 100% !important;
  text-align: left;
  margin: -12px 0 -5px;
  display: block;
`;
