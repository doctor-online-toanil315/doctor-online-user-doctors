import { Routes, Navigate, Route } from "react-router-dom";
import "./styles.scss";
import React, { Suspense, useRef } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Layout } from "./containers";
import useInitApp from "./hooks/useInitApp";

const ModuleUserHome = React.lazy(() => import("./remotes/UserHome/UserHome"));
const ModuleUserDoctors = React.lazy(
  () => import("./remotes/UserDoctors/UserDoctors")
);
const ModuleDoctorDashboard = React.lazy(
  () => import("./remotes/DoctorDashboard/DoctorDashboard")
);
const ModuleDoctorAppointments = React.lazy(
  () => import("./remotes/DoctorAppointments/DoctorAppointments")
);
const ModuleVideoConsulting = React.lazy(
  () => import("./remotes/VideoConsulting/VideoConsulting")
);
const ModuleUserAppointments = React.lazy(
  () => import("./remotes/UserAppointments/UserAppointments")
);

export function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentUserLogin = useInitApp(iframeRef);

  if (!currentUserLogin) {
    const hiddenStyle = {
      position: "absolute",
      opacity: "0",
      visibility: "hidden",
      zIndex: "-100",
    };

    return (
      <>
        <iframe
          style={hiddenStyle as any}
          ref={iframeRef}
          id="iframeContainer"
          width={0.1}
          height={0.1}
          src={process.env.CENTRAL_AUTH_APP_URL}
        />
      </>
    );
  }

  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route index element={<Navigate to="user-home" />} />
        <Route
          path="user-home/*"
          element={
            <Suspense fallback={<LoadingOutlined />}>
              <ModuleUserHome />
            </Suspense>
          }
        />
        <Route
          path="user-doctors/*"
          element={
            <Suspense fallback={<LoadingOutlined />}>
              <ModuleUserDoctors />
            </Suspense>
          }
        />
        <Route
          path="doctor-dashboard/*"
          element={
            <Suspense fallback={<LoadingOutlined />}>
              <ModuleDoctorDashboard />
            </Suspense>
          }
        />
        <Route
          path="doctor-appointments/*"
          element={
            <Suspense fallback={<LoadingOutlined />}>
              <ModuleDoctorAppointments />
            </Suspense>
          }
        />
        <Route
          path="user-appointments/*"
          element={
            <Suspense fallback={<LoadingOutlined />}>
              <ModuleUserAppointments />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="video-consulting/*"
        element={
          <Suspense fallback={<LoadingOutlined />}>
            <ModuleVideoConsulting />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
