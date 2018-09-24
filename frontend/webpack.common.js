const webpack = require("webpack");
const WriteFilePlugin = require("write-file-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");

const vars = {
  title: "Mini Validator List - XRP Ledger Validating Nodes",
  ga: "UA-119672659-1"
};

const HtmlWebpackPluginConfigBase = {
  hash: true,
  template: "./src/index.template.html",
  title: vars.title,
  reactjs: "react.production.min.js",
  reactdomjs: "react-dom.production.min.js",
  ga: vars.ga
};

const config = {
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["*", ".js", ".ts", ".tsx", ".json", ".svg"]
  },
  modules: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
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
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    leaflet: "L",
    "leaflet.markercluster": "L.MarkerCluster",
    "react-leaflet": "ReactLeaflet"
  },
  entry: ["./src/index.tsx"],
  // HTML Webpack Plugin - Production
  HtmlWebpackPluginProduction: HtmlWebpackPluginConfigBase,
  // HTML Webpack Plugin - Development
  HtmlWebpackPluginDevelopment: {
    ...HtmlWebpackPluginConfigBase,
    reactjs: "react.development.js",
    reactdomjs: "react-dom.development.js",
    ga: ""
  }
};

const commonPlugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new BundleAnalyzerPlugin()
];

const devPlugins = commonPlugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new WriteFilePlugin(),
  new HtmlWebpackPlugin(config.HtmlWebpackPluginDevelopment)
]);

const prodPlugins = commonPlugins.concat([
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  }),
  new HtmlWebpackPlugin(config.HtmlWebpackPluginProduction)
]);

module.exports = { config, devPlugins, prodPlugins };
