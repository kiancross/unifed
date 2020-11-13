/*
 * CS3099 Group A3
 */

import test from "ava";
import { RemoteReference } from "../remote-reference";


test("toJSON", t => {
  const reference = new RemoteReference();
  reference.id = "someid";
  reference.host = "localhost:8080"

  t.deepEqual(reference.toJSON(), {
    id: "someid",
    host: "localhost:8080"
  })
})
