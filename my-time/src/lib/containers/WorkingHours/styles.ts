import styled, { StyledComponent } from 'styled-components';

export const Container = styled.div`
  .expand-icon-container {
    position: relative;
    width: 56px;
    height: 56px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #dfe3f3;
      cursor: pointer;
    }
    &:active {
      background-color: #d8ddf2;
    }
    .expanded-icon {
      transition: ease 0.2s;
      transform: rotate(90deg) !important;
    }
    svg {
      transition: ease 0.2s;
      path {
        fill: #6c86e2;
      }
    }
  }
  .edit-icon-container {
    /* display: flex; */
    justify-content: center;
    position: relative;
    width: 44px;
    margin: 0 auto;
    border-radius: 10px;
    height: 44px;
    &:hover {
      cursor: pointer;
      background-color: #dfe3f3;
    }
    &:active {
      background-color: #d8ddf2;
    }
    svg {
      path {
        fill: #6c86e2;
      }
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .expanded-table {
    .ant-table-thead {
      position: sticky;
      z-index: 10;
      top: 0 !important;
      background-color: #fff !important;
      th {
        font-weight: 700 !important;
      }
    }
  }

  .working-hours-table {
    .ant-table-thead {
      .ant-table-column-title {
        font-size: 14px;
        line-height: 21px;
        font-weight: 700 !important;
        color: #50596c !important;
      }
      background-color: #fff !important;
      position: sticky;
      z-index: 4;
      top: 0px !important;
    }
    .ant-table-tbody {
      .ant-table-cell {
        font-size: 14px;
        line-height: 21px;
        font-weight: 600;
        color: #50596c !important;
      }
    }
  }
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  font-size: 13px;
  justify-content: flex-end;
  line-height: 19.5px;
  gap: 16px;
  margin: 20px 0;
`;

export const InputContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 16px;
  .checkbox-container {
    align-items: flex-end;
    flex: 1;
    height: 56px;
    line-height: 56px;

    .ant-checkbox-wrapper {
      .ant-checkbox + span {
        margin-top: 5px;
        line-height: 1;
      }
    }
  }

  #demo-select-week {
    .dropdown-style {
      max-height: 280px !important;
      .rc-virtual-list-holder {
        max-height: 280px !important;
      }
    }
  }

  #demo-select-month {
    .dropdown-style {
      .ant-select-item-option-content {
        display: flex;
        justify-content: space-between;

        .check-icon {
          display: flex;
          align-items: center;
          font-size: 12px;
        }
      }
    }
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const StyledWorkingHourse = styled.div`
  padding-left: 2px;
  padding-top: 20px;
  overflow: hidden;
  border-radius: 12px;
  background: ${(props) => props.theme.secondaryText};
  box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 20px 25 px - 5 px rgb(0 0 0 / 0.1),
    0 8px 10 px - 6 px rgb(0 0 0 / 0.1);

  .w-14 {
    width: 14%;
  }
  .w-28 {
    width: 28%;
  }
  .w-60 {
    width: 60%;
  }
  .w-25 {
    width: 25%;
  }
  .w-40 {
    width: 40%;
  }
  .w-50 {
    width: 50%;
  }
  .w-100 {
    width: 100%;
  }

  .flex {
    display: flex;
  }

  .item-center {
    display: flex;
    align-items: center;
  }

  .justify-flex-end {
    display: flex;
    justify-content: flex-end;
  }

  .ml-16 {
    margin-left: 16px;
  }

  .mr-16 {
    margin-right: 16px;
  }

  .mt-16 {
    margin-top: 16px;
  }

  .mt-8 {
    margin-top: 8px;
  }

  #demo-select-week {
    /* position: unset !important; */
    /* .dropdown-style {
      z-index: 99999;
      max-height: 280px !important;
      .rc-virtual-list-holder {
        overflow-y: unset !important;
        max-height: 280px !important;
      }
    } */
  }

  #demo-select-month {
    .dropdown-style {
      .ant-select-item-option-content {
        display: flex;
        justify-content: space-between;

        .check-icon {
          display: flex;
          align-items: center;
          font-size: 12px;
        }
      }
    }
  }

  .table__working_hourse--only-me {
    .view-icon path {
      fill: ${(props) => props.theme.strongBlue};
    }
    .ant-table-tbody tr td {
      word-wrap: unset !important;
      word-break: unset !important;
    }
  }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const StyledFunctions: StyledComponent<any, any> = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const BtnFunction: StyledComponent<any, any> = styled.div`
  cursor: pointer;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

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
