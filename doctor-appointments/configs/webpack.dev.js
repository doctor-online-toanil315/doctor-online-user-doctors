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
    publicPath: "http://localhost:5177/",
  },
  resolve: {
    plugins: [
      new TsconfigPathsWebpackPlugin({
        configFile: resolve(cwd(), "./tsconfig.json"),
      }),
    ],
  },
  devServer: {
    port: 5177,
    historyApiFallback: {
      index: "/index.html",
    },
    open: true,
    liveReload: true,
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
        // react: {
        //   singleton: true,
        //   requiredVersion: packageJson.dependencies.react,
        // },
        // "react-dom": {
        //   singleton: true,
        //   requiredVersion: packageJson.dependencies["react-dom"],
        // },
        // "react-redux": {
        //   singleton: true,
        //   requiredVersion: packageJson.dependencies["react-redux"],
        // },
        // "@reduxjs/toolkit": {
        //   singleton: true,
        //   requiredVersion: packageJson.dependencies["@reduxjs/toolkit"],
        // },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfigs, devConfigs);
