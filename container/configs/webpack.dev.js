const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfigs = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");

const devConfigs = {
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
      remotes: {
        overview: "overview@http://localhost:5174/remoteEntry.js",
        my_time: "my_time@http://localhost:5175/remoteEntry.js",
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
