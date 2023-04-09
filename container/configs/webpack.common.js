const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs"); // to check if the file exists
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const resolve = path.resolve;
const pathResolver = (path) => resolve(__dirname, path);

const getEnvVariables = () => {
  // Get the root path (assuming your webpack config is in the root of your project!)
  const rootPath = path.resolve(__dirname, "../");

  // Create the fallback path (the production .env)
  const basePath = rootPath + "/.env";

  // We're concatenating the environment name to our filename to specify the correct env file!
  // const envPath = basePath + '.' + mode;
  const envPath = basePath;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  // reduce it to a object
  const envKeys = Object.keys(fileEnv).reduce((envObj, key) => {
    envObj[key] = fileEnv[key];
    return envObj;
  }, {});

  return envKeys;
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              [
                "import",
                { libraryName: "antd", libraryDirectory: "lib" },
                "antd",
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // Rules for Ant-Design
      {
        test: /\.less$/,
        include: [/[\\/]node_modules[\\/].*antd/],
        use: [
          MiniCssExtractPlugin.loader, // replaces extract text plugin in webpack 4
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(getEnvVariables()),
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  resolve: {
    modules: [__dirname, "node_modules"],
    extensions: ["", ".js", ".jsx", ".ts", ".tsx"],
  },
};
