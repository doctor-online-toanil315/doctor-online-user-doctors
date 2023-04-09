import React from "react";
import { mount } from "userDoctors/Module";
import { RemoteAppWrapper } from "src/HOCs";
import { REMOTE_APP_ROUTING_PREFIX } from "src/constants";

const UserDoctors = () => {
  return (
    <RemoteAppWrapper
      mountFunc={mount}
      remoteAppName={REMOTE_APP_ROUTING_PREFIX.USER_DOCTORS}
    />
  );
};

export default UserDoctors;
