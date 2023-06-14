import("./bootstrap").then(({ mount }) => {
  const localRoot = document.getElementById("doctor-blogs-local");

  mount({
    mountPoint: localRoot!,
    routingStrategy: "browser",
  });
});

export {};
