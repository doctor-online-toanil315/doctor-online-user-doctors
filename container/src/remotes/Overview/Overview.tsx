import React from "react";
import { REMOTE_APP_ROUTING_PREFIX } from "../../constants";
import { mount } from "overview/Module";
import { RemoteAppWrapper } from "../../HOCs";

const Overview = () => {
  return (
    <RemoteAppWrapper
      mountFunc={mount}
      remoteAppName={REMOTE_APP_ROUTING_PREFIX.OVERVIEW}
    />
  );
};

export default Overview;
