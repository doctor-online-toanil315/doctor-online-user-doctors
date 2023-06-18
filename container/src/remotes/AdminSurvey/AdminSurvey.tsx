import React from "react";
import { RemoteAppWrapper } from "src/HOCs";
import { REMOTE_APP_ROUTING_PREFIX } from "src/constants";
import { mount } from "adminSurvey/Module";

const AdminSurvey = () => {
  return (
    <RemoteAppWrapper
      mountFunc={mount}
      remoteAppName={REMOTE_APP_ROUTING_PREFIX.ADMIN_SURVEY}
    />
  );
};

export default AdminSurvey;
