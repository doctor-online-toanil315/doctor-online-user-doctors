import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DayIcon, ListIcon, WeekIcon } from "doctor-online-components";
import { StyledListAppointments } from "./styled";
import { useSearchParams } from "react-router-dom";
import { TYPE_OF_LIST_ENUM } from "src/lib/constants";
import {
  DayAppointmentContainer,
  ListAppointmentContainer,
  WeekAppointmentContainer,
} from "src/lib/containers";

const ListAppointments = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParamsObject = Object.fromEntries(searchParams.entries());
  const typeOfList = queryParamsObject.type ?? TYPE_OF_LIST_ENUM.LIST;
  const { t } = useTranslation();

  const userControls = useMemo(() => {
    return [
      {
        id: 1,
        type: TYPE_OF_LIST_ENUM.LIST,
        icon: <ListIcon />,
      },
      {
        id: 2,
        type: TYPE_OF_LIST_ENUM.WEEK,
        icon: <WeekIcon />,
      },
      {
        id: 3,
        type: TYPE_OF_LIST_ENUM.DAY,
        icon: <DayIcon />,
      },
    ];
  }, []);

  const handleChangeTypeOfList = (type: string) => {
    return () => {
      setSearchParams({ type });
    };
  };

  const renderUserControls = () => {
    return userControls.map((userControl) => {
      return (
        <div
          className={`type-of-list ${
            typeOfList === userControl.type ? "active" : ""
          }`}
          key={userControl.id}
          onClick={handleChangeTypeOfList(userControl.type)}
        >
          {userControl.icon} {userControl.type.toLowerCase()}
        </div>
      );
    });
  };

  const renderListAppointment = () => {
    switch (typeOfList) {
      case TYPE_OF_LIST_ENUM.LIST: {
        return <ListAppointmentContainer />;
      }

      case TYPE_OF_LIST_ENUM.WEEK: {
        return <WeekAppointmentContainer />;
      }

      default: {
        return <DayAppointmentContainer />;
      }
    }
  };

  return (
    <StyledListAppointments>
      <div className="header">
        <h1>{t("appointments")}</h1>
        <p>
          <span className="bold">Showing:</span> All Appointments Requests to
          you
        </p>
        <div className="user-ctrl">{renderUserControls()}</div>
      </div>
      <div className="list">{renderListAppointment()}</div>
    </StyledListAppointments>
  );
};

export default ListAppointments;
