import styled from 'styled-components';
import { Menu } from 'antd';

export const StyleMenu = styled(Menu)`
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
      font-weight: 300;
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
