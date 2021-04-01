/*
 * CS3099 Group A3
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
