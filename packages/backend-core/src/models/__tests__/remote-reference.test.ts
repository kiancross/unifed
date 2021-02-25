/*
 * CS3099 Group A3
 */

import test from "ava";
import { RemoteReference } from "../remote-reference";

test("Internal reference", async (t) => {
  const reference = new RemoteReference();
  reference.id = "foo";
  reference.host = "this";

  t.deepEqual(reference.toJSON(), {
    id: "foo",
    host: "localhost:8080",
  });
});

test("toJSON", (t) => {
  const reference = new RemoteReference();
  reference.id = "foo";
  reference.host = "localhost:8080";

  t.deepEqual(reference.toJSON(), {
    id: "foo",
    host: "localhost:8080",
  });
});
