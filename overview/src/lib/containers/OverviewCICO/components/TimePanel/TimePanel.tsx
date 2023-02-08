import React from "react";
import {
  StyledBoxShadow,
  StyledTable,
  StyledTimePanel,
  StyledViewDetail,
} from "./styles";
import { formatDate } from "../../../../utils";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePermission } from "@nexthcm/common";
import { permissionOverviewEnum } from "../../../../types";

interface TimeProps {
  dataWorkingHour: any;
}

const TimePanel = ({ dataWorkingHour }: TimeProps) => {
  const { t } = useTranslation();
  const [isViewDetail] = usePermission([
    permissionOverviewEnum.VIEW_WORKING_HOUR_DETAIL,
  ]);
  return (
    <StyledTimePanel>
      <StyledTable>
        <div className="table-header-group">
          <div className="table-cell">{t("workingDays")}</div>
          <div className="table-cell border">{t("timeIn")}</div>
          <div className="table-cell">{t("timeOut")}</div>
        </div>
        <div className="table-row-group">
          <div className="table-cell py-8">{t("today")}</div>
          <div className="table-cell py-8 border">
            {dataWorkingHour?.data?.items.length > 0 &&
            dataWorkingHour?.data?.items[0].inTime
              ? formatDate(
                  dataWorkingHour?.data?.items[0].inTime * 1000,
                  "HH:mm",
                  true
                )
              : "-:-"}
          </div>
          <div className="table-cell py-8">
            {dataWorkingHour?.data?.items.length > 0 &&
            dataWorkingHour?.data?.items[0].outTime
              ? formatDate(
                  dataWorkingHour?.data?.items[0].outTime * 1000,
                  "HH:mm",
                  true
                )
              : "-:-"}
          </div>
        </div>
        <div className="table-row-group">
          <div className="table-cell">{t("yesterday")}</div>
          <div className="table-cell border">
            {dataWorkingHour?.data?.items.length > 0 &&
            dataWorkingHour?.data?.items[1].inTime
              ? formatDate(
                  dataWorkingHour?.data?.items[1].inTime * 1000,
                  "HH:mm",
                  true
                )
              : "-:-"}
          </div>
          <div className="table-cell">
            {dataWorkingHour?.data?.items.length > 0 &&
            dataWorkingHour?.data?.items[1].outTime
              ? formatDate(
                  dataWorkingHour?.data?.items[1].outTime * 1000,
                  "HH:mm",
                  true
                )
              : "-:-"}
          </div>
        </div>
      </StyledTable>
      <StyledViewDetail>
        {isViewDetail && (
          <NavLink to="/my-time/working-hours/only-me">
            <span>{t("viewDetail")}</span>
          </NavLink>
        )}
      </StyledViewDetail>
      <StyledBoxShadow></StyledBoxShadow>
    </StyledTimePanel>
  );
};

export default TimePanel;
