import React from "react";
import { RemoteAppWrapper } from "src/HOCs";
import { REMOTE_APP_ROUTING_PREFIX } from "src/constants";
import { mount } from "doctorAppointments/Module";

const DoctorAppointments = () => {
  return (
    <RemoteAppWrapper
      mountFunc={mount}
      remoteAppName={REMOTE_APP_ROUTING_PREFIX.DOCTOR_APPOINTMENTS}
    />
  );
};

export default DoctorAppointments;
