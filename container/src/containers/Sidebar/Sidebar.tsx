import React, { useMemo } from "react";
import { SidebarContainer, SidebarItemContainer } from "./styled";
import { HomeIcon, PeopleIcon } from "doctor-online-components";
import { useGetMeQuery } from "../../services";
import { ROLE_ENUM } from "doctor-online-common";
import { NavLink } from "react-router-dom";
import LogoPrimary from "../../assets/logo.png";

const Sidebar = () => {
  const { data: me } = useGetMeQuery();

  const links = useMemo(() => {
    if (me?.data.role === ROLE_ENUM.USER) {
      return [
        {
          id: 1,
          href: "user-home",
          icon: null,
          label: "Home",
        },
        {
          id: 2,
          href: "user-doctors",
          icon: null,
          label: "Doctors",
        },
        {
          id: 3,
          href: "user-appointments",
          icon: null,
          label: "Appointments",
        },
        {
          id: 4,
          href: "user-setting",
          icon: null,
          label: "Settings",
        },
        {
          id: 5,
          href: "user-blogs",
          icon: null,
          label: "Blogs",
        },
      ];
    }

    if (me?.data.role === ROLE_ENUM.ADMIN) {
      return [
        {
          id: 0,
          href: "admin-dashboard",
          icon: null,
          label: "Dashboard",
        },
        {
          id: 1,
          href: "admin-doctors",
          icon: null,
          label: "Doctors",
        },
        {
          id: 2,
          href: "admin-medicines",
          icon: null,
          label: "Medicines",
        },
        {
          id: 3,
          href: "admin-tests",
          icon: null,
          label: "Lab Tests",
        },
        {
          id: 4,
          href: "admin-payment",
          icon: null,
          label: "Payments",
        },
      ];
    }

    return [
      {
        id: 1,
        href: "doctor-dashboard",
        icon: null,
        label: "Home",
      },
      {
        id: 2,
        href: "doctor-appointments",
        icon: null,
        label: "Appointments",
      },
      {
        id: 3,
        href: "doctor-patients",
        icon: null,
        label: "Patients",
      },
      {
        id: 4,
        href: "user-setting",
        icon: null,
        label: "Settings",
      },
      {
        id: 5,
        href: "doctor-schedule-time",
        icon: null,
        label: "Schedule Timings",
      },
      {
        id: 6,
        href: "doctor-blogs",
        icon: null,
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
