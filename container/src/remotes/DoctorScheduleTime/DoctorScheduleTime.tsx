import React from "react";
import { RemoteAppWrapper } from "src/HOCs";
import { REMOTE_APP_ROUTING_PREFIX } from "src/constants";
import { mount } from "doctorScheduleTime/Module";

const DoctorScheduleTime = () => {
  return (
    <RemoteAppWrapper
      mountFunc={mount}
      remoteAppName={REMOTE_APP_ROUTING_PREFIX.DOCTOR_SCHEDULE_TIME}
    />
  );
};

export default DoctorScheduleTime;
