import { Col, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Line, Title } from "./styled";

const DoctorInfos = () => {
  const { t } = useTranslation();

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <div className="biography">
          <Title>{t("biography")}</Title>
          <p>
            Jacob Jones, PPCNP, is a pediatric nurse practitioner who was born
            and raised in the Maryland and Washington, D.C., area. She attended
            Elon University in North Carolina, where she completed undergraduate
            studies with a B.A. in psychology and triple minor degrees in
            neuroscience, anthropology and African–American studies. Allergy and
            Immunology.
          </p>
        </div>
      </Col>

      <Col span={12}>
        <ul className="education">
          <Title>{t("education")}</Title>
          <li>
            <div className="item">
              <h4 className="item-title">
                Chattagram International Dental College & Hospital
              </h4>
              <p>MDS - Periodonyology and Oral Impantology, BDS</p>
              <p>2003-2005</p>
            </div>
          </li>
        </ul>
      </Col>
      <Col span={12}>
        <ul className="workAndExperience">
          <Title>{t("workAndExperience")}</Title>
          <li>
            <div className="item">
              <h4 className="item-title">Ibn Sina Specialized Hospital</h4>
              <p>2010 - Present (5 years)</p>
            </div>
          </li>
          <li>
            <div className="item">
              <h4 className="item-title">Ibn Sina Specialized Hospital</h4>
              <p>2010 - Present (5 years)</p>
            </div>
          </li>
        </ul>
      </Col>
      <Line />
      <Col span={24}>
        <ul className="achievements">
          <Title>{t("achievements")}</Title>
          <Row gutter={[20, 30]}>
            <Col span={12}>
              <li>
                <div className="item">
                  <h4 className="item-title">Best Dentist Award 2021</h4>
                  <p className="link">July 2019</p>
                  <p>
                    Dr. Friedman and his team are the proud recipients of the
                    New Jersey Top Dentist award for 2019. We are proud to be
                    selected for this honor by our wonderful patients.
                  </p>
                </div>
              </li>
            </Col>
            <Col span={12}>
              <li>
                <div className="item">
                  <h4 className="item-title">
                    The Dental Professional of The Year Award
                  </h4>
                  <p className="link">May 2010</p>
                  <p>
                    Nicole Elango and Deeon Trute are finalists for the Student
                    Dentist of the year and Student Dental Hygienist and/or
                    Therapist of the Year 2020 respectively.
                  </p>
                </div>
              </li>
            </Col>
            <Line />
            <Col span={24}>
              <Title>{t("specializations")}</Title>
              <ul className="specializations">
                <li className="special-item">Dental Care</li>
                <li className="special-item">Children Care</li>
                <li className="special-item">Oral and Maxillofacial Surgery</li>
                <li className="special-item">Orthodontics</li>
                <li className="special-item">Prosthodontics</li>
                <li className="special-item">Pediatric Dentistry</li>
              </ul>
            </Col>
          </Row>
        </ul>
      </Col>
      <Line />
    </Row>
  );
};

export default DoctorInfos;
