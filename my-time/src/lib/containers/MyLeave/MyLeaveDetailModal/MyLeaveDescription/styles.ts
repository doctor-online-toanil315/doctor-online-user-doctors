import styled from 'styled-components';

export const StyledMyLeaveDescription = styled.div`
  .ant-divider {
    margin: 0;
    border-top: 1px solid #d7d7d7;
  }
`;

export const StyledDetail = styled.div`
  display: table;
  padding: 20px 0;
  width: 100%;

  div.ant-typography,
  .ant-typography p {
    margin-bottom: 0;
  }
`;

export const StyledDetailRow = styled.div`
  display: table-row;
`;

export const StyledDetailLabel = styled.div`
  display: table-cell;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 40%;
  color: #1b1f3b;
  vertical-align: middle;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
`;

export const StyledDetailValue = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: 60%;
  padding-left: 32px;
  color: #1b1f3b;
  font-size: 15px;

  & > div {
    width: 320px;
  }

  .ant-typography {
    color: #1b1f3b;
  }

  .ant-tag {
    font-size: 13px;
  }

  .ant-row {
    align-items: center;
    margin: 4px 0;

    .ant-typography {
      margin-left: 8px;
      color: #1b1f3b;
      font-size: 15px;
    }

    .sb-avatar {
      span {
        font-size: 15px;
      }
    }

    .ant-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      margin-left: 8px;
      height: 44px;
      width: 44px;
      background-color: #ebefff;

      svg {
        right: unset;
        top: unset;
        width: 22px;
        height: 22px;

        path {
          stroke: #526ed3;
          stroke-width: 2;
        }
      }
    }
  }

  .ant-typography {
    letter-spacing: break-all;
  }
`;

export const StyledTableButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 20px auto;
  padding: 0 24px;
  height: 44px;
  border: none;
  border-radius: 10px;
  background: #ebefff;
  color: #526ed3;
  font-size: 15px;
  cursor: pointer;

  span {
    font-weight: 600;
  }

  svg {
    path {
      stroke: #526ed3;
    }
  }
`;

export const StyledConfirm = styled.div`
  display: flex;
  z-index: 1;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: auto;
  margin: 1.25em auto 0;
  padding: 0;
  gap: 20px;
`;
