import("./bootstrap").then(({ mount }) => {
  const localRoot = document.getElementById("my-time-local");

  mount({
    mountPoint: localRoot!,
    routingStrategy: "browser",
  });
});

export {};
