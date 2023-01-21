import StyledDropdown from './styles';
import { DropdownProps as AntdDropdownProps } from 'antd';

type DropdownProps = AntdDropdownProps;

const Dropdown = (props: DropdownProps) => {
  return (
    <div id="dropdown" style={{ position: 'relative' }}>
      <StyledDropdown
        {...props}
        placement="bottomRight"
        getPopupContainer={() => document.getElementById('dropdown') as HTMLElement}
      />
    </div>
  );
};

export default Dropdown;
