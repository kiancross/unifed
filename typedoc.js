/*
 * CS3099 Group A3
 */

// Derived from
// https://github.com/yarnpkg/berry/blob/master/packages/gatsby/typedoc.js

/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {
  name: "Unifed",
  exclude: [
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/build/*",
    "**/__tests__/**",
    "**/frontend/src/react-app-env*",
  ],
  out: "docs",
  entryPoints: ["packages"],

  excludeExternals: true,

  plugin: ["@strictsoftware/typedoc-plugin-monorepo"],

  "external-modulemap": ".*packages/([^/]+)/.*",
};
