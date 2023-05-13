import React from "react";
import { createRoot } from "react-dom/client";
import ModuleUserAppointments from "./lib/modules-user-appointments";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import {
  theme,
  repeatClassName,
  store,
  CommonContext,
  apiStore,
} from "doctor-online-common";
import { RoutingStrategy } from "./lib/routes";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import { store as mainStore } from "src/lib/redux/store";
import "doctor-online-common/dist/styles/variables.css";

const increaseSpecificityPlugin = repeatClassName(3);

Object.defineProperty(increaseSpecificityPlugin, "name", {
  value: "stylis-repeat-class-name",
});

const mount = ({
  mountPoint,
  initialPathname,
  routingStrategy,
}: {
  mountPoint: HTMLElement;
  initialPathname?: string;
  routingStrategy?: RoutingStrategy;
}) => {
  const root = createRoot(mountPoint);
  root.render(
    <StyleSheetManager
      disableCSSOMInjection
      target={document.getElementById("root") as any}
      // stylisPlugins={[increaseSpecificityPlugin]}
    >
      <ThemeProvider theme={theme}>
        <Provider store={store} context={CommonContext}>
          <Provider store={apiStore}>
            <Provider store={mainStore}>
              <ModuleUserAppointments
                initialPathname={initialPathname}
                routingStrategy={routingStrategy}
              />
            </Provider>
          </Provider>
        </Provider>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export { mount };
