import styled from 'styled-components';

export const StyledCheckActions = styled.div`
  .btn-close {
    margin-top: 0 !important;
    position: absolute;
    right: 8px;
    top: 8px;
    height: 32px;
    width: 32px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      top: 0;
      right: 0;
      width: 14px;
      height: 14px;

      path {
        fill: ${(props) => props.theme.link};
      }
    }
  }

  .svg-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ant-btn {
    margin-top: 24px;
  }
`;
