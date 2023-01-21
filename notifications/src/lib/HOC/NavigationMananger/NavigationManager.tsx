import React, { ReactElement, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

interface NavigationManagerProps {
  children: ReactElement;
  navigateType?: 'component' | 'app';
}

export default function NavigationManager({
  children,
  navigateType = 'app',
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

    window.addEventListener(
      `[host] ${navigateType === 'component' ? 'changed' : 'navigated'}`,
      hostNavigationHandler
    );

    return () => {
      window.removeEventListener(
        `[host] ${navigateType === 'component' ? 'changed' : 'navigated'}`,
        hostNavigationHandler
      );
    };
  }, [location]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(
        `[${
          navigateType === 'component' ? 'noti' : 'notifications'
        }] navigated`,
        {
          detail: location.pathname,
        }
      )
    );
  }, [location]);

  return children;
}
