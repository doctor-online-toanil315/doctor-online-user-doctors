import { useRef } from "react";
import { I18nextProvider } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import i18n from "./i18n/config";
import { createRouter, RoutingStrategy } from "./routes";
import "./index.css";
import { useInitApp } from "./hooks";

/* eslint-disable-next-line */
export interface ModuleDoctorAppointmentsProps {
  initialPathname?: string;
  routingStrategy?: RoutingStrategy;
}

export function ModuleDoctorAppointments({
  initialPathname,
  routingStrategy,
}: ModuleDoctorAppointmentsProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentUserLogin = useInitApp(iframeRef);

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

export default ModuleDoctorAppointments;
