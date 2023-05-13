import styled from "styled-components";

export const StyledImportDoctorsModal = styled.div`
  padding: 10px;

  h2 {
    font-weight: 500;
    font-size: 22px;
    line-height: 32px;
    color: ${({ theme }) => theme.primaryText};
    margin-bottom: 20px;
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

  .row-danger {
    background-color: ${({ theme }) => `${theme.red}10`} !important;
  }

  .user-ctrl {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    gap: 15px;
    margin-top: 40px;

    button {
      height: 50px !important;
      padding: 0 40px !important;
    }
  }
`;

export const StyledDoctorInfos = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;

  img {
    width: 40px;
    height: 40px;
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

  svg {
    width: 20px !important;
    cursor: pointer;
    path {
      stroke: ${({ theme }) => theme.red};
    }
  }
`;
