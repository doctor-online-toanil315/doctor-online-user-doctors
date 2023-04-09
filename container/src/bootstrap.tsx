import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { repeatClassName, theme } from "doctor-online-common";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const increaseSpecificityPlugin = repeatClassName(3);

Object.defineProperty(increaseSpecificityPlugin, "name", {
  value: "stylis-repeat-class-name",
});

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
