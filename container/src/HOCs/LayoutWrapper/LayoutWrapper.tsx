import React, { ReactElement, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

interface Props {
  mountFunc: any;
  children: ReactElement;
}

const LayoutWrapper = ({ mountFunc, children }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Listen to navigation events dispatched inside remote remote app.
  useEffect(() => {
    const remoteAppNavigationEventHandler = (event: Event) => {
      const pathname = (event as CustomEvent<string>).detail;
      if (pathname === location.pathname.split("/")[1]) {
        return;
      }
      navigate(pathname);
    };
    window.addEventListener(
      `[layout] navigated`,
      remoteAppNavigationEventHandler
    );

    return () => {
      window.removeEventListener(
        `[layout] navigated`,
        remoteAppNavigationEventHandler
      );
    };
  }, [location]);

  // Listen for host location changes and dispatch a notification.
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("[host] change sidebar", {
        detail: location.pathname.split("/")[1],
      })
    );
  }, [location]);

  // Mount layout
  useEffect(() => {
    mountFunc({
      mountPoint: wrapperRef.current!,
      initialPathname: location.pathname.split("/")[1],
    });
  }, []);

  return (
    <div ref={wrapperRef} id={`layout-mfe`}>
      {children}
    </div>
  );
};

export default LayoutWrapper;
