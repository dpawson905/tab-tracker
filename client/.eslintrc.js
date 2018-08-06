module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: "eslint:recommended",
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: false,
    codeFrame: false
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["off", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"]
  }
};
