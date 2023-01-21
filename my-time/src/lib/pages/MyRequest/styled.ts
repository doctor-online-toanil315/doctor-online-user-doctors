import styled from 'styled-components';
import { Menu } from 'antd';
import { Dropdown } from '../../components';

export const StyledFunctions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StyledDropdown = styled(Dropdown)`
  .ant-btn {
    text-align: center !important;
  }
`;

export const ButtonFunction = styled.div`
  .ant-dropdown-trigger {
    display: flex;
  }

  .ant-space-item {
    display: flex;
  }

  cursor: pointer;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  transition: all 0.3s;

  svg {
    path {
      fill: ${(props) => props.theme.blue};
      transition: all 0.3s;
    }
  }

  &:hover {
    background: ${(props) => props.theme.softBlue};

    svg {
      path {
        fill: ${(props) => props.theme.blueHover};
      }
    }
  }
`;

export const StyleBackgroundStatus = styled.div`
  height: 24px;
  display: flex;
  align-items: center;

  .myTime-status {
    padding: 0 10px;
    border-radius: 8px;
    font-size: 13px;
    cursor: default;
    line-height: 24px;
    white-space: nowrap;
    color: ${(props) => props.theme.secondaryText};
  }
`;

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

export const StyledButtonShow = styled.div`
  .btnShow {
    border: none;
    background-color: transparent;
    color: #0000ff;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
  }
`;

export const StyledShowTextModal = styled.div`
  max-width: 330px;

  .btnShow {
    border: none;
    background-color: transparent;
    color: #0000ff;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
  }
`;

export const StyledDateRange = styled.div`
  white-space: nowrap;
`;
