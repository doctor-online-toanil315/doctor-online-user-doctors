import { flexCenter, flexSpaceBetween } from '@nexthcm/common';
import styled from 'styled-components';

export const StyledUpdate = styled.div`
  .ant-table-cell {
    color: ${(props) => props.theme.baseGray03};
    padding: 16px 6px;

    &.nowrap {
      white-space: nowrap;
    }

    .center {
      text-align: center;

      &.ant-space {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .ant-table-column-sorters {
      display: inline-flex;
    }

    svg {
      path {
        fill: ${(props) => props.theme.link};
      }
    }
  }

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
`;

export const StyledTableFunction = styled.div`
  ${flexSpaceBetween}
  justify-content: unset;
`;

export const StyledTableButton = styled.div`
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
