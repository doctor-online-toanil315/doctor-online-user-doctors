import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CommonContext, theme, store, i18n, apiStore } from "@nexthcm/common";
import { StyleSheetManager, ThemeProvider } from "styled-components";

import App from "./App";
import { I18nextProvider } from "react-i18next";
import { repeatClassName } from "@nexthcm/common";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const increaseSpecificityPlugin = repeatClassName(3);

Object.defineProperty(increaseSpecificityPlugin, "name", {
  value: "stylis-repeat-class-name",
});

root.render(
  <StrictMode>
    <StyleSheetManager stylisPlugins={[increaseSpecificityPlugin]}>
      <Provider store={store} context={CommonContext}>
        <Provider store={apiStore}>
          <ThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </I18nextProvider>
          </ThemeProvider>
        </Provider>
      </Provider>
    </StyleSheetManager>
  </StrictMode>
);
