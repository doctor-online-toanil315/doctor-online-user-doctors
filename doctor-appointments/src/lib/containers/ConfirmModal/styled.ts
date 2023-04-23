import styled from "styled-components";

export const StyledConfirmModal = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;

  p {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 10px;
    margin-bottom: 0;

    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: ${({ theme }) => theme.baseGray03};

    .icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.grayBlue};

      display: flex;
      justify-content: center;
      align-items: center;

      &.blue {
        svg {
          path {
            stroke: ${({ theme }) => theme.blue};
          }
        }
      }

      &.purple {
        svg {
          path {
            fill: ${({ theme }) => theme.strongBlue};
          }
        }
      }
    }
  }

  .consultation-type {
    padding: 11px 20px;
    background-color: ${({ theme }) => theme.lightGray};
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: ${({ theme }) => theme.baseGray03};
    border-radius: 6px;
  }

  button {
    height: 45px !important;
  }
`;
