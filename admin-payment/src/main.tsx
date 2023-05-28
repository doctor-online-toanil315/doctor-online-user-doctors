import("./bootstrap").then(({ mount }) => {
  const localRoot = document.getElementById("admin-doctors-local");

  mount({
    mountPoint: localRoot!,
    routingStrategy: "browser",
  });
});

export {};
