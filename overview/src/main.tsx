import("./bootstrap").then(({ mount }) => {
  const localRoot = document.getElementById("overview-local");

  mount({
    mountPoint: localRoot!,
    routingStrategy: "browser",
  });
});

export {};
