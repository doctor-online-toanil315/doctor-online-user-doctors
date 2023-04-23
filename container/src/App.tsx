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
          src="http://127.0.0.1:5173/"
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
      </Route>
    </Routes>
  );
}

export default App;
