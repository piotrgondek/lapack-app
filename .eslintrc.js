module.exports = {
  root: true,
  parserOptions: {
    project: "./tsconfig.eslint.json",
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "prettier" /* , "prettier-plugin-tailwindcss" */,
  ],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier",
  ],
  rules: {
    "prettier/prettier": "error",
    "react-hooks/exhaustive-deps": "error",
  },
};
