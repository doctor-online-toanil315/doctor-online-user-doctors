import { Button, Modal } from '@nexthcm/components';
import styled, { StyledComponent } from 'styled-components';

export const StyledHeader = styled.div<{ isShowDropdown: boolean }>`
  .header {
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;

    button {
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        right: unset;
        position: unset;
        top: unset;
        margin-left: 10px;
        width: 12px;
        height: 6px;
        transition: transform 400ms ease !important;
        transform: ${(props) => (props.isShowDropdown ? 'rotate(90deg) !important;' : '')};

        path {
          fill: white !important;
        }
      }
    }

    .ant-dropdown {
      button {
        text-align: left;
      }
    }
  }
`;

export const StyledModal: StyledComponent<any, any> = styled(Modal)`
  .ant-modal-content {
    padding: 32px !important;
  }
`;
