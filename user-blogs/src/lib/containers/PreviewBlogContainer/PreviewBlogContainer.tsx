import React from "react";
import { StyledPreviewBlogContainer } from "./styled";
import { CreateBlogType } from "src/lib/types/BlogType";
import { useGetMeQuery } from "src/lib/services";
import moment from "moment";

interface Props {
  blog?: CreateBlogType;
}

const PreviewBlogContainer = ({ blog }: Props) => {
  const { data: currentUserLogin } = useGetMeQuery();
  return (
    <StyledPreviewBlogContainer>
      <div className="category">
        <span className="category-item">{blog?.category}</span>
      </div>
      <h1>{blog?.title}</h1>
      <div className="author">
        <img src={blog?.doctor?.user?.avatar ?? ""} alt="avatar" />
        <div className="author-infos">
          <p>
            Written by {blog?.doctor?.user?.firstName}{" "}
            {blog?.doctor?.user?.lastName}
          </p>
          <span>Posted on {moment(Date.now()).format("MMMM DD, YYYY")}</span>
        </div>
      </div>
      <img className="thumbnail" src={blog?.thumbnail} alt="thumbnail" />
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: blog?.content }}
      ></div>
    </StyledPreviewBlogContainer>
  );
};

export default PreviewBlogContainer;
