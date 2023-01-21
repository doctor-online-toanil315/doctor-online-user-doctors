import("./bootstrap").then(({ mount }) => {
  const localRoot = document.getElementById("notifications-local");

  mount({
    mountPoint: localRoot!,
    routingStrategy: "browser",
  });
});

export * from "./bootstrap";
