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

exports.config = {
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
