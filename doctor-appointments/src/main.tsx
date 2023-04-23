import("./bootstrap").then(({ mount }) => {
  const localRoot = document.getElementById("doctor-appointments-local");

  mount({
    mountPoint: localRoot!,
    routingStrategy: "browser",
  });
});

export {};
