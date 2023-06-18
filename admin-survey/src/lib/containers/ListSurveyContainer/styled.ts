import styled from "styled-components";

export const StyledListSurveyContainer = styled.div`
  margin-top: 15px;

  .ant-pagination {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;

    .ant-pagination-item-link,
    .ant-pagination-item {
      border-radius: 4px;
      vertical-align: middle;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .ant-pagination-item:hover a {
      color: ${({ theme }) => theme.strongBlue};
    }

    .ant-pagination-item:hover {
      border-color: ${({ theme }) => theme.strongBlue};
    }

    .ant-pagination-next:hover .ant-pagination-item-link {
      border-color: ${({ theme }) => theme.strongBlue};
      color: ${({ theme }) => theme.strongBlue};
    }

    .ant-pagination-item-active {
      border-color: ${({ theme }) => theme.strongBlue};
    }

    .ant-pagination-item-active a {
      color: ${({ theme }) => theme.strongBlue};
    }
  }

  .empty {
    margin-top: 20px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    img {
      width: 30%;
    }

    p {
      font-weight: 500 !important;
      color: ${({ theme }) => theme.strongBlue} !important;
    }
  }

  .survey-list {
    margin-top: 80px;
    min-height: 70vh;
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    h1 {
      font-weight: 700;
      font-size: 22px;
      line-height: 33px;
    }

    button {
      height: 50px !important;
      padding: 0 40px !important;
    }
  }
`;
export const StyledSurveyItem = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 15px;
  padding: 50px 0 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: relative;
  background-color: white;

  .type-icon {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => `${theme.strongBlue}40`};
    border-radius: 50%;

    img {
      width: 60%;
      height: 60%;
      object-fit: cover;
    }
  }

  .date {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.baseGray03};
    margin-bottom: 0;
  }
  .title {
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: ${({ theme }) => theme.primaryText};
    margin-bottom: 0;
  }
  .type {
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    color: ${({ theme }) => theme.baseGray03};
    margin-bottom: 0;
  }
  .receivers {
    padding: 4px 12px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.blue};
    font-weight: 500;
    font-size: 12px;
    line-height: 22px;
    color: white;
    margin-bottom: 0;
  }

  .view {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.lightOrange};
  }
`;
