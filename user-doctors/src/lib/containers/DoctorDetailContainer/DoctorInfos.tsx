import { Col, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Line, Title } from "./styled";
import {
  useGetDoctorAchievementsQuery,
  useGetDoctorByIdQuery,
  useGetDoctorEducationQuery,
  useGetDoctorWorkExperienceQuery,
} from "src/lib/services";
import { useParams } from "react-router-dom";
import moment from "moment";

const DoctorInfos = () => {
  const { t } = useTranslation();
  const { doctorId } = useParams();
  const { data: doctorById } = useGetDoctorByIdQuery(doctorId ?? "", {
    skip: !doctorId,
    refetchOnMountOrArgChange: true,
  });
  const { data: doctorAchievements } = useGetDoctorAchievementsQuery(
    doctorId ?? "",
    {
      skip: !doctorId,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: doctorEducation } = useGetDoctorEducationQuery(doctorId ?? "", {
    skip: !doctorId,
    refetchOnMountOrArgChange: true,
  });
  const { data: doctorWorkExperiences } = useGetDoctorWorkExperienceQuery(
    doctorId ?? "",
    {
      skip: !doctorId,
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <div className="biography">
          <Title>{t("biography")}</Title>
          <p>{doctorById?.data.biography}</p>
        </div>
      </Col>
      <Line />
      <Col span={12}>
        <ul className="education">
          <Title>{t("education")}</Title>
          {doctorEducation?.data.map((education) => {
            return (
              <li key={education.id}>
                <div className="item">
                  <h4 className="item-title">{education.title}</h4>
                  <p>{education.date}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Col>
      <Col span={12}>
        <ul className="workAndExperience">
          <Title>{t("workAndExperience")}</Title>
          {doctorWorkExperiences?.data.map((workExperience) => {
            return (
              <li key={workExperience.id}>
                <div className="item">
                  <h4 className="item-title">{workExperience.title}</h4>
                  <p>{workExperience.date}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Col>
      <Line />
      <Col span={24}>
        <ul className="achievements">
          <Title>{t("achievements")}</Title>
          <Row gutter={[20, 30]}>
            {doctorAchievements?.data.map((achievement) => {
              return (
                <Col span={12} key={achievement.id}>
                  <li>
                    <div className="item">
                      <h4 className="item-title">{achievement.title}</h4>
                      <p className="link">
                        {moment(Number(achievement.date)).format("MMMM YYYY")}
                      </p>
                      <p>{achievement.description}</p>
                    </div>
                  </li>
                </Col>
              );
            })}
            <Line />
            <Col span={24}>
              <Title>{t("specializations")}</Title>
              <ul className="specializations">
                {doctorById?.data.specialize.split(",").map((specialize) => {
                  return (
                    <li key={specialize} className="special-item">
                      {specialize.trim()}
                    </li>
                  );
                })}
              </ul>
            </Col>
          </Row>
        </ul>
      </Col>
    </Row>
  );
};

export default DoctorInfos;
