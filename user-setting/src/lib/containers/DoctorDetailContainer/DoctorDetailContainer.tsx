import { Col, Row } from "antd";
import { LikeIcon, StarGold, Tabs, VerifyIcon } from "doctor-online-components";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SETTING_TAB_ENUM } from "src/lib/constants";
import DoctorInfos from "./DoctorInfos";
import DoctorReviewes from "./DoctorReviewes";
import { StyledDoctorDetailContainer, Title } from "./styled";
import { useGetMeQuery } from "src/lib/services";
import { ROLE_ENUM } from "doctor-online-common";
import MyProfile from "./MyProfile";
import ChangePassword from "./ChangePassword";

const DoctorDetailContainer = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("1");
  const { data: currentUserLogin } = useGetMeQuery();

  const tabContents = useMemo(() => {
    return [
      {
        id: 1,
        title: t("myProfile"),
      },
      {
        id: 2,
        title: t("changePassword"),
      },
      ...(currentUserLogin?.data.role === ROLE_ENUM.DOCTOR
        ? [
            {
              id: 3,
              title: t("doctorInformation"),
            },
            {
              id: 4,
              title: t("reviews"),
            },
          ]
        : []),
    ];
  }, [currentUserLogin]);

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
        <div className="tab-content">
          {activeTab === SETTING_TAB_ENUM.MY_PROFILE ? (
            <MyProfile />
          ) : activeTab === SETTING_TAB_ENUM.CHANGE_PASSWORD ? (
            <ChangePassword />
          ) : activeTab === SETTING_TAB_ENUM.DOCTOR_INFORMATION ? (
            <DoctorInfos />
          ) : (
            <DoctorReviewes />
          )}
        </div>
      </div>
    </StyledDoctorDetailContainer>
  );
};

export default DoctorDetailContainer;
