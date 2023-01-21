import { Modal } from '@nexthcm/components';
import { Collapse } from 'antd';
import styled, { StyledComponent } from 'styled-components';

export const StyledMyLeaveDetailModal: StyledComponent<any, any> = styled(Modal)`
  .ant-modal-content {
    padding: 32px !important;
  }
`;

export const StyledCollapse: StyledComponent<any, any> = styled(Collapse)`
  .ant-collapse-item {
    border-top: 1px solid #d7d7d7;
    .ant-collapse-header {
      min-height: 56px;
      padding: 12px 20px;
      align-items: center;

      .ant-collapse-expand-icon {
        order: 2;
      }

      .ant-collapse-header-text {
        color: #1b1f3b;
        text-transform: uppercase;
        font-size: 17px;
        font-weight: 600;
      }
    }

    &:hover {
      .ant-collapse-header {
        background: #f6f6f6;
      }
    }

    .ant-collapse-content-box {
      padding: 20px;
    }
  }
`;

export const StyledPanel = styled(Collapse.Panel)``;
