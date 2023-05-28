import { Routes, Navigate, Route } from "react-router-dom";
import "./styles.scss";
import React, { Suspense, useRef } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Layout } from "./containers";
import useInitApp from "./hooks/useInitApp";
import { ROLE_ENUM } from "doctor-online-common";
import { ACCESS_TOKEN } from "./constants";

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
const ModuleAdminDoctors = React.lazy(
  () => import("./remotes/AdminDoctors/AdminDoctors")
);
const ModuleAdminMedicines = React.lazy(
  () => import("./remotes/AdminMedicines/AdminMedicines")
);
const ModuleAdminTests = React.lazy(
  () => import("./remotes/AdminTests/AdminTests")
);
const ModuleUserSetting = React.lazy(
  () => import("./remotes/UserSetting/UserSetting")
);
const ModuleDoctorScheduleTime = React.lazy(
  () => import("./remotes/DoctorScheduleTime/DoctorScheduleTime")
);
const ModuleAdminPayment = React.lazy(
  () => import("./remotes/AdminPayment/AdminPayment")
);

export function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentUserLogin = useInitApp(iframeRef);

  if (!currentUserLogin && !sessionStorage.getItem(ACCESS_TOKEN)) {
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
        {currentUserLogin?.data && (
          <>
            <Route
              index
              element={
                currentUserLogin?.data.role === ROLE_ENUM.USER ? (
                  <Navigate to="user-home" />
                ) : currentUserLogin?.data.role === ROLE_ENUM.DOCTOR ? (
                  <Navigate to="doctor-dashboard" />
                ) : (
                  <Navigate to="admin-doctors" />
                )
              }
            />
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
            <Route
              path="admin-doctors/*"
              element={
                <Suspense fallback={<LoadingOutlined />}>
                  <ModuleAdminDoctors />
                </Suspense>
              }
            />
            <Route
              path="admin-medicines/*"
              element={
                <Suspense fallback={<LoadingOutlined />}>
                  <ModuleAdminMedicines />
                </Suspense>
              }
            />
            <Route
              path="admin-tests/*"
              element={
                <Suspense fallback={<LoadingOutlined />}>
                  <ModuleAdminTests />
                </Suspense>
              }
            />
            <Route
              path="user-setting/*"
              element={
                <Suspense fallback={<LoadingOutlined />}>
                  <ModuleUserSetting />
                </Suspense>
              }
            />
            <Route
              path="doctor-schedule-time/*"
              element={
                <Suspense fallback={<LoadingOutlined />}>
                  <ModuleDoctorScheduleTime />
                </Suspense>
              }
            />
            <Route
              path="admin-payment/*"
              element={
                <Suspense fallback={<LoadingOutlined />}>
                  <ModuleAdminPayment />
                </Suspense>
              }
            />
          </>
        )}
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
