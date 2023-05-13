const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfigs = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");
const remotePathDev = require("./remotePath.dev.json");
const remotePathQa = require("./remotePath.qa.json");
const path = require("path");

const domain = process.env.PRODUCTION_DOMAIN;

const getRemotePaths = (localApps) => {
  // remote config
  const qaConfigs = Object.keys(remotePathQa).reduce(
    (remoteConfigs, subAppKey) => {
      // current key is not included in local app => get from qa, else get from dev
      const configItem =
        localApps.findIndex((localItem) => localItem === subAppKey) === -1
          ? remotePathQa[subAppKey]
          : remotePathDev[subAppKey];

      remoteConfigs[
        configItem.appName
      ] = `${configItem.appName}@${configItem.path}`;

      return remoteConfigs;
    },
    {}
  );

  return qaConfigs;
};

const getDevConfigs = (localApps) => ({
  mode: "development",
  entry: "./src/main.tsx",
  output: {
    publicPath: "http://localhost:8000/",
  },
  devServer: {
    port: 8000,
    historyApiFallback: {
      index: "/index.html",
    },
    open: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: getRemotePaths(localApps),
      shared: {
        ...packageJson.dependencies,
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  resolve: {
    modules: [__dirname, "node_modules"],
    extensions: ["", ".js", ".jsx", ".ts", ".tsx"],
    alias: {
      src: path.resolve(__dirname, "../", "src/"),
    },
    symlinks: true,
  },
});

module.exports = (env) => {
  const localApps = env.apps.split(",");
  return merge(commonConfigs, getDevConfigs(localApps));
};
