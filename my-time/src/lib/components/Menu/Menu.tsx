import StyledMenu from './styles';
import { MenuProps as AntdMenuProps } from 'antd';

type MenuProps = AntdMenuProps;

const Menu = (props: MenuProps) => {
  return <StyledMenu {...props}></StyledMenu>;
};

export default Menu;
