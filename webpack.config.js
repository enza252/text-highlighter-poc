const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

//flag used to define whether production or development env values should be used
const prod = process.argv.indexOf("production") !== -1;

module.exports = {
  entry: "./src/index.js",
  devServer: {
    historyApiFallback: true,
    contentBase: "./",
    hot: true
  },
  performance: { hints: false },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,

        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: "file-loader?name=fonts/[name].[ext]"
      }
    ]
  },
  node: {
    console: false,
    fs: "empty",
    net: "empty",
    tls: "empty"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
