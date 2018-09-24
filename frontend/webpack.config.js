const { config, devPlugins } = require("./webpack.common");

module.exports = {
  entry: config.entry.concat("react-hot-loader/patch"),
  output: {
    ...config.output,
    hotUpdateChunkFilename: "hot/hot-update.js",
    hotUpdateMainFilename: "hot/hot-update.json"
  },
  resolve: config.resolve,
  module: config.modules,
  externals: config.externals,
  plugins: devPlugins,
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    hot: true
  }
};
