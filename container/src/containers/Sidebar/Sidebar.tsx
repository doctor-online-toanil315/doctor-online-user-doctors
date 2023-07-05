import React, { useMemo } from "react";
import { SidebarContainer, SidebarItemContainer } from "./styled";
import {
  CalendarIcon,
  ClockIcon,
  HomeIcon,
  OverviewIcon,
  PaperIcon,
  PaymentIcon,
  PeopleIcon,
  Stethoscope,
  WeekIcon,
} from "doctor-online-components";
import { useGetMeQuery } from "../../services";
import { ROLE_ENUM } from "doctor-online-common";
import { NavLink } from "react-router-dom";
import LogoPrimary from "../../assets/logo.png";
import { SettingIcon } from "../SettingIcon";

const Sidebar = () => {
  const { data: me } = useGetMeQuery();

  const links = useMemo(() => {
    if (me?.data.role === ROLE_ENUM.USER) {
      return [
        {
          id: 1,
          href: "user-home",
          icon: <HomeIcon />,
          label: "Home",
        },
        {
          id: 2,
          href: "user-doctors",
          icon: <PeopleIcon />,
          label: "Doctors",
        },
        {
          id: 3,
          href: "user-appointments",
          icon: <CalendarIcon />,
          label: "Appointments",
        },
        {
          id: 4,
          href: "user-setting",
          icon: <SettingIcon />,
          label: "Settings",
        },
        {
          id: 5,
          href: "user-blogs",
          icon: <PaperIcon />,
          label: "Blogs",
        },
      ];
    }

    if (me?.data.role === ROLE_ENUM.ADMIN) {
      return [
        {
          id: 0,
          href: "admin-dashboard",
          icon: <WeekIcon />,
          label: "Dashboard",
        },
        {
          id: 1,
          href: "admin-doctors",
          icon: <PeopleIcon />,
          label: "Doctors",
        },
        {
          id: 2,
          href: "admin-medicines",
          icon: <Stethoscope />,
          label: "Medicines",
        },
        {
          id: 3,
          href: "admin-tests",
          icon: <CalendarIcon />,
          label: "Lab Tests",
        },
        {
          id: 4,
          href: "admin-payment",
          icon: <PaymentIcon />,
          label: "Payments",
        },
        {
          id: 5,
          href: "admin-survey",
          icon: <PaperIcon />,
          label: "Surveys",
        },
      ];
    }

    return [
      {
        id: 1,
        href: "doctor-dashboard",
        icon: <WeekIcon />,
        label: "Home",
      },
      {
        id: 2,
        href: "doctor-appointments",
        icon: <CalendarIcon />,
        label: "Appointments",
      },
      {
        id: 4,
        href: "user-setting",
        icon: <SettingIcon />,
        label: "Settings",
      },
      {
        id: 5,
        href: "doctor-schedule-time",
        icon: <ClockIcon />,
        label: "Schedule Timings",
      },
      {
        id: 6,
        href: "doctor-blogs",
        icon: <PaperIcon />,
        label: "Blogs",
      },
    ];
  }, [me]);

  return (
    <SidebarContainer>
      <div className="logo">
        <img src={LogoPrimary} alt="logo" />
      </div>
      <div className="link-list">
        {links?.map((linkItem) => {
          return (
            <SidebarItemContainer>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "item active" : "item"
                }
                to={linkItem.href}
              >
                {linkItem.icon}
                <span>{linkItem.label}</span>
              </NavLink>
            </SidebarItemContainer>
          );
        })}
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
