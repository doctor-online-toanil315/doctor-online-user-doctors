import styled from 'styled-components';
import { Modal } from '@nexthcm/components';

export const StyledModalNotification = styled(Modal)`
  .ant-modal-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .ant-modal-content {
    background: rgb(239, 240, 242);
    opacity: 0.8;
  }
`;
