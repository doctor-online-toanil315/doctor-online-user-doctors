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
      ];
    }
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
