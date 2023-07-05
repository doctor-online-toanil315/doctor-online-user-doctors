import {
  EVENT_MESSAGES,
  saveClient,
  useCommonDispatch,
} from "doctor-online-common";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { ACCESS_TOKEN } from "src/constants";
import { useLazyGetMeQuery } from "src/services";

const useInitApp = (iframeRef: React.RefObject<HTMLIFrameElement>) => {
  const [getMe, { data: currentUserLogin }] = useLazyGetMeQuery();
  const navigate = useNavigate();
  const dispatch = useCommonDispatch();

  // Handlers to notice when iframe loaded
  const handleIframeOnLoad = () => {
    iframeRef.current?.contentWindow?.postMessage(
      EVENT_MESSAGES.GET_AUTH_DATA,
      "*"
    );
  };

  // Handler get tokens from auth app
  const handleGetTokens = (event: any) => {
    if (event.origin !== process.env.CENTRAL_AUTH_APP_URL) return;
    // handle event message
    switch (event.data) {
      case EVENT_MESSAGES.HAND_SHAKE:
        handleIframeOnLoad();
        break;

      case EVENT_MESSAGES.NEED_TO_LOGIN:
        window.location.href = `${process.env.CENTRAL_AUTH_APP_URL}/login?from=${window.location.href}`;
        break;

      default:
        sessionStorage.setItem("accessToken", event.data.accessToken);
        getMe();
        break;
    }
  };

  const handleForceChange = (event: Event) => {
    const pathName = (event as CustomEvent<string>).detail;
    if (pathName === location.pathname) {
      return;
    }
    navigate(pathName);
  };

  useEffect(() => {
    // Subscription event
    window.addEventListener("message", handleGetTokens);
    window.addEventListener("app-force-change", handleForceChange);

    if (sessionStorage.getItem(ACCESS_TOKEN)) {
      getMe();
    }

    // unSubscribe when unmount
    return () => {
      window.removeEventListener("message", handleGetTokens);
      window.removeEventListener("app-force-change", handleForceChange);
    };
  }, []);

  const isFirstRunRef = useRef<boolean>(true);
  useEffect(() => {
    if (currentUserLogin && isFirstRunRef.current) {
      const socket = io(`http://localhost:8001`, {
        query: {
          token: sessionStorage.getItem(ACCESS_TOKEN),
        },
      });
      dispatch(
        saveClient({
          client: socket as any,
        })
      );
      isFirstRunRef.current = false;
    }
  }, [JSON.stringify(currentUserLogin)]);

  return currentUserLogin;
};

export default useInitApp;
