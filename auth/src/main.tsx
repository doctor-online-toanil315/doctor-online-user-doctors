import("./bootstrap").then(({ mount }) => {
  const localRoot = document.getElementById("auth-local");

  mount({
    mountPoint: localRoot!,
    routingStrategy: "browser",
  });
});

export {};
