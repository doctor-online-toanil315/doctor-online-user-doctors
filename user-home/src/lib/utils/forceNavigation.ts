export const forceNavigate = (path: string) => {
  window.dispatchEvent(
    new CustomEvent("app-force-change", {
      detail: path,
    })
  );
};
