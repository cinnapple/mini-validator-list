module.exports = function() {
  return {
    files: [
      "src/**/*.ts",
      { pattern: "tsconfig.*", instrument: false },
      { pattern: "package.json", instrument: false }
    ],

    tests: ["__tests__/**/*.spec.ts"],

    env: {
      type: "node",
      runner: "node"
    },

    testFramework: "jest",

    setup: wallaby => {
      var jestConfig = require("./package.json").jest;
      wallaby.testFramework.configure(jestConfig);
    }
  };
};
