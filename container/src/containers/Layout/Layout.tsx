import React from "react";
import { Sidebar } from "../Sidebar";
import { Outlet } from "react-router-dom";
import { LayoutContainer } from "./styled";

const Layout = () => {
  return (
    <LayoutContainer>
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <Outlet />
      </div>
    </LayoutContainer>
  );
};

export default Layout;
