import { Popover } from 'antd';
import styled from 'styled-components';

export const StyledNotification = styled.div`
  width: 500px;
  background-color: ${(props) => props.theme.gray};

  // button {
  //   align-items: center;
  //   justify-content: center;
  //   display: flex;
  //   min-height: 44px;
  //   width: 100%;
  //   background-color: transparent;
  //   outline: none;
  //   border: none;
  //   cursor: pointer;
  //   white-space: nowrap;
  //   text-decoration: none;
  //   transition: background 300ms ease-in-out;
  //
  //   path {
  //     fill: ${(props) => props.theme.strongGray};
  //   }
  // }

  section {
    padding: 20px;
  }
`;

export const StyledNotifications = styled.div`
  position: relative;

  .ant-badge-count {
    right: 2px;
    box-shadow: 0 0 0 2px;
    padding: 0 6px;
    background-color: #ff0000;
    font-size: 11px;
  }
`;

export const StyledPopover = styled(Popover)``;
