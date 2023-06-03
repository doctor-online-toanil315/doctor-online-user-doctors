import React from "react";
import { RemoteAppWrapper } from "src/HOCs";
import { REMOTE_APP_ROUTING_PREFIX } from "src/constants";
import { mount } from "adminDashboard/Module";

const AdminDashboard = () => {
  return (
    <RemoteAppWrapper
      mountFunc={mount}
      remoteAppName={REMOTE_APP_ROUTING_PREFIX.ADMIN_DASHBOARD}
    />
  );
};

export default AdminDashboard;
