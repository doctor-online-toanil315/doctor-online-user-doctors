import { Routes, Navigate, Route, Outlet } from "react-router-dom";
import "./styles.scss";
import React, { Suspense, useEffect, useRef } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Layout } from "./containers";
import { EVENT_MESSAGES } from "doctor-online-common";
import { useLazyGetMeQuery } from "./services";

const ModuleUserHome = React.lazy(() => import("./remotes/UserHome/UserHome"));
const ModuleUserDoctors = React.lazy(
  () => import("./remotes/UserDoctors/UserDoctors")
);

export function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [getMe, { data: currentUserLogin }] = useLazyGetMeQuery();

  // Handlers to notice when iframe loaded
  const handleIframeOnLoad = () => {
    iframeRef.current?.contentWindow?.postMessage(
      EVENT_MESSAGES.GET_AUTH_DATA,
      "*"
    );
  };

  // Handler get tokens from auth app
  const handleGetTokens = (event: any) => {
    // http://127.0.0.1:5173 is auth app domain
    if (event.origin !== "http://127.0.0.1:5173") return;
    // handle event message
    switch (event.data) {
      case EVENT_MESSAGES.HAND_SHAKE:
        handleIframeOnLoad();
        break;

      case EVENT_MESSAGES.NEED_TO_LOGIN:
        window.location.href = `http://127.0.0.1:5173/login?from=${window.location.href}`;
        break;

      default:
        sessionStorage.setItem("accessToken", event.data.accessToken);
        getMe();
        break;
    }
  };

  useEffect(() => {
    // Subscription event
    window.addEventListener("message", handleGetTokens);

    // unSubscribe when unmount
    return () => {
      window.removeEventListener("message", handleGetTokens);
    };
  }, []);

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
      </Route>
    </Routes>
  );
}

export default App;
