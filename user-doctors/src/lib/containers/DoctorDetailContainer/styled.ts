import { Calendar } from "antd";
import styled from "styled-components";

export const StyledDoctorDetailContainer = styled.div`
  .content {
    display: flex;
    flex-flow: row nowrap;
    gap: 40px;

    .summary {
      min-width: 340px;
      padding: 20px;
      border-radius: 10px;
      background-color: white;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

      height: 420px;

      display: flex;
      flex-flow: column nowrap;
      gap: 8px;
      align-items: center;

      img {
        width: 150px;
        height: 150px;
        border-radius: 8px;
      }

      .rating {
        padding: 4px 15px;
        border-radius: 10px;
        background-color: #ffefcc;
        color: ${({ theme }) => theme.yellow};

        display: flex;
        align-items: center;
        gap: 6px;

        font-weight: 500;
        margin-bottom: 5px;
      }

      p {
        margin-bottom: 0;
        display: flex;
        align-items: center;
        gap: 10px;

        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
      }

      .bold {
        margin-top: 15px;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        gap: 10px;

        p {
          font-weight: 500;
          font-size: 14px;
          color: ${({ theme }) => theme.baseGray03};
        }
      }
    }

    .tab-content {
      width: 70%;

      .education li {
        color: ${({ theme }) => theme.strongBlue};
      }

      .workAndExperience li {
        color: ${({ theme }) => theme.blue};
      }

      .achievements li {
        color: ${({ theme }) => theme.yellow};
      }

      ul {
        padding: 0;
      }

      li {
        font-size: 20px;
      }

      p {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: ${({ theme }) => theme.baseGray03};
        max-width: 80%;
      }

      .link {
        font-weight: 500 !important;
        color: ${({ theme }) => theme.strongBlue} !important;
      }

      .item-title {
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: ${({ theme }) => theme.baseGray03};
      }

      .item {
        margin-bottom: 20px;
      }

      .specializations {
        list-style-type: none;
        display: flex;
        flex-flow: row wrap;
        gap: 15px;

        .special-item {
          display: block;

          padding: 6px 15px;
          border-radius: 15px;
          background: white;

          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: ${({ theme }) => theme.primaryText};

          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

          cursor: pointer;

          &:hover {
            background: ${({ theme }) => theme.baseGray02};
          }
        }
      }
    }
  }
`;

export const Title = styled.h3`
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  color: ${({ theme }) => theme.primaryText};
`;

export const Line = styled.span`
  width: 100%;
  height: 1.5px;
  background-color: ${({ theme }) => theme.baseGray02};
`;

export const StyledCalendar = styled(Calendar)`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  .ant-picker-cell .ant-picker-cell-inner {
    width: 34px;
    height: 34px;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-picker-cell-in-view.ant-picker-cell-today
    .ant-picker-cell-inner::before {
    border-color: ${({ theme }) => theme.strongBlue};
    border-radius: 50%;
  }

  .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner {
    background-color: ${({ theme }) => theme.strongBlue};
  }
`;

export const StyledDoctorAvailableTimeContainer = styled.div`
  && {
    .time-slots {
      list-style-type: none;
      display: flex;
      flex-flow: row wrap;
      gap: 15px;

      .time-slot-item {
        display: block;

        padding: 6px 15px;
        border-radius: 8px;
        background: white;

        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: ${({ theme }) => theme.baseGray03};

        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

        cursor: pointer;

        &:hover {
          background: ${({ theme }) => theme.baseGray02};
        }
      }
    }
  }
`;
