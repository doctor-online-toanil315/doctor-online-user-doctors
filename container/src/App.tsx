import { Navigate, Route, Routes } from "react-router-dom";
import "./styles.scss";
import React, { Suspense } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Layout } from "@nexthcm/components";
import { RootState, useCommonSelector } from "@nexthcm/common";

const ModulesOverView = React.lazy(() => import("./remotes/Overview/Overview"));
// const ModulesNotification = React.lazy(
//   () => import("./remotes/Notifications/Notifications")
// );
// const NotificationComponent = React.lazy(
//   () => import("./remotes/Notifications/components/NotificationBell")
// );
const ModulesMyTime = React.lazy(() => import("./remotes/MyTime/MyTime"));

export function App() {
  useCommonSelector((state: RootState) =>
    console.log("state in Root: ", state)
  );

  return (
    <Routes>
      <Route
        element={
          <Suspense fallback={<LoadingOutlined />}>
            {/* <Layout notificationComponent={<NotificationComponent />} /> */}
            <Layout />
          </Suspense>
        }
      >
        <Route index element={<Navigate to="overview/me" />} />
        <Route
          path="overview/*"
          element={
            <Suspense fallback={<LoadingOutlined />}>
              <ModulesOverView />
            </Suspense>
          }
        />
        {/* <Route path="notifications/*" element={<ModulesNotification />} /> */}
        <Route
          path="my-time/*"
          element={
            <Suspense fallback={<LoadingOutlined />}>
              <ModulesMyTime />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
