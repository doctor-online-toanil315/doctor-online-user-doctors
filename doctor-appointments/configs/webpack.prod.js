const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfigs = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");
const TsconfigPathsWebpackPlugin = require("tsconfig-paths-webpack-plugin");
const { cwd } = require("node:process");
const { resolve } = require("node:path");

const domain = process.env.PRODUCTION_DOMAIN;

const devConfigs = {
  mode: "production",
  entry: "./src/main.tsx",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: `${domain}/doctorAppointments/latest/`,
  },
  resolve: {
    plugins: [
      new TsconfigPathsWebpackPlugin({
        configFile: resolve(cwd(), "./tsconfig.json"),
      }),
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "doctorAppointments",
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
