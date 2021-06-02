/*
 * Copyright (C) 2021 Kian Cross
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
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
