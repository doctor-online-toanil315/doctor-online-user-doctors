import {
  EVENT_MESSAGES,
  saveClient,
  useCommonDispatch,
} from "doctor-online-common";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { ACCESS_TOKEN } from "src/constants";
import { useLazyGetMeQuery } from "src/services";

const useInitApp = (iframeRef: React.RefObject<HTMLIFrameElement>) => {
  const [getMe, { data: currentUserLogin }] = useLazyGetMeQuery();
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

  useEffect(() => {
    if (currentUserLogin) {
      const socket = io("http://localhost:8001", {
        query: {
          token: sessionStorage.getItem(ACCESS_TOKEN),
        },
      });
      dispatch(
        saveClient({
          client: socket as any,
        })
      );
    }
  }, [JSON.stringify(currentUserLogin)]);

  return currentUserLogin;
};

export default useInitApp;
