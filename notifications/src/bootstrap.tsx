import React from 'react';
import { createRoot } from 'react-dom/client';
import { createRouter, RoutingStrategy } from './lib/routes';

import { ThemeProvider } from 'styled-components';
import { apiStore, CommonContext, i18n, store, theme } from '@nexthcm/common';
import { Provider } from 'react-redux';
import ModulesNotification from './lib/modules-notification';
import { Notification } from './lib/components/Notification';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { NavigationManager } from './lib/HOC';

const mount = ({
  mountPoint,
  initialPathname,
  routingStrategy,
}: {
  mountPoint: HTMLElement;
  initialPathname?: string;
  routingStrategy?: RoutingStrategy;
}) => {
  const router = createRouter({ strategy: routingStrategy, initialPathname });
  const root = createRoot(mountPoint);
  root.render(
    <Provider store={store} context={CommonContext}>
      <Provider store={apiStore}>
        <ThemeProvider theme={theme}>
          <ModulesNotification router={router} />
        </ThemeProvider>
      </Provider>
    </Provider>
  );
};

const mountNotificationComponent = ({
  mountPoint,
  initialPathname,
  storeHost,
}: {
  mountPoint: HTMLElement;
  storeHost: any;
  initialPathname?: string;
}) => {
  const root = createRoot(mountPoint);
  root.render(
    <Provider store={storeHost} context={CommonContext}>
      <Provider store={apiStore}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={[initialPathname || '/']}>
              <Routes>
                <Route
                  path="*"
                  element={
                    <NavigationManager navigateType="component">
                      <Notification />
                    </NavigationManager>
                  }
                />
              </Routes>
            </MemoryRouter>
          </ThemeProvider>
        </I18nextProvider>
      </Provider>
    </Provider>
  );
};

export { mount, mountNotificationComponent };
