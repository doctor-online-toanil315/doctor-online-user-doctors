import("./bootstrap").then(({ mount }) => {
  const localRoot = document.getElementById("user-setting-local");

  mount({
    mountPoint: localRoot!,
    routingStrategy: "browser",
  });
});

export {};
