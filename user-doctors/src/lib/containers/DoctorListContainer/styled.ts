import styled from "styled-components";

export const StyledDoctorListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;
`;

export const StyledDoctorCardContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  gap: 40px;

  .doctor-infos {
    width: 70%;
    display: flex;
    flex-flow: row nowrap;
    gap: 20px;

    .doctor-img {
      width: 150px;
      height: 150px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
        object-fit: cover;
      }
    }

    .infos {
      h3 {
        font-weight: 600;
        font-size: 18px;
        line-height: 26px;
        color: ${({ theme }) => theme.primaryText};
        margin-bottom: 15px;
      }

      .rating {
        display: flex;
        align-items: center;
        color: ${({ theme }) => theme.yellow};
        margin-bottom: 15px;

        span {
          display: flex;
          align-items: center;
          font-weight: 500;
          font-size: 14px;

          &.dot {
            display: block;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: ${({ theme }) => theme.yellow};
            margin: 0 8px;
          }
        }
      }

      p {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: ${({ theme }) => theme.baseGray03};
        margin-bottom: 15px;

        display: flex;
        flex-flow: row nowrap;
        gap: 10px;
      }
    }
  }

  .appointment-infos {
    display: flex;
    flex-flow: column nowrap;

    p {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 10px;
    }

    button {
      height: 48px !important;
      padding: 0 30px;
    }
  }
`;
