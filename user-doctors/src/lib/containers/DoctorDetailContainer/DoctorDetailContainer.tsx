import { Col, Row } from "antd";
import { LikeIcon, StarGold, Tabs, VerifyIcon } from "doctor-online-components";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { DOCTOR_TAB_ENUM } from "src/lib/constants";
import DoctorAvailableTime from "./DoctorAvailableTime";
import DoctorInfos from "./DoctorInfos";
import DoctorReviewes from "./DoctorReviewes";
import { Line, StyledDoctorDetailContainer, Title } from "./styled";

const DoctorDetailContainer = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("1");

  const tabContents = useMemo(() => {
    return [
      {
        id: 1,
        title: t("profileInfo"),
      },
      {
        id: 2,
        title: t("availableTime"),
      },
      {
        id: 3,
        title: t("reviews"),
      },
    ];
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <StyledDoctorDetailContainer>
      <Tabs
        centered
        activeKey={activeTab}
        contentCommon={tabContents}
        onChange={handleTabChange}
      />
      <div className="content">
        <div className="summary">
          <img
            src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
            alt="doctor avatar"
          />
          <h3>Dr. Jacob Jones</h3>
          <span className="rating">
            <StarGold /> 4.7
          </span>
          <p>MDS - Periodonyology and Oral Impantology, BDS</p>
          <p>18 Years Experience Overall (18 years as specialist)</p>
          <div className="bold">
            <p>
              <LikeIcon /> 98% (250 votes)
            </p>
            <p>
              <VerifyIcon /> Medical Registration Verified
            </p>
          </div>
        </div>
        <div className="tab-content">
          {activeTab === DOCTOR_TAB_ENUM.DOCTOR_INFOS ? (
            <DoctorInfos />
          ) : activeTab === DOCTOR_TAB_ENUM.DOCTOR_AVAILABLE_TIME ? (
            <DoctorAvailableTime />
          ) : (
            <DoctorReviewes />
          )}
        </div>
      </div>
    </StyledDoctorDetailContainer>
  );
};

export default DoctorDetailContainer;
