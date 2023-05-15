import styled from "styled-components";

export const StyledMyAppointmentsContainer = styled.div`
  .ant-tabs-top {
    & > .ant-tabs-nav {
      &::before {
        border: 0;
      }
    }
  }

  .appointment-list {
    margin-top: 20px;
  }

  .tag {
    display: inline-block;
    padding: 6px 10px;
    font-weight: 500;
    font-size: 12px;
    border-radius: 6px;
    margin-right: 6px;
    margin-bottom: 6px;

    &.orange {
      background-color: ${({ theme }) => `${theme.lightOrange}15`};
      color: ${({ theme }) => theme.lightOrange};
    }

    &.purple {
      background-color: ${({ theme }) => `${theme.strongBlue}15`};
      color: ${({ theme }) => theme.strongBlue};
    }

    &.red {
      background-color: ${({ theme }) => `${theme.red}15`};
      color: ${({ theme }) => theme.red};
    }
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }

  .user-ctrl {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 15px;

    button {
      height: 50px !important;
    }

    .action {
      display: inline-block;
      padding: 7px 10px;
      border-radius: 6px;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      background-color: ${({ theme }) => `${theme.lightBlue}30`};
      color: ${({ theme }) => theme.lightBlue};

      svg {
        path {
          fill: ${({ theme }) => theme.strongBlue};
        }
      }
    }
  }
`;

export const StyledDoctorInfos = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 15px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .infos {
    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      color: ${({ theme }) => theme.primaryText};
      margin-bottom: 0;
    }

    span {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: ${({ theme }) => theme.baseGray03};
    }
  }
`;
