import { useRef } from "react";
import { I18nextProvider } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import i18n from "./i18n/config";
import { createRouter, RoutingStrategy } from "./routes";
import "./index.css";
import { useInitApp } from "./hooks";
import { ACCESS_TOKEN } from "./constants";

/* eslint-disable-next-line */
export interface ModuleAdminTestsProps {
  initialPathname?: string;
  routingStrategy?: RoutingStrategy;
}

export function ModuleAdminTests({
  initialPathname,
  routingStrategy,
}: ModuleAdminTestsProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [currentUserLogin, isError] = useInitApp(iframeRef);

  if (!currentUserLogin && !sessionStorage.getItem(ACCESS_TOKEN)) {
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
          src={process.env.CENTRAL_AUTH_APP_URL}
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

export default ModuleAdminTests;
