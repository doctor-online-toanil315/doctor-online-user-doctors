import React from "react";
import { RemoteAppWrapper } from "src/HOCs";
import { REMOTE_APP_ROUTING_PREFIX } from "src/constants";
import { mount } from "adminTests/Module";

const AdminTests = () => {
  return (
    <RemoteAppWrapper
      mountFunc={mount}
      remoteAppName={REMOTE_APP_ROUTING_PREFIX.ADMIN_TESTS}
    />
  );
};

export default AdminTests;
