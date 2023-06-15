import styled from "styled-components";

export const StyledBlogListContainer = styled.div`
  padding: 20px;

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    h1 {
      font-weight: 700;
      font-size: 22px;
      line-height: 33px;
    }

    button {
      height: 45px !important;
      padding: 0 40px !important;
    }
  }

  .blog-item {
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    .header {
      display: flex;
      flex-flow: row nowrap;
      gap: 20px;
      margin-bottom: 20px;

      img {
        width: 100px;
        border-radius: 10px;
      }

      .header-content {
        p {
          font-size: 14px;
          font-weight: 700;
          color: ${({ theme }) => theme.strongBlue};
          line-height: 20px;
          margin-bottom: 5px;
        }

        h3 {
          font-size: 22px;
          font-weight: 700;
          line-height: 1.5;
          cursor: pointer;
        }
      }
    }

    .author {
      display: flex;
      flex-flow: row nowrap;
      gap: 15px;
      align-items: center;
      margin: 15px 0;

      img {
        height: 60px;
        width: 60px;
        border-radius: 50%;
      }

      .author-infos {
        p {
          font-size: 16px;
          font-weight: 700;
          line-height: 24px;
          margin-bottom: 0;
        }

        span {
          font-weight: 600;
          font-size: 14px;
          line-height: 18px;
          color: ${({ theme }) => theme.baseGray03};
        }
      }
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
`;
