import styled from "styled-components";

export const StyledListAppointmentContainer = styled.div`
  .header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 20px;

    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: ${({ theme }) => theme.primaryText};

    .user-ctrl {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 10px;

      .action {
        padding: 5px;
        border-radius: 5px;
        background-color: ${({ theme }) => theme.baseGray02};
        transition: all 0.2s ease-out;
        cursor: pointer;

        &:hover {
          background-color: ${({ theme }) => theme.lightGray};
        }
      }
    }
  }

  .appointment-list {
    display: flex;
    flex-flow: column nowrap;
    gap: 20px;
    margin-top: 25px;

    .appointment-item {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      padding: 20px;
      border-radius: 10px;
      background-color: white;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

      &.inactive {
        background-color: ${({ theme }) => theme.grayBlue};
        opacity: 0.6;
        cursor: no-drop;
        pointer-events: none;
      }

      .user-infos {
        width: 60%;
        display: flex;
        flex-flow: row nowrap;
        gap: 15px;

        img {
          width: 90px;
          height: 90px;
          border-radius: 6px;
        }

        .infos {
          p {
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            color: ${({ theme }) => theme.baseGray03};
            margin-bottom: 6px;

            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            gap: 5px;
          }
        }
      }

      .left {
        width: 40%;
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-end;
        gap: 10px;

        .user-ctrl {
          .action {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            gap: 10px;

            padding: 6px 14px;
            background-color: ${({ theme }) => theme.baseGray02};
            border-radius: 6px;

            font-weight: 500;
            font-size: 14px;
            line-height: 22px;
            color: ${({ theme }) => theme.baseGray03};
            transition: all 0.2s ease-out;
            cursor: pointer;

            svg {
              width: 12px;
              path {
                fill: ${({ theme }) => theme.baseGray03};
              }
            }

            &:hover {
              background-color: ${({ theme }) => theme.lightGray};
            }

            &.orange {
              background-color: ${({ theme }) => theme.lightOrange} !important;
              color: white;

              svg {
                path {
                  fill: white;
                }
              }
            }

            &.red {
              background-color: ${({ theme }) => theme.red} !important;
              color: white;

              svg {
                path {
                  fill: white;
                }
              }
            }

            &.purple {
              background-color: ${({ theme }) => theme.strongBlue} !important;
              color: white;

              svg {
                path {
                  fill: white;
                }
              }
            }

            &.blue {
              background-color: ${({ theme }) => theme.lightBlue} !important;
              color: white;

              svg {
                path {
                  fill: white;
                }
              }
            }
          }
        }

        .status {
          margin-bottom: 0;
          font-weight: 500;
          font-size: 14px;
          line-height: 22px;

          .dot {
            display: inline-block;
            width: 6px;
            height: 6px;
            margin-left: 5px;
            border-radius: 50%;
          }

          &.orange {
            color: ${({ theme }) => theme.lightOrange};

            .dot {
              background-color: ${({ theme }) => theme.lightOrange};
            }
          }

          &.purple {
            color: ${({ theme }) => theme.strongBlue};

            .dot {
              background-color: ${({ theme }) => theme.strongBlue};
            }
          }

          &.red {
            color: ${({ theme }) => theme.red};

            .dot {
              background-color: ${({ theme }) => theme.red};
            }
          }
        }

        .price {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          gap: 5px;

          font-weight: 500;
          font-size: 16px;
          line-height: 22px;
          color: ${({ theme }) => theme.strongBlue};
          margin-bottom: 0;

          svg {
            width: 10px;
            path {
              fill: ${({ theme }) => theme.strongBlue};
            }
          }
        }
      }
    }
  }
`;
