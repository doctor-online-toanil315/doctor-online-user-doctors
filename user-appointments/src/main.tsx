import("./bootstrap").then(({ mount }) => {
  const localRoot = document.getElementById("user-appointments-local");

  mount({
    mountPoint: localRoot!,
    routingStrategy: "browser",
  });
});

export {};
