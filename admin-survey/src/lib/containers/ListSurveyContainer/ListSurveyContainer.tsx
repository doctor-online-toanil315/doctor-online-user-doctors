import React, { useEffect, useState } from "react";
import { StyledListSurveyContainer, StyledSurveyItem } from "./styled";
import { Button, EyeWhite, Modal } from "doctor-online-components";
import { Col, Pagination, Row } from "antd";
import { useModal } from "doctor-online-common";
import { AddSurveyModal } from "../AddSurveyModal";
import { SurveyType } from "src/lib/types";
import { useGetSurveysQuery } from "src/lib/services";
import { useSearchParams } from "react-router-dom";
import NotFoundImg from "src/lib/assets/doctor-not-found.png";
import GGImg from "src/lib/assets/google.png";
import moment from "moment";

const ListSurveyContainer = () => {
  const modal = useModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const { page } = Object.fromEntries(searchParams.entries());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: surveys, isLoading } = useGetSurveysQuery({
    page: Number(page),
    size: 12,
    search: "",
  });

  useEffect(() => {
    if (!page) {
      searchParams.delete("page");
      searchParams.append("page", String(1));
      setSearchParams(searchParams);
    }
  }, []);

  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [searchParams]);

  return (
    <StyledListSurveyContainer>
      <div className="header">
        <h1>Surveys</h1>
        <Button onClick={() => modal.handleOpen()}>Add Survey</Button>
      </div>
      <div className="survey-list">
        <Row gutter={[30, 60]}>
          {surveys?.totalItems ? (
            surveys.data.map((survey) => {
              return (
                <Col key={survey.id} span={8}>
                  <SurveyItem survey={survey} />
                </Col>
              );
            })
          ) : (
            <Col span={24}>
              <div className="empty">
                <img src={NotFoundImg} alt="empty" />
                <p>There are no survey available recently!</p>
              </div>
            </Col>
          )}
        </Row>
      </div>
      <Pagination
        hideOnSinglePage
        current={currentPage}
        total={surveys?.totalItems}
        defaultPageSize={12}
        onChange={(value) => {
          searchParams.delete("page");
          searchParams.append("page", String(value));
          setSearchParams(searchParams);
        }}
      />
      <Modal destroyOnClose open={modal.isOpen} onCancel={modal.handleClose}>
        <AddSurveyModal handleClose={modal.handleClose} />
      </Modal>
    </StyledListSurveyContainer>
  );
};

interface SurveyItemProps {
  survey: SurveyType;
}

const SurveyItem = ({ survey }: SurveyItemProps) => {
  return (
    <StyledSurveyItem>
      <div className="type-icon">
        <img src={GGImg} alt="gg icon" />
      </div>
      <div className="date">
        {moment(Number(survey.createdAt)).format("DD MMM YYYY")}
      </div>
      <h3 className="title">{survey.title}</h3>
      <p className="type">Google Form</p>
      <p className="receivers">All Users</p>
      <a className="view" href={survey.resultLink}>
        <EyeWhite />
      </a>
    </StyledSurveyItem>
  );
};

export default ListSurveyContainer;
