import { Popover } from 'antd';
import styled from 'styled-components';

export const ContentStyled = styled.div`
  background-color: #fff;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
`;
export const StyledList = styled.div`
  max-height: 400px;
  z-index: 0;
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;

  .ant-list {
    border: none;

    .ant-list-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      border: none;
      cursor: pointer;
      padding: 20px;

      &.unread {
        background-color: #f0f8ff;
      }

      .more-button {
        z-index: 999;
        opacity: 0;
        padding: 0;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;

        svg {
          top: 0;
          right: 0;

          path {
            fill: #526ed3;
          }
        }
      }

      &:hover {
        background-color: #d3e9ff;

        .more-button {
          opacity: 1;
        }
      }

      .main {
        flex: 1 1;
        font-size: 16px;
        line-height: 24px;

        .mb-8 {
          margin-bottom: 8px;
        }

        .notification-user {
          font-weight: bold;
        }
      }

      .dot-read {
        position: absolute;
        left: 12px;
        top: 12px;
        width: 12px;
        height: 12px;
        background-color: rgb(239 68 68);
        border-radius: 50%;
      }

      p {
        color: ${(props) => props.theme.link};
        font-size: 12px;
        line-height: 16px;
        margin: 0;
      }
    }
  }
`;
export const StyledHead = styled.div`
  margin-left: 16px;
  margin-right: 16px;
  position: relative;

  .ant-tabs {
    flex: 1 1;
    display: flex;

    .ant-tabs-nav {
      margin-bottom: 0;
    }
  }

  .switch {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 13px;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;

    .ant-switch {
      outline: 1px solid #e5e7eb;
      min-height: auto;
      background: #ebefff;

      &.ant-switch-checked {
        background: #074abd;
      }
    }
  }
`;

export const StyledPopover = styled(Popover)``;
