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

export const StyledDate = styled.div`
  .date {
    white-space: nowrap;
  }
`;
