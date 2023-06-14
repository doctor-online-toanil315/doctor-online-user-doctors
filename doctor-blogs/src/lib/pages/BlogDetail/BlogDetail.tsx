import React from "react";
import { useParams } from "react-router-dom";
import PreviewBlogContainer from "src/lib/containers/PreviewBlogContainer/PreviewBlogContainer";
import { useGetBlogByIdQuery } from "src/lib/services";

const BlogDetail = () => {
  const { blogId } = useParams();
  const { data: blog } = useGetBlogByIdQuery(blogId ?? "", {
    skip: !blogId,
    refetchOnMountOrArgChange: true,
  });
  return (
    <div>
      <PreviewBlogContainer blog={blog?.data as any} />
    </div>
  );
};

export default BlogDetail;
