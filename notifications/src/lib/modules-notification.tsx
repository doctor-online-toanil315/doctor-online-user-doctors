import {
  EVENT_MESSAGES,
  RootState,
  savePermission,
  saveUserGeneral,
  useCommonDispatch,
  useCommonSelector,
  useLazyGetPermissionsQuery,
  useLazyGetUserGeneralQuery,
} from "@nexthcm/common";
import { useEffect, useRef, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import i18n from "./i18n/config";
import { store } from "./redux/store";
import { decodeToken } from "react-jwt";

/* eslint-disable-next-line */
export interface ModulesNotificationProps {
  router: any;
}

interface UserType {
  userId: string;
  fullName: string;
  subPath: string;
  tenantId: string;
  orgId: string;
}

export function ModulesNotification({ router }: ModulesNotificationProps) {
  const { lang } = useCommonSelector((state: RootState) => state.lang);
  const { permissions } = useCommonSelector((state: RootState) => state.user);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const dispatch = useCommonDispatch();

  const [triggerFetchPermissions, { data }] = useLazyGetPermissionsQuery();
  const [triggerFetchUserGeneral, { data: dataUserGeneral }] =
    useLazyGetUserGeneralQuery();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  useEffect(() => {
    const handleIframeOnLoad = () => {
      iframeRef.current?.contentWindow?.postMessage(
        EVENT_MESSAGES.GET_AUTH_DATA,
        "*"
      );
    };

    const handleGetAuthData = (event) => {
      // http://127.0.0.1:4201 is auth app domain
      if (event.origin !== "http://127.0.0.1:8001") return;
      if (event.data === "handShake") {
        handleIframeOnLoad();
      } else {
        sessionStorage.setItem("access_token", event.data.accessToken);
        if (event.data.accessToken) {
          const userDecode: UserType | null = decodeToken(
            event.data.accessToken!
          );
          triggerFetchPermissions({});
          triggerFetchUserGeneral({ id: userDecode?.userId });
        }
      }
    };

    window.addEventListener("message", handleGetAuthData);

    return () => {
      window.removeEventListener("message", handleGetAuthData);
    };
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(savePermission(data));
    }
  }, [JSON.stringify(data)]);

  useEffect(() => {
    if (dataUserGeneral) {
      dispatch(
        saveUserGeneral({
          user: {
            userId: dataUserGeneral?.data?.id,
            fullName: dataUserGeneral?.data?.fullName,
            subPath: dataUserGeneral?.data?.image,
            tenantId: dataUserGeneral?.data?.tenantId,
            orgId: dataUserGeneral?.data?.organization?.id,
          },
        } as any)
      );
    }
  }, [JSON.stringify(dataUserGeneral)]);

  if (permissions.length === 0) {
    return (
      <>
        <iframe
          ref={iframeRef}
          id="iframeContainer"
          width={0.1}
          height={0.1}
          src="http://127.0.0.1:8001/"
        />
      </>
    );
  }

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </Provider>
  );
}

export default ModulesNotification;
