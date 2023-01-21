import { flexCenter, flexSpaceBetween } from '@nexthcm/common';
import styled from 'styled-components';

export const StyledCommentItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const StyledGroupButton = styled.div`
  ${flexSpaceBetween}
`;

export const StyledButtonFunction = styled.div`
  ${flexCenter}
  width: 32px;
  height: 32px;
  border-radius: 10px;
  transition: all 0.3s;
  cursor: pointer;

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

export const StyledConfirm = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 0;
  margin: 1.25em auto 0;
  width: auto;
  box-sizing: border-box;
  z-index: 1;
`;
