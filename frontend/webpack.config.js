const WriteFilePlugin = require("write-file-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { config } = require("./app.config");

module.exports = {
  entry: ["react-hot-loader/patch", "./src/index.js"],
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js",
    hotUpdateChunkFilename: "hot/hot-update.js",
    hotUpdateMainFilename: "hot/hot-update.json"
  },
  devtool: "source-map",
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx", ".json", ".svg"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.css$/,
        use: ["css-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      }
    ]
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    leaflet: "L",
    "leaflet.markercluster": "L.MarkerCluster",
    "react-leaflet": "ReactLeaflet"
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin(),
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin(config.HtmlWebpackPluginDevelopment)
  ],
  devServer: {
    contentBase: "./dist",
    hot: true
  }
};
