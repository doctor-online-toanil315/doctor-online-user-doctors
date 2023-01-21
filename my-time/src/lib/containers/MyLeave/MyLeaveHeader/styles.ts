import { Modal } from '@nexthcm/components';
import styled, { StyledComponent } from 'styled-components';

export const StyledHeader = styled.div`
  .header {
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;

    .user-control {
      display: flex;
      align-items: center;

      button {
        display: flex !important;
        justify-content: center;
        align-items: center;
        padding: 0 24px !important;
        height: 44px !important;
        margin-left: 15px;

        &.icon-only {
          padding: 0 10px !important;

          svg {
            right: 0 !important;
          }
        }

        svg {
          top: 0 !important;
        }
      }
    }
  }
`;

export const StyledModal: StyledComponent<any, any> = styled(Modal)`
  .ant-modal-content {
    padding: 32px !important;
  }
`;
