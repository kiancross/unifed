/*
 * CS3099 Group A3
 */

const glob = require("glob");

const entryPoints = glob.sync("packages/**/index.ts");

entryPoints.push("packages/backend-ml/src/train.ts");
entryPoints.push("packages/backend-ml/src/test-model.ts");

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
  entryPoints: entryPoints,

  excludeExternals: true,

  plugin: ["@strictsoftware/typedoc-plugin-monorepo"],

  "external-modulemap": ".*packages/([^/]+)/.*",
};
