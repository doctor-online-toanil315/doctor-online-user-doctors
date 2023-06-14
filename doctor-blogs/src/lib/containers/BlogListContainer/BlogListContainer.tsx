import React from "react";
import { useGetBlogsByDoctorIdQuery, useGetMeQuery } from "src/lib/services";
import { StyledBlogListContainer } from "./styled";
import { useNavigate } from "react-router-dom";
import { Button } from "doctor-online-components";
import NotFoundImg from "src/lib/assets/doctor-not-found.png";
import moment from "moment";
import { Col, Row } from "antd";

const BlogListContainer = () => {
  const { data: currentUserLogin } = useGetMeQuery();
  const { data: blogs } = useGetBlogsByDoctorIdQuery(
    {
      page: 1,
      size: 100,
      search: "",
      doctorId: currentUserLogin?.data.doctor?.id ?? "",
    },
    {
      skip: !currentUserLogin?.data.doctor?.id,
      refetchOnMountOrArgChange: true,
    }
  );
  const navigate = useNavigate();
  return (
    <StyledBlogListContainer>
      <div className="header">
        <h1>Blogs</h1>
        <Button onClick={() => navigate("/create-blog")}>
          Create New Blog
        </Button>
      </div>
      <div className="blog-list">
        {blogs?.data.length ? (
          <Row gutter={[30, 30]}>
            {blogs.data.map((blog) => {
              return (
                <Col key={blog.id} span={8}>
                  <div className="blog-item">
                    <div className="header">
                      <img src={blog.thumbnail} alt="blog thumnail" />
                      <div className="header-content">
                        <p>{blog.category}</p>
                        <h3 onClick={() => navigate(`/${blog.id}`)}>
                          {blog.title}
                        </h3>
                      </div>
                    </div>
                    <div className="author">
                      <img src={blog.doctor.user?.avatar ?? ""} alt="avatar" />
                      <div className="author-infos">
                        <p>
                          Written by {blog.doctor.user?.firstName}{" "}
                          {blog.doctor.user?.lastName}
                        </p>
                        <span>
                          Posted on{" "}
                          {moment(Number(blog.publishAt)).format(
                            "MMMM DD, YYYY"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        ) : (
          <div className="empty">
            <img src={NotFoundImg} alt="empty" />
            <p>You haven't publish any blog</p>
          </div>
        )}
      </div>
    </StyledBlogListContainer>
  );
};

export default BlogListContainer;
