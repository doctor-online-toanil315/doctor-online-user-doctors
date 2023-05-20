import React from "react";
import { RemoteAppWrapper } from "src/HOCs";
import { REMOTE_APP_ROUTING_PREFIX } from "src/constants";
import { mount } from "userSetting/Module";

const UserSetting = () => {
  return (
    <RemoteAppWrapper
      mountFunc={mount}
      remoteAppName={REMOTE_APP_ROUTING_PREFIX.USER_SETTING}
    />
  );
};

export default UserSetting;
