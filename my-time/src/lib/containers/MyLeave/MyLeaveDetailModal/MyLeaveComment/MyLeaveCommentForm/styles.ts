import styled from 'styled-components';

export const StyledMyLeaveCommentForm = styled.div`
  margin-top: 10px;

  button {
    margin-top: 8px;
    padding: 0 12px !important;
    height: 32px;
    border: none;
    border-radius: 8px;
    font-size: 13px !important;
    font-weight: 400 !important;
    transition: all 0.3s;
    cursor: pointer;

    &.btn-comment-submit {
      background: #ebefff !important;
      color: #526ed3 !important;

      &:hover {
        background: #dfe3f3 !important;
      }
    }
  }
`;

export const StyledGroupButton = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 4px;
  gap: 10px;
`;
