const baseConfig = require("./base");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...baseConfig,
  globals: { React: true, JSX: true },
  env: { node: true, browser: true },
};
