import {
  RootState,
  useCommonSelector,
  EVENT_MESSAGES,
  useCommonDispatch,
  saveClient,
} from "doctor-online-common";
import { useEffect, useRef } from "react";
import { I18nextProvider } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import i18n from "./i18n/config";
import { ACCESS_TOKEN } from "./constants";
import { createRouter, RoutingStrategy } from "./routes";
import { useLazyGetMeQuery } from "./services";
import { io } from "socket.io-client";
import "./index.css";

/* eslint-disable-next-line */
export interface ModuleUserDoctorsProps {
  initialPathname?: string;
  routingStrategy?: RoutingStrategy;
}

export function ModuleUserDoctors({
  initialPathname,
  routingStrategy,
}: ModuleUserDoctorsProps) {
  const { lang } = useCommonSelector((state: RootState) => state.lang);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [getMe, { data: currentUserLogin }] = useLazyGetMeQuery();
  const dispatch = useCommonDispatch();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

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
        sessionStorage.setItem(ACCESS_TOKEN, event.data.accessToken);
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
    <I18nextProvider i18n={i18n}>
      <RouterProvider
        router={createRouter({ strategy: routingStrategy, initialPathname })}
      />
    </I18nextProvider>
  );
}

export default ModuleUserDoctors;
