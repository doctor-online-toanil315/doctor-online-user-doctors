import styled from "styled-components";

export const SidebarContainer = styled.div`
  padding: 10px 5px;

  .link-list {
    padding-top: 20px;
  }
`;
export const SidebarItemContainer = styled.div`
  .item {
    display: flex;
    flex-flow: row nowrap;
    align-items: "center";
    gap: 10px;

    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.primaryText};

    border-radius: 10px;
    padding: 12px;

    &.active {
      color: ${({ theme }) => theme.strongBlue};
      background: ${({ theme }) => theme.grayBlue};

      svg {
        path {
          stroke: ${({ theme }) => theme.strongBlue};
        }

        rect {
          fill: ${({ theme }) => theme.strongBlue};
        }
      }
    }
  }
`;
