import styled from "styled-components";

export const StyledGenderOverview = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 15px;

  .annotate {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;

    li {
      font-size: 20px;
      line-height: 1;

      &.male {
        color: ${({ theme }) => theme.orange};
      }

      p {
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        color: ${({ theme }) => theme.primaryText};
        margin-bottom: -2px;
        text-transform: capitalize;
      }

      span {
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
        color: ${({ theme }) => theme.baseGray03};
      }
    }
  }
`;
