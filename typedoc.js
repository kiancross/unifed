/*
 * CS3099 Group A3
 */

// Derived from
// https://github.com/yarnpkg/berry/blob/master/packages/gatsby/typedoc.js

const path = require("path");

/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {
  name: "Unifed",
  exclude: ["**/*.test.ts", "**/*.test.tsx", "**/build/*", "**/__tests__/**"],
  out: "docs",
  entryPoints: ["packages"],

  theme: `${path.dirname(
    require.resolve(`typedoc-neo-theme/package.json`)
  )}/bin/default`,

  plugin: [
    "typedoc-neo-theme",
    "@strictsoftware/typedoc-plugin-monorepo",
  ],

  "external-modulemap": ".*packages/([^/]+)/.*",

  source: [
    {
      path: "https://github.com/kiancross/unifed/tree/master/",
      line: "L",
    }
  ],

  outline: [
    {
      "Packages": {
        "@unifed/shared": "shared",
        "@unifed/frontend": "frontend",
        "@unifed/backend-ml": "backend_ml",
        "@unifed/backend-core": "backend_core",
        "@unifed/backend-federation-client": "backend_federation_client",
        "@unifed/backend-federation-server": "backend_federation_server",
        "@unifed/backend-internal-server": "backend_internal_server"
      }
    }
  ],

  links: [
    {
      label: "Developer Documentation",
      url: "https://kiancross.github.io/unifed/",
    }
  ]
};
