import { Col, Row } from "antd";
import { LikeIcon, StarGold, Tabs, VerifyIcon } from "doctor-online-components";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { DOCTOR_TAB_ENUM } from "src/lib/constants";
import DoctorAvailableTime from "./DoctorAvailableTime";
import DoctorInfos from "./DoctorInfos";
import DoctorReviewes from "./DoctorReviewes";
import { Line, StyledDoctorDetailContainer, Title } from "./styled";
import { useGetDoctorByIdQuery } from "src/lib/services";
import { useParams, useSearchParams } from "react-router-dom";

const DoctorDetailContainer = () => {
  const { t } = useTranslation();
  const { doctorId } = useParams();
  const [activeTab, setActiveTab] = useState<string>("1");
  const { data: doctorById } = useGetDoctorByIdQuery(doctorId ?? "", {
    skip: !doctorId,
    refetchOnMountOrArgChange: true,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { vnp_ResponseCode } = Object.fromEntries(searchParams.entries());

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

  useEffect(() => {
    if (vnp_ResponseCode === "00") {
      setActiveTab(DOCTOR_TAB_ENUM.DOCTOR_AVAILABLE_TIME);
    }
  }, [searchParams]);

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
            src={
              doctorById?.data.user?.avatar ??
              '"https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"'
            }
            alt="doctor avatar"
          />
          <h3>
            Dr.{" "}
            {`${doctorById?.data.user?.firstName} ${doctorById?.data.user?.lastName}`}
          </h3>
          <span className="rating">
            <StarGold /> {doctorById?.data.rating.toFixed(1)}
          </span>
          <p>{doctorById?.data.specializeTitle}</p>
          <p>
            {doctorById?.data.yearOfExperience} Years Experience Overall (
            {doctorById?.data.yearOfExperience} years as specialist)
          </p>
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
