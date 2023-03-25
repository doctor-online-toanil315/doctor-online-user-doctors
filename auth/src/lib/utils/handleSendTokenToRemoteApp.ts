import { EVENT_MESSAGES } from "doctor-online-common";

export default function handleSendTokenToRemoteApp(window: Window) {
  const accessToken =
    localStorage.getItem("access_token") ??
    sessionStorage.getItem("access_token");
  if (accessToken) {
    window.postMessage(
      {
        accessToken,
        refreshToken: localStorage.getItem("refresh_token"),
      },
      "*"
    );
  } else {
    window.postMessage(EVENT_MESSAGES.NEED_TO_LOGIN, "*");
  }
}
