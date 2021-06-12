module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "import/prefer-default-export": "off",
    "max-len": ["error", { ignoreComments: true }],
    "no-console": ["error", { allow: ["error"] }],
    "no-param-reassign": ["error", { props: false }],
  },
  plugins: ["jest"],
  ignorePatterns: ["dist/**/*.js"],
};
