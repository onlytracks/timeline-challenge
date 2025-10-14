const functions = ["cn", "clsx", "cva"];

/** @type {import("prettier").Config} */
const config = {
  // printWidth: 100,
  tailwindFunctions: functions,
  customFunctions: functions,
  endingPosition: "absolute",
  plugins: [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-classnames",
    "prettier-plugin-merge",
  ],
};

export default config;
