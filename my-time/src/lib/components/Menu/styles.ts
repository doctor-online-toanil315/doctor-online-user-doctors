import { Menu } from 'antd';
import styled, { StyledComponent } from 'styled-components';

const StyledMenu: StyledComponent<any, any> = styled(Menu)`
  padding: 8px 0;
  border-radius: 10px;
  border: 1px solid #ededed;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 16%);
  background-color: #fff;
  z-index: 0;

  .ant-dropdown-menu-item {
    padding: 0;

    .ant-btn {
      display: block;
      margin: 0 auto;
      padding: 6px 16px;
      width: 100%;
      height: 44px;
      background-color: transparent;
      color: black;
      text-align: left;
      font-weight: 400;
    }
  }
`;

export default StyledMenu;
