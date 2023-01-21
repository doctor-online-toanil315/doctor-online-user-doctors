import React from "react";
import { REMOTE_APP_ROUTING_PREFIX } from "../../constants";
import { mount } from "my_time/Module";
import { RemoteAppWrapper } from "../../HOCs";

const MyTime = () => {
  return (
    <RemoteAppWrapper
      mountFunc={mount}
      remoteAppName={REMOTE_APP_ROUTING_PREFIX.MY_TIME}
    />
  );
};

export default MyTime;
