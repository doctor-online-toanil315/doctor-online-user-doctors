import React from "react";
import { REMOTE_APP_ROUTING_PREFIX } from "../../constants";
import { mount } from "doctorDashboard/Module";
import { RemoteAppWrapper } from "../../HOCs";

const DoctorDashboard = () => {
  return (
    <RemoteAppWrapper
      mountFunc={mount}
      remoteAppName={REMOTE_APP_ROUTING_PREFIX.DOCTOR_DASHBOARD}
    />
  );
};

export default DoctorDashboard;
