/*
 * CS3099 Group A3
 */

const glob = require("glob");

/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {
  name: "Unifed Developer Documentation",
  exclude: [
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/build/*",
    "**/__tests__/**",
    "**/frontend/src/react-app-env*",
  ],
  out: "docs/developers",
  entryPoints: glob.sync("packages/**/index.ts"),

  excludeExternals: true,

  plugin: ["@strictsoftware/typedoc-plugin-monorepo"],

  "external-modulemap": ".*packages/([^/]+)/.*",
};
