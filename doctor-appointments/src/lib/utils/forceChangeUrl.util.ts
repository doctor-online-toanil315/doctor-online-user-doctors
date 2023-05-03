export const forceChangeUrl = (pathName: string) => {
  window.dispatchEvent(
    new CustomEvent("app-force-change", {
      detail: pathName,
    })
  );
};
