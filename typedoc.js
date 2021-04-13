/*
 * CS3099 Group A3
 */

/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {
  name: "Unifed Developer Documentation",
  exclude: [
    "**/index.ts",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/build/*",
    "**/__tests__/**",
    "**/frontend/src/react-app-env*",
  ],
  out: "docs/developers",
  entryPoints: ["packages/"],
  readme: "docs/_README.md",

  excludeExternals: true,

  plugin: ["@strictsoftware/typedoc-plugin-monorepo"],

  "external-modulemap": ".*packages/([^/]+)/.*",
};
