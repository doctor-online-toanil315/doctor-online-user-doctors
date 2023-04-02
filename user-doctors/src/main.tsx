import("./bootstrap").then(({ mount }) => {
  const localRoot = document.getElementById("user-doctors-local");

  mount({
    mountPoint: localRoot!,
    routingStrategy: "browser",
  });
});

export {};
