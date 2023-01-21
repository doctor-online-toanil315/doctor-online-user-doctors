import React from "react";
import { createRoot } from "react-dom/client";
import ModulesOverview from "./lib/modules-overview";
import { createRouter, RoutingStrategy } from "./lib/routes";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import {
  apiStore,
  CommonContext,
  store,
  theme,
  repeatClassName,
} from "@nexthcm/common";
import { Provider } from "react-redux";

const increaseSpecificityPlugin = repeatClassName(3);

Object.defineProperty(increaseSpecificityPlugin, "name", {
  value: "stylis-repeat-class-name",
});

const mount = ({
  mountPoint,
  initialPathname,
  routingStrategy,
  storeHost,
}: {
  mountPoint: HTMLElement;
  initialPathname?: string;
  routingStrategy?: RoutingStrategy;
  storeHost?: any;
}) => {
  if (!Boolean(storeHost)) {
    storeHost = {
      store,
      apiStore,
    };
  }

  const router = createRouter({ strategy: routingStrategy, initialPathname });
  const root = createRoot(mountPoint);
  root.render(
    <StyleSheetManager stylisPlugins={[increaseSpecificityPlugin]}>
      <Provider store={storeHost.store} context={CommonContext}>
        <Provider store={storeHost.apiStore}>
          <ThemeProvider theme={theme}>
            <ModulesOverview router={router} />
          </ThemeProvider>
        </Provider>
      </Provider>
    </StyleSheetManager>
  );
};

export { mount };
