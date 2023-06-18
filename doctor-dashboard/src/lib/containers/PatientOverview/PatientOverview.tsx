import React from "react";
import { StyledContainer } from "../styled";
import { useTranslation } from "react-i18next";
import { PersonIcon, TrendingUpIcon } from "doctor-online-components";
import { StyledPatientOverview } from "./styled";
import { useGetPatientOverviewQuery } from "src/lib/services";
import { abbreviateNumber } from "src/lib/utils/formatNumber.util";

const PatientOverview = () => {
  const { t } = useTranslation();
  const { data } = useGetPatientOverviewQuery();

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
                <p>{abbreviateNumber(data?.newPatients ?? 0)}</p>
                <span>{t("newPatient")}</span>
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
                <p>{abbreviateNumber(data?.oldPatients ?? 0)}</p>
                <span>{t("oldPatient")}</span>
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
