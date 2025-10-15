import type { Config } from "prettier";

const functions = ["cn", "clsx", "cva"];

const config: Config = {
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
