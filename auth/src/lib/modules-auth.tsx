import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import { store } from "./redux/store";

import i18n from "./i18n/config";
import {
  RootState,
  useCommonSelector,
  EVENT_MESSAGES,
} from "doctor-online-common";
import { handleSendTokenToRemoteApp } from "./utils";

interface ModuleAuthProps {
  router: any;
}

export function ModulesAuth({ router }: ModuleAuthProps) {
  const { lang } = useCommonSelector((state: RootState) => {
    return state.lang;
  });

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  useEffect(() => {
    const parent = window.parent;
    parent.postMessage(EVENT_MESSAGES.HAND_SHAKE, "*");

    const handleSendAuthData = (event) => {
      if (event.data === EVENT_MESSAGES.GET_AUTH_DATA) {
        handleSendTokenToRemoteApp(parent);
      }
    };

    window.addEventListener("message", handleSendAuthData);

    return () => {
      window.removeEventListener("message", handleSendAuthData);
    };
  }, []);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </Provider>
  );
}

export default ModulesAuth;
