import styled from 'styled-components';

export const Container = styled.div`
  .container-specify-time {
    display: grid;
    column-gap: 16px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    div {
      &:hover {
        svg {
          opacity: 0.7;
        }
      }
    }

    span {
      svg {
        opacity: 0.5;
      }

      left: unset;
      right: 16px;
    }

    input {
      padding-left: 16px;
    }

    label {
      left: 16px;
    }
  }
`;

export const BtnWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  .ant-btn.ant-btn[disabled],
  .ant-btn.ant-btn[disabled]:hover,
  .ant-btn.ant-btn[disabled]:active {
    cursor: default;
    color: ${(props) => props.theme.secondaryText};
    background: ${(props) => props.theme.strongBlue};
    svg {
      path {
        fill: ${(props) => props.theme.secondaryText};
      }
    }
  }
`;
