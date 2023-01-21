import { flexSpaceBetween } from '@nexthcm/common';
import styled from 'styled-components';

export const StyledComment = styled.div``;

export const StyledItemComment = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const StyledContentComment = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoComment = styled.div`
  display: flex;
`;

export const EventComment = styled.div`
  ${flexSpaceBetween}
`;

export const StyledFormComment = styled.div`
  margin-top: 10px;

  button {
    border: none;
    height: 32px;
    border-radius: 8px;

    padding: 0 12px !important;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 13px !important;
    margin-top: 8px;
    font-weight: 400 !important;

    &.btn-comment-submit {
      background: #ebefff !important;
      color: #526ed3 !important;

      &:hover {
        background: #dfe3f3 !important;
      }
    }
  }
`;

export const GroupButtonComment = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 4px;
  gap: 10px;
`;
