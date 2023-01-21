import styled, { StyledComponent } from 'styled-components';
import { flexCenter, flexEnd, flexSpaceBetween } from '@nexthcm/common';
import { Table } from '@nexthcm/components';

export const StyledButtonList = styled.div`
  ${flexEnd};
  gap: 16px;
  margin: 16px 0;
`;

export const StyledNameTable = styled.div`
  padding: 10px 6px;
  line-height: 21px;

  .fullName {
    text-transform: uppercase;
    color: #50596c;
    font-size: 14px;
    font-weight: 700;
  }
`;

export const StyledFunctions = styled.div`
  ${flexSpaceBetween}
`;

export const StyleBackgroundStatus = styled.div`
  height: 24px;
  display: flex;
  align-items: center;

  .myTime-status {
    padding: 0 10px;
    border-radius: 8px;
    font-size: 13px;
    cursor: default;
    line-height: 24px;
    white-space: nowrap;
    color: ${(props) => props.theme.secondaryText};
  }
`;

export const ButtonFunction = styled.div`
  .ant-dropdown-trigger {
    display: flex;
  }

  .ant-space-item {
    display: flex;
  }

  cursor: pointer;
  width: 44px;
  height: 44px;
  ${flexCenter};
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

export const StyledTotalTable = styled.div`
  .ant-btn {
    margin: 16px 0;
  }
`;

export const StyleTable: StyledComponent<any, any> = styled(Table)`
  .ant-checkbox-indeterminate {
    .ant-checkbox-inner::after {
      opacity: 0 !important;
    }
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: rgb(217, 217, 217) !important;
  }

  tbody {
    tr {
      &.ant-table-row-selected {
        td {
          background-color: white !important;
        }
      }
    }
  }

  .ant-checkbox-checked {
    .ant-checkbox-inner {
      background-color: rgb(7, 74, 189);
      border-color: rgb(7, 74, 189) !important;
    }
  }

  .ant-checkbox-disabled {
    display: none;
  }
`;

export const StyledText = styled.div`
  .text {
    white-space: nowrap;
  }
`;
