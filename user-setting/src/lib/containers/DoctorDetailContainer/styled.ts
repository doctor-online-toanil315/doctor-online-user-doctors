import { Calendar } from "antd";
import styled from "styled-components";

export const StyledDoctorDetailContainer = styled.div`
  .content {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
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
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;

        position: relative;
        &::before {
          content: "";
          position: absolute;
          top: 8px;
          left: -18px;

          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: ${({ theme }) => theme.strongBlue};
        }
      }

      .workAndExperience li {
        color: ${({ theme }) => theme.blue};
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;

        position: relative;
        &::before {
          content: "";
          position: absolute;
          top: 8px;
          left: -18px;

          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: ${({ theme }) => theme.blue};
        }
      }

      .achievements li {
        color: ${({ theme }) => theme.yellow};
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;

        position: relative;
        &::before {
          content: "";
          position: absolute;
          top: 8px;
          left: -18px;

          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: ${({ theme }) => theme.yellow};
        }
      }

      .education {
        button {
          height: 40px !important;
          padding: 0 20px !important;
          font-size: 13px;
        }
      }

      .workAndExperience {
        button {
          height: 40px !important;
          padding: 0 20px !important;
          background-color: ${({ theme }) => theme.blue};
          font-size: 13px;
        }
      }

      .achievements {
        button {
          height: 40px !important;
          padding: 0 20px !important;
          background-color: ${({ theme }) => theme.yellow};
          font-size: 13px;
        }
      }

      .doctor-infos-delete {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: ${({ theme }) => `${theme.red}10`};

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
        svg {
          width: 22px !important;
          path {
            fill: ${({ theme }) => theme.red};
          }
        }
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
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;

          padding: 6px 15px;
          border-radius: 15px;
          background: white;

          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: ${({ theme }) => theme.primaryText};

          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

          cursor: default;

          &:hover {
            background: ${({ theme }) => theme.baseGray02};
          }

          svg {
            width: 16px !important;
            path {
              fill: ${({ theme }) => theme.primaryText};
            }
          }

          .delete {
            cursor: pointer;
            svg {
              width: 10px !important;
              height: 10px !important;
              path {
                fill: ${({ theme }) => theme.baseGray03};
              }
            }
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
  height: 1px;
  background-color: ${({ theme }) => theme.lightGray};
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
    .time-slot-panel {
      width: 70%;
    }

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

        &.inactive {
          text-decoration-line: line-through;
          background: ${({ theme }) => theme.baseGray02};
          cursor: no-drop;
        }

        &.my-time-slot {
          background: ${({ theme }) => theme.strongBlue};
          color: white;
          cursor: no-drop;
        }
      }
    }
  }
`;

export const StyledDoctorReviewsContainer = styled.div`
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    p {
      &.feedback {
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        text-decoration-line: underline;
        color: ${({ theme }) => theme.strongBlue};

        margin-bottom: 0;
        cursor: pointer;
      }
    }
  }

  .number-of-result {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: ${({ theme }) => theme.baseGray03};
    margin-bottom: 15px;
  }

  ul {
    list-style-type: none;
  }
`;

export const StyledDoctorReviewsItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 15px;
  margin-top: 20px;

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  }

  .review-content {
    .header {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: baseline;

      .content {
        width: 50%;
        display: flex;
        flex-flow: column nowrap;
        gap: 10px;

        h5 {
          margin-bottom: 0;
        }

        p {
          margin-bottom: 0;

          &.used-service {
            font-weight: 500;
          }

          &.recommend {
            display: flex;
            align-items: center;
            flex-flow: row nowrap;
            gap: 5px;

            font-weight: 500;
            color: ${({ theme }) => theme.strongBlue};

            svg {
              path {
                stroke: ${({ theme }) => theme.strongBlue} !important;
              }
            }
          }
        }
      }

      .rating {
        display: flex;
        flex-flow: row nowrap;
        gap: 10px;
      }
    }

    .review {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;

      margin-top: 15px;
    }

    .happy-with {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 10px;

      span {
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;

        &.happy-item {
          color: ${({ theme }) => theme.primaryText};
          padding: 4px 14px;
          background-color: ${({ theme }) => theme.lightGray};
          border-radius: 6px;
          cursor: default;
        }
      }
    }
  }
`;

export const StyledAppointmentModal = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 20px;

  .patient-infos {
    width: 48%;
  }

  .book-summary {
    width: 48%;
    padding: 20px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.grayBlue};

    .time-appointment {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;

      span {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 6px;

        font-weight: 400;
        font-size: 12px;
        line-height: 24px;
        color: ${({ theme }) => theme.baseGray03};

        .bold {
          font-weight: 500;
          color: ${({ theme }) => theme.primaryText};
        }
      }
    }

    .doctor-infos {
      display: flex;
      flex-flow: row nowrap;
      gap: 15px;
      margin-top: 20px;

      h3,
      p {
        margin-bottom: 0;
      }

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }

    .payment {
      margin-top: 20px;
      .payment-infos {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;

        p {
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          margin-bottom: 0;
          color: ${({ theme }) => theme.baseGray03};
        }
      }
    }
  }

  .user-ctrl {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const StyledMyProfile = styled.div`
  h1 {
    font-weight: 700;
    font-size: 24px;
    line-height: 48px;
  }

  .profile-picture {
    h3 {
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .container {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      border: 1px solid ${({ theme }) => theme.lightGray};
      border-radius: 10px;

      .picture {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 10px;

        img {
          display: block;
          width: 75px;
          height: 75px;
          border-radius: 50%;
        }

        span {
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: ${({ theme }) => theme.baseGray03};
        }
      }
    }
  }

  .user-ctrl {
    margin-left: auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;

    button {
      height: 50px !important;
      padding: 0 40px !important;
    }
  }
`;

export const StyledChangePassword = styled(StyledMyProfile)`
  width: 420px;
  margin: 0 auto;

  .user-ctrl {
    width: 100%;
    button {
      width: 100% !important;
    }
  }
`;

export const StyledDoctorInfos = styled(StyledMyProfile)`
  .biography {
    .user-ctrl {
      margin-top: 20px;
      width: fit-content;
      margin-left: auto;

      button {
        height: 45px !important;
        padding: 0 40px !important;
      }
    }
  }

  .add-more-specialize {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 14px;

    input {
      border: none;
      background-color: transparent;
      &:focus {
        outline: none;
      }
    }
    .confirm {
      cursor: pointer;
      svg {
        path {
          fill: ${({ theme }) => theme.strongBlue} !important;
        }
      }
    }

    .cancel {
      cursor: pointer;
      svg {
        width: 14px !important;
        height: 14px !important;

        path {
          fill: ${({ theme }) => theme.red} !important;
        }
      }
    }
  }
`;

export const StyledDoctorInfoModal = styled.div`
  .user-ctrl {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    gap: 15px;
    margin-left: auto;

    button {
      height: 50px !important;
      padding: 0 40px !important;
    }
  }
`;
