import("./bootstrap").then(({ mount }) => {
  const localRoot = document.getElementById("doctor-dashboard-local");

  mount({
    mountPoint: localRoot!,
    routingStrategy: "browser",
  });
});

export {};
