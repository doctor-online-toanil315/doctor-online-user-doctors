import {
  RootState,
  savePermission,
  saveUserGeneral,
  useCommonDispatch,
  useCommonSelector,
  useLazyGetPermissionsQuery,
  useLazyGetUserGeneralQuery,
  EVENT_MESSAGES,
} from "@nexthcm/common";
import { useEffect, useRef } from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { RouterProvider, useSearchParams } from "react-router-dom";

import { store } from "./redux/store";
import { decodeToken } from "react-jwt";
import i18n from "./i18n/config";

/* eslint-disable-next-line */
export interface ModulesOverViewProps {
  router: any;
}

interface UserType {
  userId: string;
  fullName: string;
  subPath: string;
  tenantId: string;
  orgId: string;
}

export function ModulesMyTime({ router }: ModulesOverViewProps) {
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

  // Handlers to notice when iframe loaded
  const handleIframeOnLoad = () => {
    iframeRef.current?.contentWindow?.postMessage(
      EVENT_MESSAGES.GET_AUTH_DATA,
      "*"
    );
  };

  // Handler get tokens from auth app
  const handleGetTokens = (event) => {
    // http://127.0.0.1:5173 is auth app domain
    if (event.origin !== "http://127.0.0.1:5173") return;
    // handle event message
    switch (event.data) {
      case EVENT_MESSAGES.HAND_SHAKE:
        handleIframeOnLoad();
        break;

      case EVENT_MESSAGES.NEED_TO_LOGIN:
        window.location.href = `http://127.0.0.1:5173/login?from=http://127.0.0.1:8000${
          window.location.pathname
        }${window.location.search ? "?" + window.location.search : ""}`;
        break;

      default:
        localStorage.setItem("access_token", event.data.accessToken);
        localStorage.setItem("refresh_token", event.data.refreshToken);
        handleGetAuthData();
        break;
    }
  };

  // handler get auth data
  const handleGetAuthData = () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const userDecode: UserType | null = decodeToken(accessToken);
      triggerFetchPermissions({});
      triggerFetchUserGeneral({ id: userDecode?.userId });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token") && permissions.length === 0) {
      handleGetAuthData();
    }

    // Subscription event
    window.addEventListener("message", handleGetTokens);

    // unSubscribe when unmount
    return () => {
      window.removeEventListener("message", handleGetTokens);
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

  if (!localStorage.getItem("access_token")) {
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
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </Provider>
  );
}

export default ModulesMyTime;
