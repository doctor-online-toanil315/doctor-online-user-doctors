import React from "react";
import { REMOTE_APP_ROUTING_PREFIX } from "../../constants";
import { mount } from "userHome/Module";
import { RemoteAppWrapper } from "../../HOCs";

const UserHome = () => {
  return (
    <RemoteAppWrapper
      mountFunc={mount}
      remoteAppName={REMOTE_APP_ROUTING_PREFIX.USER_HOME}
    />
  );
};

export default UserHome;
