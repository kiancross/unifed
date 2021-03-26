/*
 * CS3099 Group A3
 */

// Workaround for https://github.com/eslint/eslint/issues/3458
require("@rushstack/eslint-patch/modern-module-resolution");

// eslint-disable-next-line
const fs = require("fs");

const config = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:prettier/recommended",
  ],
  plugins: ["import"],
  rules: {
    "import/no-default-export": 2,
  },
  settings: {
    "import/resolver": "typescript",
  },
};

const schemaPath = __dirname + "/.schema.graphql";

if (fs.existsSync(schemaPath)) {
  const schema = fs.readFileSync(schemaPath, "utf8");

  config.plugins.push("graphql");
  config.rules["graphql/template-strings"] = [
    "error",
    {
      env: "apollo",
      schemaString: schema,
    },
  ];
}

module.exports = config;
