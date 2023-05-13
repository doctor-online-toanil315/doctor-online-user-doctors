import("./bootstrap").then(({ mount }) => {
  const localRoot = document.getElementById("user-home-local");

  mount({
    mountPoint: localRoot!,
    routingStrategy: "browser",
  });
});

export {};
