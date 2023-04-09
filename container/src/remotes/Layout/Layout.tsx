import React from "react";
import { mount } from "layout/Module";
import { LayoutWrapper } from "../../HOCs";
import { Outlet } from "react-router-dom";

const Layout = ({ children }: any) => {
  return (
    <LayoutWrapper mountFunc={mount}>
      <Outlet />
    </LayoutWrapper>
  );
};

export default Layout;
