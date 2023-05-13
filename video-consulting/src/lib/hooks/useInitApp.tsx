import {
  EVENT_MESSAGES,
  RootState,
  saveClient,
  useCommonDispatch,
  useCommonSelector,
} from "doctor-online-common";
import { RefObject, useEffect, useRef } from "react";
import { useLazyGetMeQuery } from "../services";
import i18n from "../i18n/config";
import { ACCESS_TOKEN } from "../constants";
import { io } from "socket.io-client";

export const useInitApp = (iframeRef: RefObject<HTMLIFrameElement>) => {
  const { lang } = useCommonSelector((state: RootState) => state.lang);

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

  const isFirstRunRef = useRef<boolean>(true);
  useEffect(() => {
    if (currentUserLogin && isFirstRunRef.current) {
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
      isFirstRunRef.current = false;
    }
  }, [JSON.stringify(currentUserLogin)]);

  return currentUserLogin;
};
