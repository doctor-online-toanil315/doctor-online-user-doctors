import styled from 'styled-components';

export const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h2 {
    margin: 0;
  }

  .right {
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: center;
  }

  .ant-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0;
    background-color: transparent;

    &:hover {
      background-color: transparent;

      path {
        fill: ${(props) => props.theme.primaryText};
      }
    }

    svg {
      right: 0;
      top: 0;

      path {
        transition: all ease-in-out 0.3s;

        fill: ${(props) => props.theme.strongGray};
      }
    }
  }
`;
