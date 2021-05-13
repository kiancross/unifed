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

import test from "ava";

import { modelNames, getModel, ModelNotDefinedError } from "./models";
import { defaultConfig as config } from "../config";

test("Undefined model", (t) => {
  t.throws(() => getModel("none", config), {
    instanceOf: ModelNotDefinedError,
  });
});

test("Creating models", (t) => {
  t.plan(5);

  for (const modelName of modelNames) {
    t.not(modelName, undefined);
    getModel(modelName, config);
  }
});
