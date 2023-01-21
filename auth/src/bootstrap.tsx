import React from 'react';
import { createRoot } from 'react-dom/client';
import ModulesAuth from './lib/modules-auth';
import { createRouter, RoutingStrategy } from './lib/routes';

import { ThemeProvider } from 'styled-components';
import { apiStore, CommonContext, store, theme } from '@nexthcm/common';
import { Provider } from 'react-redux';

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
          <ModulesAuth router={router} />
        </ThemeProvider>
      </Provider>
    </Provider>
  );
};

export { mount };
