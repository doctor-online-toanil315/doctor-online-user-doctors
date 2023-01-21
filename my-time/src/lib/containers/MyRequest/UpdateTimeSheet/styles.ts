import { flexCenter } from '@nexthcm/common';
import styled from 'styled-components';

export const ButtonFunction = styled.div`
  cursor: pointer;
  width: 44px;
  height: 44px;
  ${flexCenter};
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
