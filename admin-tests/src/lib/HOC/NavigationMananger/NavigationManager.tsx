import React, { ReactElement, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

interface NavigationManagerProps {
  children: ReactElement;
}

export default function NavigationManager({
  children,
}: NavigationManagerProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function hostNavigationHandler(event: Event) {
      const pathname = (event as CustomEvent<string>).detail;
      if (location.pathname === pathname) {
        return;
      }
      navigate(pathname);
    }

    window.addEventListener("[host] navigated", hostNavigationHandler);

    return () => {
      window.removeEventListener("[host] navigated", hostNavigationHandler);
    };
  }, [location]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("[admin-tests] navigated", {
        detail: location.pathname + (location.search ?? ""),
      })
    );
  }, [location]);

  return children;
}
