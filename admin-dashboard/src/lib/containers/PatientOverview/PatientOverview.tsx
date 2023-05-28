import React from "react";
import { StyledContainer } from "./styled";
import { useTranslation } from "react-i18next";
import { PersonIcon, TrendingUpIcon } from "doctor-online-components";
import { StyledPatientOverview } from "./styled";

const PatientOverview = () => {
  const { t } = useTranslation();

  return (
    <StyledContainer>
      <div className="header">
        <p className="title">{t("patients")}</p>
      </div>
      <div className="content">
        <StyledPatientOverview>
          <div className="patient-status ">
            <div className="status-description new">
              <div className="patient-icon">
                <PersonIcon />
              </div>
              <div className="info">
                <p>24.4k</p>
                <span>New Patient</span>
              </div>
            </div>
            <span className="increase-number">
              <TrendingUpIcon />
              15%
            </span>
          </div>
          <div className="patient-status ">
            <div className="status-description old">
              <div className="patient-icon">
                <PersonIcon />
              </div>
              <div className="info">
                <p>166.4k</p>
                <span>Old Patient</span>
              </div>
            </div>
            <span className="increase-number">
              <TrendingUpIcon />
              15%
            </span>
          </div>
        </StyledPatientOverview>
      </div>
    </StyledContainer>
  );
};

export default PatientOverview;
