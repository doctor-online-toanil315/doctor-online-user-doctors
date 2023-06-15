import { Col, Pagination, Row } from "antd";
import moment from "moment";
import { useNavigate, useSearchParams } from "react-router-dom";
import NotFoundImg from "src/lib/assets/doctor-not-found.png";
import { useGetBlogsQuery, useGetMeQuery } from "src/lib/services";
import { StyledBlogListContainer } from "./styled";
import { ChangeEventHandler, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input, SearchIcon } from "doctor-online-components";
import { useDebounceWithoutDependencies } from "src/lib/hooks";

const BlogListContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, search } = Object.fromEntries(searchParams.entries());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: blogs } = useGetBlogsQuery(
    {
      page: Number(page),
      size: 15,
      search,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [searchParams]);

  const form = useForm();
  const [searchTerm, setSearchTerm] = useState(search);
  const { setDebounce } = useDebounceWithoutDependencies(300);

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setDebounce(() => {
      if (searchTerm) {
        searchParams.set("search", String(searchTerm));
      } else {
        searchParams.delete("search");
      }
      setSearchParams(searchParams);
    });
  }, [searchTerm]);

  return (
    <StyledBlogListContainer>
      <div className="header">
        <h1>Blogs</h1>
      </div>
      <div className="search">
        <FormProvider {...form}>
          <Input
            value={searchTerm}
            prefix={(<SearchIcon />) as any}
            name="search"
            placeholder="Search blog by name"
            style={{ width: 350 }}
            onChange={handleSearchChange as any}
          />
        </FormProvider>
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
            <p>There are no blogs published recently</p>
          </div>
        )}
      </div>
      <Pagination
        // hideOnSinglePage
        current={currentPage}
        total={blogs?.totalItems}
        defaultPageSize={5}
        onChange={(value) => {
          searchParams.delete("page");
          searchParams.append("page", String(value));
          setSearchParams(searchParams);
        }}
      />
    </StyledBlogListContainer>
  );
};

export default BlogListContainer;
