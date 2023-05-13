import styled from "styled-components";

export const StyledHomeContainer = styled.div`
  width: calc(100% - 30px);

  .welcome {
    padding: 20px 0 30px;

    span {
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: ${({ theme }) => theme.baseGray03};
    }
    h2 {
      font-weight: 600;
      font-size: 20px;
      line-height: 35px;
    }
  }
`;
export const TopDoctorContainer = styled.div`
  padding: 30px;
  background-color: white;
  border-radius: 14px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  height: 400px;

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
`;

export const TopContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 20px;
`;

export const Title = styled.h2`
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  color: ${({ theme }) => theme.primaryText};
`;
export const StyledViewAll = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.link};

  svg {
    width: 12px;
    path {
      fill: ${({ theme }) => theme.link};
    }
  }
`;

export const DoctorCardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  gap: 15px;

  padding: 24px 20px;
  background-color: ${({ theme }) => theme.grayBlue};
  border-radius: 10px;
  box-shadow: 0 2 5px rgba(0, 0, 0, 0.1);
  transition: all 0.1s ease-in;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
  }

  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }

  .infos {
    display: flex;
    flex: 1;
    flex-flow: column nowrap;
    gap: 8px;

    h4 {
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 0;
    }

    p {
      width: 100%;
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;
      margin-bottom: 0;

      display: flex;

      span {
        font-weight: 400;
        font-size: 12px;
        color: ${({ theme }) => theme.baseGray03};

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 4px;
      }

      .dot {
        padding: 0 6px !important;
      }

      svg {
        display: inline-block;
        margin-left: auto;
      }
    }
  }
`;

export const RecentActivityContainer = styled.div``;
export const RecentActivityItemContainer = styled.div`
  padding: 15px 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: default;

  &:hover {
    background-color: ${({ theme }) => theme.gray} !important;
  }

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;

  .sender {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    gap: 10px;

    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }

    .infos {
      h4 {
        margin-bottom: 0;
      }

      span {
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
      }
    }
  }

  .content {
    max-width: 50%;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 0;
  }
`;

export const YourPrescriptionContainer = styled.div``;
export const PrescriptionItemContainer = styled.div`
  & {
    .ant-collapse {
      border-radius: 6px !important;
    }

    .ant-collapse-header {
      background-color: ${({ theme }) => theme.grayBlue};
      padding: 10px 15px;
      border-radius: 6px !important;

      flex-flow: row-reverse nowrap;
    }
  }
`;

export const PrescriptionDetail = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};

  &:last-child {
    border-bottom: 0 !important;
  }

  p {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 4px;
  }

  span {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
  }
`;

export const AppointmentCard = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;

  .doctor-infos {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    gap: 15px;

    padding: 10px 20px;
    border-radius: 10px;

    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }

    div {
      display: flex;
      flex-flow: column nowrap;
      gap: 8px;

      h4 {
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        margin-bottom: 0;
      }

      p {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 0;
      }
    }
  }

  .date-time-appointment {
    display: flex;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.grayBlue};
    padding: 12px;
    border-radius: 10px;

    span {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
    }
  }

  .user-controls {
    display: flex;
    justify-content: space-between;

    button {
      height: 50px;
      width: 40%;
    }
  }
`;
