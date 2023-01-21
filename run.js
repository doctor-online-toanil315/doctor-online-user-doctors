const concurrently = require("concurrently");

const args = process.argv.slice(2)[0].replace("--apps=", "").split(" ");

const colors = [
  "cyan",
  "yellow",
  "greenBright",
  "blueBright",
  "magentaBright",
  "white",
  "grey",
  "red",
];

concurrently(
  args.map((appName, index) => {
    return {
      command: `yarn --cwd ${appName} start`,
      prefixColor: colors[index],
      name: appName,
    };
  }),
  {
    killOthers: ["failure", "success"],
  }
);

console.log(args);
