import("./bootstrap").then(({ mount }) => {
  const localRoot = document.getElementById("video-consulting-local");

  mount({
    mountPoint: localRoot!,
    routingStrategy: "browser",
  });
});

export {};
