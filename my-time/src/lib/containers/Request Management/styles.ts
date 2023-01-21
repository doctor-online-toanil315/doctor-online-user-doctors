import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: 0;
  background-color: ${(props) => props.theme.gray};

  .ant-popover-arrow {
    display: none;
  }

  svg {
    height: 6px !important;
    position: absolute;
    left: 12px;
    top: -2px !important;
    path {
      fill: ${(props) => props.theme.secondaryText};
    }
  }
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  font-size: 13px;
  justify-content: space-between;
  line-height: 19.5px;
`;
