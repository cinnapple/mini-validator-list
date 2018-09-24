const { config, prodPlugins } = require("./webpack.common");

module.exports = {
  entry: config.entry,
  output: {
    ...config.output
  },
  resolve: config.resolve,
  module: config.modules,
  externals: config.externals,
  plugins: prodPlugins
};
