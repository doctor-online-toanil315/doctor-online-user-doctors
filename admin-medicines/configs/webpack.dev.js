const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfigs = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");
const TsconfigPathsWebpackPlugin = require("tsconfig-paths-webpack-plugin");
const { cwd } = require("node:process");
const { resolve } = require("node:path");

const devConfigs = {
  mode: "development",
  entry: "./src/main.tsx",
  output: {
    publicPath: "http://localhost:5181/",
  },
  resolve: {
    plugins: [
      new TsconfigPathsWebpackPlugin({
        configFile: resolve(cwd(), "./tsconfig.json"),
      }),
    ],
  },
  devServer: {
    port: 5181,
    historyApiFallback: {
      index: "/index.html",
    },
    open: true,
    liveReload: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "adminDoctors",
      filename: "remoteEntry.js",
      exposes: {
        "./Module": "./src/bootstrap.tsx",
      },
      shared: {
        ...packageJson.dependencies,
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfigs, devConfigs);
