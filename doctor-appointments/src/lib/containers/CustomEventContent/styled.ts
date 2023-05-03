import styled from "styled-components";

export const StyledEventContent = styled.div<{
  color: string;
  isDisable: boolean;
}>`
  width: 100%;
  height: 100%;
  padding: 10px;
  border-left: 3px solid ${({ theme, color }) => `${theme[color]}`};
  background-color: ${({ theme, color }) => `${theme[color]}10`};
  position: relative;

  h4 {
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: ${({ theme }) => theme.primaryText};
  }

  p {
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: ${({ theme }) => theme.baseGray03};
  }

  .user-ctrl {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  .status {
    position: absolute;
    bottom: 0px;
    left: 5px;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 6px;

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;

      &.strongBlue {
        background-color: ${({ theme }) => theme.strongBlue};
      }

      &.red {
        background-color: ${({ theme }) => theme.red};
      }

      &.lightOrange {
        background-color: ${({ theme }) => theme.lightOrange};
      }
    }

    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: ${({ theme }) => theme.primaryText};
    text-transform: capitalize;
  }
`;

export const StyledAppointmentOption = styled.div`
  padding: 5px 10px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;

  svg {
    width: 18px;
    path {
      fill: ${({ theme }) => theme.strongBlue};
    }
  }
`;
