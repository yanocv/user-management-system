const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const environment = process.env.NODE_ENV || "dev";

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "inline-source-map",
  resolve: {
    alias: {
      userEnv$: path.resolve(__dirname, `.env/${environment}.js`),
    },
  },
  devServer: {
    port: 8080,
    hot: true,
    client: {
      overlay: false,
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
});
