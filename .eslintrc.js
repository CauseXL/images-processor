module.exports = {
  extends: ["alloy", "alloy/react", "alloy/typescript"],
  plugins: ["react-hooks", "import", "prefer-arrow"],
  rules: {
    // * ------------------------------------------------ react hooks

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // * ------------------------------------------------ lines

    "max-lines": ["warn", 140],
    "max-lines-per-function": ["warn", 120],

    // * ------------------------------------------------ import

    "import/no-default-export": "error",
    "import/no-extraneous-dependencies": "error",

    // * ------------------------------------------------ ts

    // "@typescript-eslint/no-explicit-any": "error",

    // * ------------------------------------------------ arrow function

    "prefer-arrow/prefer-arrow-functions": [
      "warn",
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    "prefer-arrow-callback": ["warn", { allowNamedFunctions: true }],
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],

    // * ------------------------------------------------ misc

    "max-params": "warn",
    "no-unreachable": "warn",

    /** 注意，现在有全局的 logger 系统，可以控制是否开启，如果要在业务中保留 console.log，请用 logger.debug */
    "no-console": "warn",
  },
  settings: { react: { version: "detect" } },
};
