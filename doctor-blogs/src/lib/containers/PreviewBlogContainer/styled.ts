import styled from "styled-components";

export const StyledPreviewBlogContainer = styled.div`
  .category {
    margin-bottom: 25px;
    .category-item {
      font-size: 14px;
      font-weight: 700;
      color: ${({ theme }) => theme.strongBlue};

      padding: 8px 14px;
      border: 2px solid ${({ theme }) => theme.strongBlue};
      border-radius: 15px;
    }
  }

  h1 {
    font-size: 24px;
    font-weight: 700;
    line-height: 1.25;
  }

  .author {
    display: flex;
    flex-flow: row nowrap;
    gap: 15px;
    align-items: center;
    margin: 25px 0;

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

  .thumbnail {
    width: 100%;
    max-height: 600px;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 20px;
  }

  .content {
    width: 90%;
    margin: 0 auto;

    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 26px;
      color: ${({ theme }) => theme.baseGray03};
    }

    img {
      display: block;
      width: 70%;
      margin: 0 auto;
    }
  }
`;
