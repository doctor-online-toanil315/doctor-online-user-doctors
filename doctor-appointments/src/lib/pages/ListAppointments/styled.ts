import styled from "styled-components";

export const StyledListAppointments = styled.div`
  .header {
    h1 {
      font-weight: 700;
      font-size: 22px;
      line-height: 40px;
      color: ${({ theme }) => theme.primaryText};
    }

    p {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: ${({ theme }) => theme.baseGray03};
      margin: 20px 0;

      .bold {
        font-weight: 700;
        color: ${({ theme }) => theme.primaryText};
      }
    }
  }

  .user-ctrl {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 15px;

    .type-of-list {
      padding: 10px 15px;

      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 10px;

      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      text-transform: capitalize;

      background-color: ${({ theme }) => theme.baseGray02};
      color: ${({ theme }) => theme.primaryText};
      border-radius: 6px;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05);
      transition: all 0.1s ease-out;
      cursor: pointer;

      svg {
        path {
          fill: ${({ theme }) => theme.primaryText};
        }
      }

      &:hover {
        background-color: ${({ theme }) => theme.lightGray};
      }

      &.active {
        background-color: ${({ theme }) => theme.strongBlue} !important;
        font-weight: 600;
        color: white;

        svg {
          path {
            fill: ${({ theme }) => theme.white};
          }

          rect {
            fill: ${({ theme }) => theme.white};
          }
        }
      }
    }
  }

  .list {
    margin-top: 20px;
  }
`;
