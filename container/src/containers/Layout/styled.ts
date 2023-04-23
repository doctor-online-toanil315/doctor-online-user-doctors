import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;

  .right {
    width: 85%;
    height: 100vh;
    padding: 0 15px 15px;
    background: ${({ theme }) => theme.grayBlue};

    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    &::-webkit-scrollbar {
      width: 8px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: ${({ theme }) => theme.lightGray};
    }
  }

  .left {
    width: 15%;
  }
`;
